import {transpileReactApp} from "doka-tools"
import {join} from "path";
import * as Path from "path";
import Express from "express"

(async (): Promise<void> => {
    let message: string = transpileReactApp(join(__dirname, "App.tsx"), __dirname).unwrap().toString("utf8");
    let app: Express.Express = Express();
    app.use(Express.static(__dirname));
    app.use(Express.json());
    app.get("/", async (request, response) => response.status(200).sendFile(Path.join(__dirname, "App.html")));
    app.listen(3000);
    console.log(message);
    return;
})();