import type { PaymentProvider } from "@server/class";
import { default as Socket } from "stripe";
import { Result } from "reliq";
import { Err } from "reliq";
import { Ok } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";

export type Stripe = 
    & PaymentProvider
    & {
    successUrl(): string;
    failureUrl(): string;
};
export function Stripe(_apiKey: string, _successUrl: string, _failureUrl: string):
    | Ok<Stripe>
    | Err<[unknown]> {
    let _socket: Socket;

    /** @constructor */ {
        let socketR = Result.wrap(() => new Socket(_apiKey));
        if (socketR.err()) return Err<[unknown]>([socketR.val()]);
        _socket = socketR.unwrapSafely();
        return Ok({ receivePayment, successUrl, failureUrl });
    }

    function successUrl(): ReturnType<Stripe["successUrl"]> {
        return _successUrl;
    }

    function failureUrl(): ReturnType<Stripe["failureUrl"]> {
        return _failureUrl;
    }

    async function receivePayment(... [orders]: Parameters<Stripe["receivePayment"]>): ReturnType<Stripe["receivePayment"]> {
        let sessionR = await Result.wrapAsync(async () => await _socket.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [... orders.map(order => ({
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: order.product.name
                    },
                    unit_amount: order.product.price
                },
                quantity: order.amount
            }))],
            mode: "payment",
            success_url: successUrl(),
            cancel_url: failureUrl()
        }));
        if (sessionR.err()) return Err<[unknown]>([sessionR.val()]);
        let session = sessionR.unwrapSafely();
        let url = session.url;
        if (!url) return Ok(None)
        return Ok(Some(url));
    }
}