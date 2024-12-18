import type { Database } from "src/server/class/Class";
import type { OkValOf } from "reliq";
import { Product } from "src/server/class/Class";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Option } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { z as ZodValidator } from "zod";
import { AppDataDto, ProductDto } from "@common";

export type Store = {
    products(): 
        Promise<
            | Ok<ReadonlyArray<Product>> 
            | Err<"INVALID_DATABASE_KEY_VALUE_LAYOUT">
            | Err<[unknown]>>;
    productsByName(name: string):
        Promise<
            | Ok<Some<Readonly<Product>>>
            | Ok<None>
            | Err<"INVALID_DATABASE_KEY_VALUE_LAYOUT">
            | Err<[unknown]>
        >;
    length():
        Promise<
            | Ok<bigint>
            | Err<"INVALID_DATABASE_KEY_VALUE_LAYOUT">
            | Err<[unknown]>
        >;
    listProduct(product: Product):
        Promise<
            | Ok<void>
            | Err<"INVALID_DATABASE_KEY_VALUE_LAYOUT">
            | Err<[unknown]>
        >;
    deListProduct(product: Product):
        | Ok<void>
        | Err<"PRODUCT_NOT_FOUND">;
};
export function Store(_db: Database, _dbKey: string): Store {

    /** @constructor */ {
        return Ok({
            products, 
            productsByName, 
            length,
            listProduct
        });
    }

    async function products(...[]: Parameters<Store["products"]>): ReturnType<Store["products"]> {
        let response: Awaited<ReturnType<Database["get"]>> = await _db.get(_dbKey);
        if (response.err()) return response;
        if (!AppDataDto.Schema.safeParse(response.unwrapSafely())) return Err("INVALID_DATABASE_KEY_VALUE_LAYOUT");
        return Ok((response.unwrapSafely() as AppDataDto).products.map(x => Product(x.name, x.price, BigInt(x.stock)).unwrap()));
    }

    async function productsByName(...[name]: Parameters<Store["productsByName"]>): ReturnType<Store["productsByName"]> {
        let response: Awaited<ReturnType<Database["get"]>> = await _db.get(_dbKey);
        if (response.err()) return response;
        if (!AppDataDto.Schema.safeParse(response.unwrapSafely())) return Err("INVALID_DATABASE_KEY_VALUE_LAYOUT");
        let product: 
            | ProductDto
            | void 
            = (response.unwrapSafely() as AppDataDto).products.find(x => x.name === name);
        if (product) return Ok(Some(Product(product.name, product.price, BigInt(product.stock)).unwrap()));
        return Ok(None);
    }

    async function length(...[]: Parameters<Store["length"]>): ReturnType<Store["length"]> {
        let appDto: Awaited<ReturnType<typeof _appDto>> = await _appDto(); 
        if (appDto.err()) return appDto;
        return Ok(BigInt(appDto.unwrapSafely().products.length));
    }

    async function listProduct(...[product]: Parameters<Store["listProduct"]>): ReturnType<Store["listProduct"]> {

    }

    async function _appDto():
        Promise<
            | Ok<AppDataDto>
            | Err<"INVALID_DATABASE_KEY_VALUE_LAYOUT">
            | Err<[unknown]>
        > {
        let response: Awaited<ReturnType<Database["get"]>> = await _db.get(_dbKey);
        if (response.err()) return response;
        if (!AppDataDto.Schema.safeParse(response.unwrapSafely())) return Err("INVALID_DATABASE_KEY_VALUE_LAYOUT");
        return Ok((response.unwrapSafely() as AppDataDto));
    }
}
export namespace Store {}