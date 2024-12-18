import { Ok } from "reliq";
import { Err } from "reliq";

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
        return Ok({ name, price, stock, increaseStock, decreaseStock });
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

    function increaseStock(...[amount]: Parameters<Product["increaseStock"]>): ReturnType<Product["increaseStock"]> {
        if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        _stock += amount;
        return Ok(undefined);
    }

    function decreaseStock(...[amount]: Parameters<Product["decreaseStock"]>): ReturnType<Product["decreaseStock"]> {
        if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        if ((stock() - amount) < 0) return Err("INSUFFICIENT_STOCK");
        _stock -= amount;
        return Ok(undefined);
    }
}
export namespace Product {}