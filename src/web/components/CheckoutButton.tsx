import type {ReactNode} from "react";
import type {Stripe} from "@stripe/stripe-js";
import type {ComponentPropsWithRef} from "react";
import type {Maybe} from "../util/Maybe";
import type {AxiosResponse} from "axios";
import {default as Axios} from "axios";
import {OrderData} from "../common/OrderData";
import {loadStripe} from "@stripe/stripe-js";
import * as Common from "../common/constant/Constant";
import * as ColorPalette from "../constant/ColorPalette";
import * as BoxShadow from "../constant/BoxShadow";

export function CheckoutButton({
    order,
    style,
    children,
    ... more}: 
        & ComponentPropsWithRef<"button">
        & {
        order: OrderData;
    }): ReactNode {

    return <>
        <button
            onClick={async () => {
                try {
                    let response: AxiosResponse = await Axios.post("*/checkout", order);
                    let sessionKey: Maybe<string> = response.data.id;
                    let e: string = "ERR_SESSION_ID_REQUIRED";
                    if (sessionKey === null) return console.error(e);
                    if (sessionKey === undefined) return console.error(e);
                    let stripe: Maybe<Stripe> = await loadStripe(Common.STRIPE_PUBLIC_KEY);
                    e = "ERR_STRIPE_REQUIRED";
                    if (stripe === null) return console.error(e);
                    if (stripe === undefined) return console.error(e);
                    await stripe.redirectToCheckout({sessionId: sessionKey});
                }
                catch (e) {
                    console.error(e);
                }
                return;
            }}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                background: ColorPalette.OBSIDIAN,
                color: ColorPalette.SNOW,
                boxShadow: BoxShadow.TAILWIND_0,
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                ... style
            }}
            {... more}>
            {children}
        </button>
    </>;
}