import {EventEmitter} from "events";
import {IMessage} from "../../api/message/message.model";

export default class ChatEventEmitter extends EventEmitter {
    newMessage(message: IMessage) {
        this.emit("new-message");
    }
}

