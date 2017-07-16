import * as express from "express";
import {UserDio} from "../user/user.type";
let router = express.Router();

router.post('/signIn', signIn);
router.get('/signOut', signOut);

function signIn(request: express.Request, response: express.Response) {
    let user: UserDio = request.body;
}

function signOut(request: express.Request, response: express.Response) {
    //todo: retrieve string from headers
}

export = router;
