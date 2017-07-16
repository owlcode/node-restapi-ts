import * as express from "express";

export abstract class GenericResponse {
    protected respondWithResult(response: express.Response, status?: number) {
        return function (data: any) {
            response.status(status || 200).json(data);
        }
    }

    protected handleError(response: express.Response) {
        return function (error: any) {
            response.status(400).json(error);
        }
    }

    protected handleRemove(response: express.Response) {
        return function (error: any) {
            response.status(200).json(error);
        }
    }
}