import { Router } from "express";
import { join } from "path";

export function ReactRouter(): Router {
    return Router().get("/", async (rq, rs) => rs.sendFile(join(__dirname, "web/App.html")));
}