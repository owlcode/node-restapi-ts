import * as express from "express";
import auth from "../api/auth/auth";
import user from "../api/user/user";
import { printWishRouter } from '../api/owl-gallery/print-wish/print-wish';

export default class Router {
    configure(app: express.Express) {
        app.use("/api/auth", auth);
        app.use("/api/user", user);
        app.use("/api/print-wish", printWishRouter);
    }
}

