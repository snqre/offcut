import type { ErrOf } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { StripeAdaptor } from "@server/class";
import { ProductOrderDto } from "@common";
import { ProductDto } from "@common";

export type Product = {
    name(): string;
    price(): number;
    stock(): bigint;

    addStock(amount: bigint):
        | Ok<void>
        | Err<"AMOUNT_BELOW_ZERO">;

    removeStock(amount: bigint):
        | ReturnType<Product["addStock"]>
        | Err<"INSUFFICIENT_STOCK">;

    buy(amount: bigint, paymentProvider: StripeAdaptor):
        Promise<
            | Ok<string>
            | ErrOf<ReturnType<typeof ProductOrderDto>>
            | ErrOf<ReturnType<typeof ProductDto>>
            | ErrOf<Awaited<ReturnType<StripeAdaptor["receivePayment"]>>>
            | Err<"SESSION_URL_UNAVAILABLE">
        >;
};
export function Product(_name: string, _price: number, _stock: bigint):
    | Ok<Product>
    | Err<"INVALID_NAME">
    | Err<"PRICE_BELOW_ZERO">
    | Err<"PRICE_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_BELOW_ZERO"> {
    
    /** @constructor */ {
        if (_name.length === 0) return Err("INVALID_NAME");
        if (_price < 0) return Err("PRICE_BELOW_ZERO");
        if (_price > Number.MAX_SAFE_INTEGER) return Err("PRICE_ABOVE_MAX_SAFE_INTEGER");
        if (_stock < 0) return Err("STOCK_BELOW_ZERO");
        return Ok({ name, price, stock, addStock, removeStock, buy });
    }

    function name(): ReturnType<Product["name"]> {
        return _name;
    }

    function price(): ReturnType<Product["price"]> {
        return _price;
    }

    function stock(): ReturnType<Product["stock"]> {
        return _stock;
    }

    function addStock(...[amount]: Parameters<Product["addStock"]>): ReturnType<Product["addStock"]> {
        if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        _stock += amount;
        return Ok(undefined);
    }

    function removeStock(...[amount]: Parameters<Product["removeStock"]>): ReturnType<Product["removeStock"]> {
        if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        if ((stock() - amount) < 0) return Err("INSUFFICIENT_STOCK");
        _stock -= amount;
        return Ok(undefined);
    }

    async function buy(...[amount, paymentProvider]: Parameters<Product["buy"]>): ReturnType<Product["buy"]> {
        let productDtoR = ProductDto({
            name: name(),
            price: price(),
            stock: Number(stock())
        });
        if (productDtoR.err()) return productDtoR;
        let productDto = productDtoR.unwrapSafely();
        let productOrderDtoR = ProductOrderDto({
            product: productDto,
            amount: Number(amount)
        });
        if (productOrderDtoR.err()) return productOrderDtoR;
        let productOrderDto = productOrderDtoR.unwrapSafely();
        let sessionR = await paymentProvider.receivePayment([productOrderDto]);
        if (sessionR.err()) return sessionR;
        let session = sessionR.unwrapSafely();
        let sessionUrl = session.url;
        if (!sessionUrl) return Err("SESSION_URL_UNAVAILABLE");
        return Ok(sessionUrl);
    }
}