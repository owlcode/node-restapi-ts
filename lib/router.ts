import express = require("express");
import * as auth from "../api/auth/auth";
import user from "../api/user/user";
import quest from "../api/quest/quest";
import comment from "../api/comment/comment";
import article from "../api/article/article";
import message from "../api/message/message";
import talk from "../api/talk/talk";

export default class Router {
    constructor(private chatRouter: any) {

    }

    configure(app: express.Express) {
        app.use("/api/auth", auth);
        app.use("/api/user", user);
        app.use("/api/quest", quest);
        app.use("/api/article", article);
        app.use("/api/comment", comment);
        app.use("/api/talk", talk);
        app.use("/api/message", this.chatRouter.router);
    }
}