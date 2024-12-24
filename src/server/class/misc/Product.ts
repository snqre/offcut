import type { PaymentProvider } from "@server/class";
import type { ErrOf } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { ProductOrderDto } from "@common";
import { ProductDto } from "@common";

export type Product = {
    name(): string;
    price(): number;
    stock(): bigint;

    increaseStock(amount: bigint):
        | Ok<void>
        | Err<"AMOUNT_BELOW_ZERO">;

    decreaseStock(amount: bigint):
        | ReturnType<Product["increaseStock"]>
        | Err<"INSUFFICIENT_STOCK">;

    purchase(amount: bigint, provider: PaymentProvider):
        Promise<
            | Ok<Some<string>>
            | Ok<None>
            | ErrOf<ReturnType<typeof ProductOrderDto>>
            | ErrOf<ReturnType<typeof ProductDto>>
            | ErrOf<Awaited<ReturnType<PaymentProvider["receivePayment"]>>>
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
        return Ok({
            name,
            price,
            stock,
            increaseStock,
            decreaseStock,
            purchase
        });
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

    function increaseStock(... [amount]: Parameters<Product["increaseStock"]>): ReturnType<Product["increaseStock"]> {
        if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        _stock += amount;
        return Ok(undefined);
    }

    function decreaseStock(... [amount]: Parameters<Product["decreaseStock"]>): ReturnType<Product["decreaseStock"]> {
        if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        if (stock() - amount < 0) return Err("INSUFFICIENT_STOCK");
        _stock -= amount;
        return Ok(undefined);
    }

    async function purchase(... [amount, provider]: Parameters<Product["purchase"]>): ReturnType<Product["purchase"]> {
        let productDtoR = 
            ProductDto({
                name: name(),
                price: price(),
                stock: Number(stock())
            });
        if (productDtoR.err()) return productDtoR;
        let productDto = productDtoR.unwrapSafely();
        let productOrderDtoR =
            ProductOrderDto({
                product: productDto,
                amount: Number(amount)
            });
        if (productOrderDtoR.err()) return productOrderDtoR;
        let productOrderDto = productOrderDtoR.unwrapSafely();
        let urlR = await provider.receivePayment([productOrderDto]);
        if (urlR.err()) return urlR;
        let url0 = urlR.unwrapSafely();
        if (url0.none()) return Ok(None);
        let url = url0.unwrapSafely();
        return Ok(Some(url));
    }
}