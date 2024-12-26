import { Router } from "express";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";
import { join } from "path";

export type ReactRouterR = ReactRouterT | ReactRouterE;
export type ReactRouterT = Ok<Router>;
export type ReactRouterE = Err<[unknown]>;
export function ReactRouter(): ReactRouterR {
    let routerR = Result.wrap(() => Router().get("/", async (rq, rs) => rs.sendFile(join(__dirname, "web/App.html"))));
    if (routerR.err()) return Err<[unknown]>([routerR.val()]);
    return routerR;
}