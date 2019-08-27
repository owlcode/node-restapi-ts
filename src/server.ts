import * as spdy from 'spdy';
import Chat from './components/chat/index';
import {Middleware} from './lib/middleware';
import Router from './lib/router';
import {CERT_FILES_FS, MONGO_URL} from '../settings';
import * as mongoose from 'mongoose';
import * as express from 'express';

export class Server {

    private certFiles: any = CERT_FILES_FS;

    constructor(private app: express.Express, private port: number) {
        mongoose.connect(MONGO_URL);

        new Middleware().configure(app);
        new Router().configure(app);
        this.configureChat(app);
    }

    public run() {
        spdy.createServer(this.certFiles, <any> this.app)
            .listen(this.port, () => {
                
            });
    }

    /* private */
    private configureChat(app: express.Express) {
        app.get('/sse', Chat.respondWithActiveTalks());
    }
}