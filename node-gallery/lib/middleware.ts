import express from 'express';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const cache = require('memory-cache');
let common;

export enum PhotoQueryParams {

}

export class OwlGalleryMiddleware {
    static checkForPreviouslyResizedInCache(cachedResizedKey, res) {
        let cachedResult = cache.get(cachedResizedKey)
        //  TODO - eventualyl should just
        //try the fs.read on cachedResult, existsSync is a bad hack
        if (cachedResult && fs.existsSync(cachedResult)) {
            // cache hit - read & return
            var cacheReadStream = fs.createReadStream(cachedResult);
            cacheReadStream.on('error', function (err) {
                // return common.error(req, res, next, 404, 'File not found', err);
            });

            return cacheReadStream.pipe(res);
        }
    }

    static getImageDimensions(req, config) {
        if (req.query.tn.toString() === '1') {
            let w = (config.thumbnail && config.thumbnail.width) || 200;
            let h = (config.thumbnail && config.thumbnail.height) || 200;
            return w + 'x' + h;
        } else {
            let w = (config.image && config.image.width) || 1920;
            let h = (config.image && config.image.height) || 1080;
            return w + 'x' + h;
        }
    }
}

module.exports = function (config) {
    var app = express(),
        staticFiles = config.staticFiles,
        common = require('./common')(config),
        album = require('./album')(config),
        photo = require('./photo')(config);

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');

    // Photo Page
    app.get(/.+(\.(jpg|bmp|jpeg|gif|png|tif)(\?tn=(1|0))?)$/i, function (req, res, next) {
        const filePath = decodeURI(path.join(staticFiles, req.path));
        const fstream = fs.createReadStream(filePath);

        fstream.on('error', function (err) {
            console.log('Error when reading file', err);
            return common.error(req, res, next, 404, 'File not found', err);
        });

        if (!req.query.tn) {
            console.log('elo)');
            // return the full size file
            return fstream.pipe(res);
        } else {
            // streaming resize our file
            let cachedResizedKey, cacheWriteStream,
                resizer;

            const dimensions = OwlGalleryMiddleware.getImageDimensions(req, config);

            cachedResizedKey = filePath + dimensions;
            cachedResizedKey = crypto.createHash('md5').update(cachedResizedKey).digest('hex');

            // Check the cache for a previously rezized tn of matching file path and dimensions
            // OwlGalleryMiddleware.checkForPreviouslyResizedInCache()

            // No result, create a write stream so we don't have to reize this image again
            const cacheWritePath: any = path.join('/tmp', cachedResizedKey);
            cacheWriteStream = fs.createWriteStream(cacheWritePath);

            const resizeStream = fstream
                .pipe(
                    sharp()
                    .resize(...dimensions.split('x').map(dim => Number(dim)))
                    .on('info', (info) => {
                        console.log('Image height is ' + info.height);
                    })
                    .on('end', (e) => {
                        console.log(e);
                    })
                )

            resizeStream
                .pipe(cacheWriteStream)
            cache.put(cachedResizedKey, cacheWritePath);
            return resizeStream.pipe(res);

        }


    });

    // Photo Pages - anything containing */photo/*
    app.get(/(.+\/)?photo\/(.+)/i, photo, common.render);
    // Album Page - everything that doesn't contain the photo string
    // regex source http://stackoverflow.com/questions/406230/regular-expression-to-match-string-not-containing-a-word
    app.get(/^((?!\/photo\/).)*$/, album, common.render);
    return app;
}