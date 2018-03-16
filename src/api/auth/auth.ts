import * as express from 'express';
import {User} from '../user/user.model';

let router = express.Router();

router.post('/login', login);
router.get('/logout', logout);

function login(req: express.Request, res: express.Response) {
    User.findOne({
        userName: req.body.username
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({});
        } else if (user) {
            if (user.password != req.body.password) {
                res.status(401).json(null);
            } else {
                let resUser = user.toObject();
                delete resUser.password;
                delete resUser.__v;
                res.status(200).json({...resUser, isAuthenticated: true});
            }
        }
    });
}

function logout(request: express.Request, response: express.Response) {
    return response.status(200).json({isAuthenticated: false});
}

export default router;
