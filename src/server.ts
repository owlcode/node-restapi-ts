import * as spdy from 'spdy';
import {Middleware} from './api/middleware';
import Router from './lib/router';
import {CERT_FILES_FS, MONGO_URL} from '../settings';
import {connect as connectMongo} from 'mongoose';
import * as express from 'express';
import {gallery} from "./../node-gallery/lib/gallery";

export class Server {

    private certFiles: any = CERT_FILES_FS;

    constructor(private app: express.Express, private port: number) {
        connectMongo(MONGO_URL);

        // API
        new Router().configure(app);
        new Middleware().configure(app);
        app.use(express.static(__dirname + "/public/"));
        app.use("/", gallery({
            staticFiles: 'photos',
            urlRoot: '/',
            title: 'owlstd.io gallery - tylko Twoje zdjęcia',
            thumbnail: {
                width: 150,
                height: 150
            }
        }))
    }

    public run() {
        spdy.createServer(this.certFiles, <any> this.app)
            .listen(this.port, () => {
                
            });
    }
}