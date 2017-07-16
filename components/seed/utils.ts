import User from "../../api/user/user.model";

export class Utils {
    // todo Refactor to use async/await
    static get randomUserId(): any {
        return User.find({}).then(res => {
            console.log('user', res);
            return res;
        })
    }
}
