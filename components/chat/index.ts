export default class Chat {
    static respondWithActiveTalks() {
        return (request: any, response: any) => {
            console.log(request.body);

            response.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            });

            // todo: refactor to use setTimeout
            setInterval(() => {
                console.log('odbieram');
                response.write("retry: 10000\n");
                response.write("event: message\n");
                response.write("data:" + (JSON.stringify({test: 'data'})) + "\n\n");
            }, 500);

            request.connection.addListener("close", function () {
                // todo: handle conversation close - set mongodb object state
            }, false);
        };
    }
}