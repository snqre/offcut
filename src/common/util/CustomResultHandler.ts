import type { ResultHandler as ReliqResultHandler } from "reliq"
import { Result as ReliqResult } from "reliq";

export type ResultHandler = 
    & ReliqResultHandler
    & {
    wrapUnsafe(unknown: unknown): [unknown];
    unwrapUnsafe(unknown: [unknown]): unknown;
};
export const CustomResultHandler: ResultHandler = (() => {

    /** @constructor */ {
        return { ... ReliqResult, wrapUnsafe, unwrapUnsafe };
    }

    function wrapUnsafe(...[unknown]: Parameters<ResultHandler["wrapUnsafe"]>): ReturnType<ResultHandler["wrapUnsafe"]> {
        return [unknown];
    }

    function unwrapUnsafe(...[unknown]: Parameters<ResultHandler["unwrapUnsafe"]>): ReturnType<ResultHandler["unwrapUnsafe"]> {
        return unknown[0];
    }
})();