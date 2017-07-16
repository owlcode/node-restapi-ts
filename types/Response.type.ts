import {Message} from "./Message.type";
import {UserDio} from "../api/user/user.type";
export interface Response {
    message: Message[];
    data: UserDio[] | any;
}