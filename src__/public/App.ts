import {Transpiler} from "src__/public/Bundle";
import {join} from "src__/public/Bundle";
import Express from "express";

interface App {
    run(): void;
}

function App(): App {
    /***/ return {run};

    function run(): void {
        let transpiler: Transpiler = Transpiler();
        let buffer: Buffer = transpiler.transpile(join(__dirname, "App.tsx"), __dirname);
        let host = Express()
            .use(Express.static(__dirname))
            .use(Express.json())
            .get("/", async (request, response) => {
                return (
                    response
                        .status(200)
                        .sendFile(join(__dirname, "app.html"))
                );
            })
            .listen(3000);
        console.log(buffer.toString("utf8"));
        return;
    }
}

(async () => {
    let app: App = App();
    app.run();
    return;
})();