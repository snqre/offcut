import type {Request} from "express";

export type RequestAdaptor = {
    origin(): string;
};
export function RequestAdaptor(_request: Request): RequestAdaptor {
    /***/ {
        return {origin};
    }

    function origin(): string {
        return `${_request.protocol}://${_request.get("host")}`;
    }
}