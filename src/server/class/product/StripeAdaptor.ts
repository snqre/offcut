import { default as Stripe } from "stripe";



export type StripeAdaptorConstructor = {

    successUrl: string;
    failureUrl: string;
    productName: string;
    productAmount: bigint;
};
export type StripeAdaptor = {

};
export function StripeAdaptor(_cs: {
    url: {
        success: string;
        failure: string;
    };
    product: {
        name: string;
        amount: bigint;
    }
}): StripeAdaptor {

    /***/ {
         
    }
}