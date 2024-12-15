import { Ok, type ErrOf } from "reliq";
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

export type ProductData<T extends string> = {
    name: T;
    price: number;
    stock: number;
};
export function ProductData<T extends string>(_instance: ProductData<T>):
    | Ok<ProductData<T>>
    | Err<"INVALID_NAME">
    | Err<"INVALID_INSTANCE">
    | Err<"PRICE_BELOW_ZERO">
    | Err<"PRICE_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_BELOW_ZERO">
    | Err<"STOCK_ABOVE_MAX_SAFE_INTEGER">
    | Err<"STOCK_NOT_AN_INTEGER"> {
    
    /** @constructor */ {

        /***/ {
            if (_instance.name.length === 0) return Err("INVALID_NAME");
            if (_instance.price < 0) return Err("PRICE_BELOW_ZERO");
            if (_instance.price > Number.MAX_SAFE_INTEGER) return Err("PRICE_ABOVE_MAX_SAFE_INTEGER");
            if (_instance.stock < 0) return Err("STOCK_BELOW_ZERO");
            if (_instance.stock > Number.MAX_SAFE_INTEGER) return Err("STOCK_ABOVE_MAX_SAFE_INTEGER");
            if (!Number.isSafeInteger(_instance.stock)) return Err("STOCK_NOT_AN_INTEGER");
        }

        /***/ {
            if (!isProductData(_instance, _instance.name)) return Err("INVALID_INSTANCE"); 
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