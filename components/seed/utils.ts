import Talk from '../../api/talk/talk.model';
import User from "../../api/user/user.model";

export class Utils {
    static get randomUserId(): any {
        return User.find({}).then(res => {
            console.log('user', res);
            return res;
        })
    }

    static get randomTalkId(): any {
        return Talk.find({}).then(res => {
            console.log('talk', res);
            return res[0]._id;
        })
    }
}
