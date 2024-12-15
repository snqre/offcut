import type { Database } from "src/server/class/Class";
import { Router } from "express";

export function AdminProductRouter(_db: Database): Router {
    
    return Router()
        .post("/set")
}