import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { z as ZodValidator } from "zod";

let _schema = 
    ZodValidator.object({
        name: 
            ZodValidator
                .string()
                .min(1)
                .refine(v => v ? v.trim().length > 0 : true),
        price: 
            ZodValidator
                .number()
                .min(0)
                .finite(),
        stock: 
            ZodValidator
                .number()
                .min(0)
                .finite()
                .int()
    });

export type ProductDataR<T extends string> = Result<ProductDataT<T>, ProductDataE>;
export type ProductDataT<T extends string> = ProductData<T>;
export type ProductDataE =
    | "ERR_VOID_NAME"
    | "ERR_PRICE_BELOW_ZERO"
    | "ERR_PRICE_ABOVE_MAX_SAFE_INTEGER"
    | "ERR_STOCK_BELOW_ZERO"
    | "ERR_STOCK_ABOVE_MAX_SAFE_INTEGER"
    | "ERR_STOCK_NOT_AN_INTEGER"
    | "ERR_INVALID_INSTANCE";
export type ProductData<T extends string> = {
    name: T;
    price: number;
    stock: number;
};
export function ProductData<T extends string>(_instance: ProductData<T>): ProductDataR<T> {
    
    /** @constructor */ {

        /***/ {
            if (_instance.name.length === 0) return Err("ERR_VOID_NAME");
            if (_instance.price < 0) return Err("ERR_PRICE_BELOW_ZERO");
            if (_instance.price > Number.MAX_SAFE_INTEGER) return Err("ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
            if (_instance.stock < 0) return Err("ERR_STOCK_BELOW_ZERO");
            if (_instance.stock > Number.MAX_SAFE_INTEGER) return Err("ERR_STOCK_ABOVE_MAX_SAFE_INTEGER");
            if (!Number.isSafeInteger(_instance.price)) return Err("ERR_STOCK_NOT_AN_INTEGER");
        }

        /***/ {
            if (!isProductData(_instance, _instance.name)) return Err("ERR_INVALID_INSTANCE"); 
        }

        return Ok(_instance);
    }
}

export function isProductData<T extends string>(unknown: unknown, name: T): unknown is ProductData<T> {
    
    /***/ {
        let match: boolean = _schema.safeParse(unknown).success && (unknown as ProductData<T>).name === name;
        if (match) return true;
    }

    return false;
}