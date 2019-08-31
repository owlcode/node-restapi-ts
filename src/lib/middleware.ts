import * as express from "express";
import * as bodyParser from "body-parser";

export class Middleware {
    configure(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.static(__dirname + "/../public"));
        app.use(express.static(__dirname + "gallery.css"));
        console.log(__dirname + "/../photos")
        app.use(express.static(__dirname + "/../photos"));
        app.use("/docs", express.static(__dirname + "/../public/docs.html"));
        app.use((req: express.Request, res: express.Response, next: any) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            next();
        });
    }
}