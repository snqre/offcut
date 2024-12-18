import type { Database } from "@server/class";
import type { ErrOf } from "reliq";
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
    let _instance: Redis;
    let _adaptor: RedisAdaptor;

    /** @constructor */ {
        _instance = { get, set, disconnect: disconnect };
        let adaptorR = RedisAdaptor(_host, _password, _port);
        if (adaptorR.err()) return adaptorR;
        let adaptor = adaptorR.unwrapSafely();
        _adaptor = adaptor;
        let connectR = await Result.wrapAsync(async () => await adaptor.connect());
        if (connectR.ok()) return Ok(_instance);
        let disconnectR = await disconnect();
        if (disconnectR.err()) return disconnectR;
        return Err([connectR.val()]);
    }

    async function get(...[key]: Parameters<Redis["get"]>): ReturnType<Redis["get"]> {
        let responseR = await Result.wrapAsync(async () => await _adaptor.get(key));
        if (responseR.err()) return Err([responseR.val()]);
        let response = responseR.unwrapSafely();
        if (response === null) return Ok(None);
        let dataR = Result.wrap(() => JSON.parse(response));
        if (dataR.err()) return Err([dataR.val()]);
        let data = dataR.unwrapSafely() as unknown;
        return Ok(Some(data));
    }

    async function set(...[key, object]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let dataR = _toString(object);
        if (dataR.err()) return dataR;
        let data = dataR.unwrapSafely();
        return _set(key, data);
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        let quiteR = await Result.wrapAsync(async () => _adaptor.quit());
        if (quiteR.err()) return Err<[unknown]>([quiteR.val()]);
        return Ok(undefined);
    }

    async function _set(key: string, cargo: string):
        Promise<
            | Ok<void>
            | Err<[unknown]>
        > {
        let setR = await Result.wrapAsync(async () => await _adaptor.set(key, cargo));
        if (setR.err()) return Err<[unknown]>([setR.val()]);
        return Ok(undefined);
    }

    function _toString(v: object):
        | Ok<string>
        | Err<[unknown]> {
        let dataR = Result.wrap(() => JSON.stringify(v));
        if (dataR.err()) return Err<[unknown]>([dataR.val()]);
        let data = dataR.unwrapSafely();
        return Ok(data);
    }
}