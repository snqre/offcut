import { Ok } from "reliq";
import { Err } from "reliq";

export type ProductR<T extends string> = ProductT<T> | ProductE;
export type ProductT<T extends string> = Ok<Product<T>>;
export type ProductE =
    | Err<"VOID_NAME">
    | Err<"PRICE_BELOW_ZERO">
    | Err<"PRICE_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_BELOW_ZERO">;
export type Product<T extends string> = {
    name(): T;
    price(): number;
    stock(): bigint;

    increaseStock(amount: bigint):
        | Ok<void>
        | Err<"AMOUNT_BELOW_ZERO">;

    decreaseStock(amount: bigint): 
        | ReturnType<Product<T>["increaseStock"]>
        | Err<"INSUFFICIENT_STOCK">;
};
export function Product<T extends string>(_name: T, _price: number, _stock: bigint): ProductR<T> {
    
    /** @constructor */ {
        /***/ {
            if (_name.length === 0) return Err("VOID_NAME");
            if (_price < 0) return Err("PRICE_BELOW_ZERO");
            if (_price > Number.MAX_SAFE_INTEGER) return Err("PRICE_ABOVE_MAX_SAFE_INTEGER");
            if (_stock < 0) return Err("STOCK_BELOW_ZERO");
        }

        return Ok({
            name, 
            price, 
            stock, 
            increaseStock, 
            decreaseStock
        });
    }

    function name(): ReturnType<Product<T>["name"]> {
        return _name;
    }

    function price(): ReturnType<Product<T>["price"]> {
        return _price;
    }

    function stock(): ReturnType<Product<T>["stock"]> {
        return _stock;
    }

    function increaseStock(...[amount]: Parameters<Product<T>["increaseStock"]>): ReturnType<Product<T>["increaseStock"]> {
        /***/ {
            if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
        }

        _stock += amount;
        return Ok(undefined);
    }

    function decreaseStock(...[amount]: Parameters<Product<T>["decreaseStock"]>): ReturnType<Product<T>["decreaseStock"]> {
        /***/ {
            if (amount < 0) return Err("AMOUNT_BELOW_ZERO");
            if ((stock() - amount) < 0) return Err("INSUFFICIENT_STOCK");
        }

        _stock -= amount;
        return Ok(undefined);
    }
}