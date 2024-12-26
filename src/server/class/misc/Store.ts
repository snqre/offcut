import type { ErrOf } from "reliq";
import type { Database } from "@server/class";
import { Ok, Result } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Product } from "@server/class";
import { ProductData } from "@common";
import { AppData } from "@common";
import { UnsafeAppDataSchema } from "@common";

export type Store = {
    products():
        Promise<
            | Ok<ReadonlyArray<Readonly<Product>>>
            | ErrOf<ReturnType<typeof Product>>
            | Err<"INVALID_RESPONSE">
            | Err<[unknown]>
        >;
    productsByName(name: string):
        Promise<
            | Ok<Some<Readonly<Product>>>
            | Ok<None>
            | ErrOf<ReturnType<typeof Product>>
            | Err<"INVALID_RESPONSE">
            | Err<[unknown]>
        >;
    length():
        Promise<
            | Ok<bigint>
            | Err<"INVALID_RESPONSE">
            | Err<[unknown]>
        >;
    listProduct(product: Product):
        Promise<
            | Ok<void>
            | ErrOf<ReturnType<typeof ProductData>>
            | Err<"INVALID_RESPONSE">
            | Err<"DUPLICATE">
            | Err<[unknown]>
        >;
    deListProduct(name: string):
        Promise<
            | Ok<void>
            | Err<"INVALID_RESPONSE">
            | Err<"NOT_FOUND">
            | Err<[unknown]>
        >;
};
export function Store(_db: Database, _dbKey: string): Store {

    /** @constructor */ {
        return {
            products,
            productsByName,
            length,
            listProduct,
            deListProduct
        };
    }

    async function products(... []: Parameters<Store["products"]>): ReturnType<Store["products"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let result = [] as Array<Product>;
        let i = 0n;
        while (i < appData.products.length) {
            let iFloat = Number(i);
            let productData = appData.products[iFloat];
            let productDataStockInt = BigInt(productData.stock);
            let productR = Product(productData.name, productData.price, productDataStockInt);
            if (productR.err()) return productR;
            let product = productR.unwrapSafely();
            result.push(product);
            i++;
        }
        return Ok(result);
    }

    async function productsByName(... [name]: Parameters<Store["productsByName"]>): ReturnType<Store["productsByName"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let i = 0n;
        while (i < appData.products.length) {
            let iFloat = Number(i);
            let productData = appData.products[iFloat];
            let productDataStockInt = BigInt(productData.stock);
            let productR = Product(productData.name, productData.price, productDataStockInt);
            if (productR.err()) return productR;
            let product = productR.unwrapSafely();
            if (product.name() === name) return Ok(Some(product));
            i++;
        }
        return Ok(None);
    }

    async function length(... []: Parameters<Store["length"]>): ReturnType<Store["length"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        return Ok(BigInt(appData.products.length));
    }

    async function listProduct(... [product]: Parameters<Store["listProduct"]>): ReturnType<Store["listProduct"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let i = 0n;
        while (i < appData.products.length) {
            let iFloat = Number(i);
            let productData = appData.products[iFloat];
            if (productData.name === product.name()) return Err("DUPLICATE" as const);
            i++;
        }
        let productDataR =
            ProductData({
                name: product.name(),
                price: product.price(),
                stock: Number(product.stock())
            });
        if (productDataR.err()) return productDataR;
        let productData = productDataR.unwrapSafely();
        appData.products.push(productData);
        let appDataJsonR = Result.wrap(() => JSON.stringify(appData));
        if (appDataJsonR.err()) return Err<[unknown]>([appDataJsonR.val()]);
        let appDataJson = appDataJsonR.unwrapSafely();
        _db.set(_dbKey, appDataJson);
        return Ok(undefined);
    }

    async function deListProduct(... [name]: Parameters<Store["deListProduct"]>): ReturnType<Store["deListProduct"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let match = appData.products.findIndex(x => x.name === name);
        if (match === -1) return Err("NOT_FOUND");
        appData.products.splice(match, 1);
        let appDataJsonR = Result.wrap(() => JSON.stringify(appData));
        if (appDataJsonR.err()) return Err<[unknown]>([appDataJsonR.val()]);
        let appDataJson = appDataJsonR.unwrapSafely();
        _db.set(_dbKey, appDataJson);
        return Ok(undefined);
    }

    async function _appData():
        Promise<
            | Ok<AppData>
            | Err<"INVALID_RESPONSE">
            | Err<[unknown]>    
        > {
        let responseR = await _db.get(_dbKey);
        if (responseR.err()) return responseR;
        let responseO = responseR.unwrapSafely();
        if (responseO.none()) return Err("INVALID_RESPONSE" as const);
        let response = responseO.unwrapSafely();
        let dataR = Result.wrap(() => JSON.parse(response));
        if (dataR.err()) return Err<[unknown]>([dataR.val()]);
        let data = dataR.unwrapSafely();
        if (UnsafeAppDataSchema.safeParse(data).success === false) return Err("INVALID_RESPONSE" as const);
        return Ok(data);
    }
}