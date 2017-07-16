import express = require("express");
import message from "./api/message/message.model";
import bodyParser = require("body-parser");
import mongoose = require("mongoose");
import * as fs from "fs";
import * as spdy from "spdy";
import Chat from "./components/chat/index";
import ChatEventEmitter from "./components/chat/ChatEventEmitter";
import {Middleware} from "./lib/middleware";
import Router from "./lib/router";
import MessageRouter from "./api/message/message";

export class Server {
    private chatEventEmitter = new ChatEventEmitter();

    private certFiles: any = {
        key: fs.readFileSync(__dirname + "/server.key"),
        cert: fs.readFileSync(__dirname + "/server.crt")
    };

    constructor(private app: express.Express, private port: number) {
        this.configureDb();

        let messageRouter = new MessageRouter(express.Router(), message, this.chatEventEmitter);

        new Middleware().configure(app);
        new Router(messageRouter).configure(app);
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
        app.get('/sse/talk', Chat.respondWithActiveTalks(this.chatEventEmitter));
        app.get('/sse/talk/:id', Chat.respondWithMessages(this.chatEventEmitter))
    }

    private configureDb() {
        mongoose.connect("mongodb://localhost:27017/pomocny");
    }
}