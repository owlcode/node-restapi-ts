import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'underscore';
import {
    exif
} from './exif';
let common;

module.exports = function (config) {
    common = require('./common')(config);
    return function (req, res, next) {
        var albumPath = req.params[0] || '', // This CAN be undefined, if a photo exists at root
            photoName = req.params[1] || '',
            photoBreadcrumbPath = path.join(albumPath, photoName), // Path for breadcrumb mostly
            albumFilesystemPath = './' + path.join(config.staticFiles, albumPath),
            photoFileSystemPath,
            photoWebPath;
        fs.readdir(albumFilesystemPath, function (err, files) {
            if (err || _.isEmpty(files)) {
                return common.error(req, res, next, 404, 'Photo not found', err);
            }
            var file = _.find < any > (files, function (file) {
                return file.indexOf(photoName) > -1;
            });
            if (!file) {
                return common.error(req, res, next, 404, 'Photo not found', {});
            }
            // Include the /gallery/ or whatever
            photoWebPath = path.join(config.urlRoot, albumPath, file);
            photoFileSystemPath = path.join(albumFilesystemPath, file);

            exif(photoFileSystemPath, function (exifErr, exifInfo) {
                if (exifErr) {
                    console.warn('We have some exif errors! Defaulting to empty EXIF data', exifErr)
                    exifInfo = {};
                }

                req.tpl = 'photo.ejs';
                req.data = _.extend(config, {
                    name: photoName,
                    breadcrumb: common.breadcrumb(common.friendlyPath(photoBreadcrumbPath)),
                    src: photoWebPath,
                    path: photoBreadcrumbPath,
                    exif: exifInfo
                });
                return next();
            });
        });

    }
};
