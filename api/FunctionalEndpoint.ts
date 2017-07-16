import {GenericResponse} from "./GenericResponse";
import * as express from "express";

export abstract class FunctionalEndpoint extends GenericResponse {
    protected model;
    private express: any;

    constructor(router, model) {
        super();
        router;
        this.model = model;

        router.get('/count', this.count.bind(this));
        router.get('/random', this.random.bind(this));
    }

    count(request: express.Request, response: express.Response) {
        this.model.find().count()
            .then(this.respondWithResult(response))
            .catch(this.handleError(response));
    }

    random(request: express.Request, response: express.Response) {
        this.model.aggregate(
            {$sample: {size: 1}}
        )
            .then(this.respondWithResult(response))
            .catch(this.handleError(response));
    }
}