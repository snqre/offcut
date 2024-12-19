import type { ErrOf } from "reliq";
import { default as Stripe } from "stripe";
import { StripeAdaptorConfig } from "@server/class";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";

export type StripeAdaptor = {
    receivePayment():
        Promise<
            | Ok<Stripe.Response<Stripe.Checkout.Session>>
            | Err<[unknown]>
        >;
};
export function StripeAdaptor(_cg: StripeAdaptorConfig):
    | Ok<StripeAdaptor>
     {
    
    /** @constructor */ {
        return Ok({});
    }

    async function receivePayment(): ReturnType<StripeAdaptor["receivePayment"]> {
        return await Result.wrapAsync(async () => {
            let socket: Stripe = new Stripe(_cg.apiKey);
            return await socket.checkout.sessions.create({
                payment_method_data: ["card"],
                line_items: [_cg.products.map(product => ({
                    price_data: {
                        
                    },
                    quantity: Number(product.amount)
                }))]
            });
        });
    }
}