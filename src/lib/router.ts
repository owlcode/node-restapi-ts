import * as express from "express";
import * as path from "path";
import auth from "../api/auth/auth";
import user from "../api/user/user";
import {gallery} from "../../node-gallery/lib/gallery";

export default class Router {
    configure(app: express.Express) {
        app.use("/", gallery({
            staticFiles: 'photos',
            urlRoot: '/',
            title: 'owlstd.io gallery - tylko Twoje zdjęcia',
            thumbnail: {
                width: 150,
                height: 150
            }
        }))
        app.use("/api/auth", auth);
        app.use("/api/user", user);
    }
}
