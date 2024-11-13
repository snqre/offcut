import {Router} from "express";
import {RequestAdaptor} from "../util/express/RequestAdaptor";

function SaleRouter() {
    return Router()
        .post("/purchase", async (rq, rs) => {
            try {
                let okUrl: string = `${RequestAdaptor(rq).origin()}/sale`;
                
            }
            catch (e) {
                let errcode: string = "ERR_FAILED_TO_CREATE_CHECKOUT_SESSION";
                console.error(e);
                rs
                    .status(500)
                    .json(errcode);
            }
        })
        .get("/purchase/success", async (rq, rs) => {

        });
}