import type { Database } from "@server/class";
import type { ErrOf } from "reliq";
import { CustomResultHandler } from "@common";
import { RedisAdaptor } from "@server/class";
import { Result } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";

export type Redis = 
    & Database
    & {

    get(key: string): 
        Promise<
            | Ok<Some<unknown>>
            | Ok<None>
            | Err<[unknown]>
        >;

    set(key: string, data: object):
        Promise<
            | Ok<void>
            | Err<[unknown]>
        >;
        
    disconnect(): Promise<Result<void, [unknown]>>;
};
export async function Redis(_host: string, _password: string, _port: bigint):
    Promise<
        | Ok<Redis>
        | ErrOf<ReturnType<typeof RedisAdaptor>>
    > {
    let _socket: RedisAdaptor;

    /** @constructor */ {
        let socketR: ReturnType<typeof RedisAdaptor> = RedisAdaptor(_host, _password, _port);
        if (socketR.err()) return socketR;
        _socket = socketR.unwrapSafely();
        let connectR:
            | Ok<void>
            | Err<unknown> 
            = 
                await Result.wrapAsync(async () => {
                    await _socket.connect();
                    return undefined;
                });
        if (connectR.err()) {
            let disconnectR:
                | Ok<void>
                | Err<[unknown]>
                = await disconnect();
            if (disconnectR.err()) return disconnectR;
            return Err<[unknown]>([connectR.val()]);
        }
        return Ok({ get, set, disconnect });
    }

    async function get(...[key]: Parameters<Redis["get"]>): ReturnType<Redis["get"]> {
        let content: string;
        let result: unknown;

        /***/ {
            let r: Result<string | null, unknown> = await Result.wrapAsync(async () => await _socket.get(key));
            if (r.err()) return Err(CustomResultHandler.wrapUnsafe(r.val()));
            if (!r.unwrapSafely()) return Ok(None);
            content = r.unwrapSafely()!;
        }

        /***/ {
            let r: Result<unknown, unknown> = Result.wrap(() => JSON.parse(content));
            if (r.err()) return Err(CustomResultHandler.wrapUnsafe(r.val()));
            result = r.unwrapSafely();
        }


        return Ok(Some(result));
    }

    async function set(...[key, object]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let data: ReturnType<typeof _toString> = _toString(object);
        if (data.err()) return data;
        return _set(key, data.unwrapSafely());
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        let r: Result<string, unknown> = await Result.wrapAsync(async () => _socket.quit());
        if (r.err()) return Err<[unknown]>([r.val()]);
        return Ok(undefined);
    }

    async function _set(key: string, cargo: string): Promise<Result<void, [unknown]>> {
        let setR: Result<string | null, void> = await Result.wrapAsync(async () => await _socket.set(key, cargo));
        if (setR.err()) return Err<[unknown]>([setR.val()]);
        return Ok(undefined);
    }

    function _toString(v: object): Result<string, [unknown]> {
        let data: Result<string, unknown> = Result.wrap(() => JSON.stringify(v));
        if (data.err()) return Err<[unknown]>([data.val()]);
        return Ok(data.unwrapSafely());
    }
}