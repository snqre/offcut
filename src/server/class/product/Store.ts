import type { Database } from "src/server/class/Class";
import type { ErrOf } from "reliq";
import { Product } from "src/server/class/Class";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Router as ExpressRouter } from "express";
import { AppDataDto, ProductDto } from "@common";

export type Store = {
    products(): 
        Promise<
            | Ok<ReadonlyArray<Readonly<Product>>> 
            | ErrOf<ReturnType<typeof ProductDto>>
            | Err<"INVALID_RESPONSE">
            | Err<[unknown]>>;
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
            | ErrOf<ReturnType<typeof ProductDto>>
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
    increaseStock(name: string, amount: bigint):
        Promise<
            | Ok<void>
            | Err<"INVALID_RESPONSE">
            | Err<"NOT_FOUND">
            | Err<[unknown]>
        >;
    decreaseStock(name: string, amount: bigint):
        Promise<
            | Ok<void>
            | ErrOf<ReturnType<typeof Product>>
            | ErrOf<ReturnType<typeof ProductDto>>
            | ErrOf<ReturnType<Product["decreaseStock"]>>
            | Err<"INVALID_RESPONSE">
            | Err<"NOT_FOUND">
            | Err<"INSUFFICIENT_STOCK">
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
            deListProduct,
            increaseStock,
            decreaseStock
        };
    }

    async function products(...[]: Parameters<Store["products"]>): ReturnType<Store["products"]> {
        let appDtoR = await _appDto();
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let result = [] as Array<Product>;
        let i = 0n;
        while (i < appDto.products.length) {
            let iFloat = Number(i);
            let productDto = appDto.products[iFloat];
            let stockInt = BigInt(productDto.stock);
            let productR = Product(productDto.name, productDto.price, stockInt);
            if (productR.err()) return productR;
            let product = productR.unwrapSafely();
            result.push(product);
            i++;
        }
        return Ok(result);
    }

    async function productsByName(...[name]: Parameters<Store["productsByName"]>): ReturnType<Store["productsByName"]> {
        let appDtoR = await _appDto(); 
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let productDto = appDto.products.find(x => x.name === name);
        if (productDto) {
            let stockInt = BigInt(productDto.stock);
            let productR = Product(productDto.name, productDto.price, stockInt);
            if (productR.err()) return productR;
            let product = productR.unwrapSafely();
            return Ok(Some(product));
        }
        return Ok(None);
    }

    async function length(...[]: Parameters<Store["length"]>): ReturnType<Store["length"]> {
        let appDtoR = await _appDto();
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let int = BigInt(appDto.products.length);
        return Ok(int);
    }

    async function listProduct(...[product]: Parameters<Store["listProduct"]>): ReturnType<Store["listProduct"]> {
        let appDtoR = await _appDto(); 
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let match = appDto.products.find(x => x.name === product.name());
        if (match) return Err("DUPLICATE" as const);
        let productDtoR = ProductDto({
            name: product.name(),
            price: product.price(),
            stock: Number(product.stock())
        });
        if (productDtoR.err()) return productDtoR;
        let productDto = productDtoR.unwrapSafely();
        appDto.products.push(productDto);
        let appDtoJsonR = Result.wrap(() => JSON.stringify(appDto));
        if (appDtoJsonR.err()) return Err<[unknown]>([appDtoJsonR.val()]);
        let appDtoJson = appDtoJsonR.unwrapSafely();
        _db.set(_dbKey, appDtoJson);
        return Ok(undefined);
    }

    async function deListProduct(...[name]: Parameters<Store["deListProduct"]>): ReturnType<Store["deListProduct"]> {
        let appDtoR = await _appDto();
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let match = appDto.products.findIndex(x => x.name === name);
        if (match === -1) return Err("NOT_FOUND");
        appDto.products.splice(match, 1);
        let appDtoJsonR = Result.wrap(() => JSON.stringify(appDto));
        if (appDtoJsonR.err()) return Err<[unknown]>([appDtoJsonR.val()]);
        let appDtoJson = appDtoJsonR.unwrapSafely();
        _db.set(_dbKey, appDtoJson);
        return Ok(undefined);
    }

    async function increaseStock(...[name, amount]: Parameters<Store["increaseStock"]>): ReturnType<Store["increaseStock"]> {
        let appDtoR = await _appDto();
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let at = appDto.products.findIndex(x => x.name === name);
        if (at === -1) return Err("NOT_FOUND" as const);
        let productDto = appDto.products.splice(at, 1)[0];
        productDto.stock += Number(amount);
        appDto.products.push(productDto);
        _db.set(_dbKey, JSON.stringify(appDto));
        return Ok(undefined);
    }

    async function decreaseStock(...[name, amount]: Parameters<Store["decreaseStock"]>): ReturnType<Store["decreaseStock"]> {       
        let appDtoR = await _appDto();
        if (appDtoR.err()) return appDtoR;
        let appDto = appDtoR.unwrapSafely();
        let at = appDto.products.findIndex(x => x.name === name);
        if (at === -1) return Err("NOT_FOUND" as const);
        let productDto = appDto.products.splice(at, 1)[0];
        let stockInt = BigInt(productDto.stock);
        let productR = Product(productDto.name, productDto.price, stockInt);
        if (productR.err()) return productR;
        let product = productR.unwrapSafely();
        let decreaseStockR = product.decreaseStock(amount);
        if (decreaseStockR.err()) return decreaseStockR;
        decreaseStockR.unwrapSafely();
        let stockFloat = Number(product.stock());
        let productDtoR = ProductDto({
            name: product.name(),
            price: product.price(),
            stock: stockFloat
        });
        if (productDtoR.err()) return productDtoR;
        productDto = productDtoR.unwrapSafely();
        appDto.products.push(productDto);
        _db.set(_dbKey, JSON.stringify(appDto));
        return Ok(undefined);
    }
1
    async function _appDto():
        Promise<
            | Ok<AppDataDto>
            | Err<"INVALID_RESPONSE">
            | Err<[unknown]>
        > {
        let responseR = await _db.get(_dbKey);
        if (responseR.err()) return responseR;
        let response = responseR.unwrapSafely();
        if (!AppDataDto.Schema.safeParse(response).success) return Err("INVALID_RESPONSE" as const);
        return Ok(response as AppDataDto);
    }
}
export namespace Store {

    export function Router(store: Store): ExpressRouter {
        return ExpressRouter()
            .get("/success")
            .get("/failure")
            .post("/checkout", async (rq, rs) => {
                Result.wrapAsync(async () => {
                    let origin: string = `${ rq.protocol }://${ rq.get("host") }`;
                    let url: string = `${ origin }/success`;

                    // TODO
                });
            });
    }
}

