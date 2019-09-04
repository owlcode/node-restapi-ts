import * as spdy from 'spdy';
import {Middleware} from './lib/middleware';
import Router from './lib/router';
import {CERT_FILES_FS, MONGO_URL} from '../settings';
import {connect as connectMongo} from 'mongoose';
import * as express from 'express';

export class Server {

    private certFiles: any = CERT_FILES_FS;

    constructor(private app: express.Express, private port: number) {
        connectMongo(MONGO_URL);

        new Middleware().configure(app);
        new Router().configure(app);
    }

    public run() {
        spdy.createServer(this.certFiles, <any> this.app)
            .listen(this.port, () => {
                
            });
    }
}