import express = require("express");
import * as auth from "../api/auth/auth";
import user from "../api/user/user";

export default class Router {
    configure(app: express.Express) {
        app.use("/api/auth", auth);
        app.use("/api/user", user);
    }
}