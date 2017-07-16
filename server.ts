import express = require("express");
import message from "./api/message/message.model";
import bodyParser = require("body-parser");
import mongoose = require("mongoose");
import * as fs from "fs";
import * as spdy from "spdy";
import Chat from "./components/chat/index";
import {Middleware} from "./lib/middleware";
import Router from "./lib/router";

export class Server {

    private certFiles: any = {
        key: fs.readFileSync(__dirname + "/server.key"),
        cert: fs.readFileSync(__dirname + "/server.crt")
    };

    constructor(private app: express.Express, private port: number) {
        this.configureDb();

        new Middleware().configure(app);
        new Router().configure(app);
        this.configureChat(app);
    }

    public run() {
        spdy.createServer(this.certFiles, <any> this.app)
            .listen(this.port, (error: any) => {
                if (error) {
                    console.error(error);
                    return process.exit(1);
                }
            });
    }

    /* private */
    private configureChat(app: express.Express) {
        app.get('/sse', Chat.respondWithActiveTalks());
    }

    private configureDb() {
        // todo: refactor to use external settings
        mongoose.connect("mongodb://localhost:27017/pomocny");
    }
}