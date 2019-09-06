import {
    Router
} from "express";
import {
    CrudEndpoint
} from '../../CrudEndpoint';
import {
    PrintWish,
    PrintWishModel
} from './print-wish.model';

class PrintWishRouter extends CrudEndpoint {
    constructor(router: Router, userModel: any) {
        super(router, userModel);
    }
}

export const printWishRouter = new PrintWishRouter(Router(), PrintWishModel).router;
