import type { Database } from "src/server/class/Class";
import type { OkValOf } from "reliq";
import { Product } from "src/server/class/Class";
import { Product as ProductData } from "@common";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Option } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { isProduct } from "@common";

export type StoreR<T extends string> = Result<StoreT<T>, StoreE>;
export type StoreT<T extends string> = Store<T>;
export type StoreE =
    | "ERR_DB_CORRUPTION"
    | [unknown];
export type Store<T extends string> = {
    product(name: T): Option<Readonly<Product<T>>>;
    length(): bigint;

    listProduct(product: Product<T>):
        | Ok<void>
        | Err<"DUPLICATE_PRODUCT">;

    deListProduct(product: Product<T>):
        | Ok<void>
        | Err<"NOT_FOUND">;
};
export async function Store<T extends string>(_db: Database): Promise<StoreR<T>> {
    let _products: Array<Product<T>>;

    /** @constructor */ {
        /***/ {
            let unknownR: Awaited<ReturnType<Database["get"]>> = await _db.get("");
            if (unknownR.err()) return unknownR;
            let unknown: OkValOf<typeof unknownR> = unknownR.unwrapSafely();
            if (!Array.isArray(unknown)) return Err("ERR_DB_CORRUPTION");
            let i: bigint = 0n;
            while (i < unknown.length) {
                let item: unknown = unknown[Number(i)];
                if (!isProduct(item)) return Err("ERR_DB_CORRUPTION");
                let productR = Product(item.name, item.price, BigInt(item.stock));
                if (productR.err()) return productR;
                i++;
            }

        }

        return { product, length, listProduct, deListProduct };
    }

    function product(...[name]: Parameters<Store<T>["product"]>): ReturnType<Store<T>["product"]> {
        let product:
            | Product<T>
            | void 
            = _products.find(productV => productV.name() === name);
        if (product) return Some(product);
        return None;    
    }

    function length(): ReturnType<Store<T>["length"]> {
        return BigInt(_products.length);
    }

    function listProduct(...[product]: Parameters<Store<T>["listProduct"]>): ReturnType<Store<T>["listProduct"]> {
        let i: bigint = 0n;
        while (i < length()) {
            let productAt: Product<T> = _products[Number(i)];
            if (productAt.name() === product.name()) return Err("DUPLICATE_PRODUCT");
            i++;
        }
        _products.push(product);
        return Ok(undefined);
    }

    function deListProduct(...[product]: Parameters<Store<T>["deListProduct"]>): ReturnType<Store<T>["deListProduct"]> {
        let i: bigint = 0n;
        while (i < length()) {
            let productAt: Product<T> = _products[Number(i)];
            if (productAt.name() === product.name()) {
                _products.splice(Number(i), 1);
                return Ok(undefined);
            }
        }
        return Err("NOT_FOUND");
    }
}

Store<
    | "PAINT"
    | "WALLPAPER">([], {}).listProduct();