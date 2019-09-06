import * as express from "express";
import {User, IUser} from "./user.model";
import {CrudEndpoint} from '../CrudEndpoint';

class UserRouter extends CrudEndpoint {
    constructor(router: express.Router, userModel: any) {
        super(router, userModel);
    }
}

export default new UserRouter(express.Router(), User).router;
