import { Ok } from "reliq";
import { Err } from "reliq";
import { ProductDto } from "@common";

export type StripeAdaptorConfig = {
    successUrl: string;
    failureUrl: string;
    apiKey: string;
    products: Array<ProductDto>
};
export function StripeAdaptorConfig(_instance: StripeAdaptorConfig):
    | Ok<StripeAdaptorConfig>
    | Err<"INVALID_SUCCESS_URL">
    | Err<"INVALID_FAILURE_URL">
    | Err<"INVALID_PRODUCT_NAME">
    | Err<"INVALID_PRODUCT_AMOUNT"> {

    /** @constructor */ {
        if (_instance.successUrl.length === 0) return Err("INVALID_SUCCESS_URL");
        if (_instance.failureUrl.length === 0) return Err("INVALID_FAILURE_URL");

        return Ok(_instance);
    }
}