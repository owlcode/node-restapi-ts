import Talk from "../../api/talk/talk.model";
import {Types} from "mongoose";
import MessageModel from "../../api/message/message.model";
export default class Chat {

    static respondWithActiveTalks(chatEventEmitter: any) {
        return (request: any, response: any) => {
            console.log(request.body);

            response.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            });

            chatEventEmitter.on('event', (data: any) => {
                console.log('odbieram');
                response.write("retry: 10000\n");
                response.write("event: message\n");
                response.write("data:" + (JSON.stringify(data)) + "\n\n");

            });

            request.connection.addListener("close", function () {
                // todo: handle conversation close - set mongodb object state
            }, false);
        };
    }

    static respondWithMessages(chatEventEmitter: any) {
        return (request: any, response: any) => {
            response.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            });

            chatEventEmitter.on('event', (data: any) => {
                MessageModel.find({_talk: request.params.id})
                    .then(data => {
                        response.write("retry: 10000\n");
                        response.write("event: message\n");
                        response.write("data:" + (JSON.stringify(data)) + "\n\n");
                    })
            });

            request.connection.addListener("close", function () {
                // todo: handle conversation close - set mongodb object state
            }, false);
        };
    }

    private respondWithData(request: any, response: any) {

    }
}