import { default as Express } from "express";
import { Result } from "ts-results";
import { Ok } from "ts-results";
import { Err } from "ts-results";
import { ReactRouter } from "src/server/router/Router";
import { ProductRouter } from "src/server/router/Router";
import { Redis } from "src/server/class/Class";
import { join } from "path";

type AppR = AppT | AppE;
type AppT = Ok<App>;
type AppE =
    | Err<"">;
type App = {
    run(): Promise<
        | Ok<void>
        | Err<"REDIS_PASSWORD_REQUIRED">>;
};
function App(): AppR {
    /** @constructor */ {
        return Ok({ run });
    }

    async function run(): ReturnType<App["run"]> {
        let redisPassword: 
            | string 
            | void 
            = process.env?.["REDIS_PASSWORD"];
        if (!redisPassword) return Err("REDIS_PASSWORD_REQUIRED");
        let redis: Awaited<ReturnType<typeof Redis>> = await Redis("redis-15112.c259.us-central1-2.gce.redns.redis-cloud.com", redisPassword, 15112n);
        let app: ReturnType<ReturnType<typeof Express>["listen"]> = 
            Express()
                .use(Express.static(join(__dirname, "web")))
                .use(Express.json())
                .use(ReactRouter())
                .use(ProductRouter())

                .get("/", async (rq, rs) => rs.sendFile(join(__dirname, "web/App.html")))
                
                .listen(8080);
        return Ok(undefined);
    }
}

App().map(async app => await app.run());