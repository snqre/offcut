import { Result } from "ts-results";
import { Router } from "express";

export function StripeRouter(): Router {
    let _currency: string = "gbp";
    let _mode: string = "payment";

    return Router()
        .post("/checkout", async (rq, rs) => {
            Result.wrapAsync(async () => {
                let origin: string = `${rq.protocol}://${rq.get("host")}`;
                let url: string = `${origin}/success`;
                let { order } = rq.body;
                
            });
        })
}