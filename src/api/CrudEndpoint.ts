import * as express from 'express';

export default class CrudEndpoint {
    public router: express.Router;
    protected model: any;

    constructor(router: express.Router, model: any) {
        this.router = router;
        this.model = model;

        router.get('/count', this.count.bind(this));
        router.get('/random', this.random.bind(this));

        router.get('/', this.fetch.bind(this));
        router.get('/:id', this.get.bind(this));
        router.post('/', this.create.bind(this));
        router.put('/:id', this.update.bind(this));
        router.patch('/:id', this.update.bind(this));
        router.delete('/:id', this.remove.bind(this));
    }

    getRoutingMap() {
        return this.router;
    }

    //Stats actions
    count(request: express.Request, response: express.Response) {
        this.model.find().count()
            .then(this.respondWithResult(response))
            .catch(this.handleError(response));
    }

    random(request: express.Request, response: express.Response) {
        this.model.aggregate(
            {$sample: {size: 1}}
        )
            .then((array: any) => array[0])
            .then(this.respondWithResult(response))
            .catch(this.handleError(response));
    }

    // Crud actions
    fetch(req: express.Request, res: express.Response) {
        this.model.find(req.query)
            .sort({createdAt: -1})
            .then(this.respondWithResult(res));

    }

    get(request: express.Request, response: express.Response) {
        this.model.find({_id: request.params.id})
            .then((data: any) => data[0])
            .then(this.respondWithResult(response, 200));
    }

    create(request: express.Request, response: express.Response) {
        this.model.create(<any> request.body)
            .then(this.respondWithResult(response, 201))
            .catch(this.handleError(response));
    }

    update(request: express.Request, response: express.Response) {
        this.model.findOneAndUpdate({_id: request.params.id}, request.body)
            .then(this.respondWithResult(response))
            .catch(this.handleError(response));
    }

    remove(request: express.Request, response: express.Response) {
        this.model.remove({_id: request.params.id})
            .then(this.handleRemove(response))
            .catch(this.handleError(response));
    }

    /* protected */
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