import type { Database } from "@server/class";
import type { ErrOf } from "reliq";
import { RedisSocket } from "@server/class";
import { Result } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";

export type RedisR = RedisT | RedisE;
export type RedisT = Ok<Redis>;
export type RedisE = ErrOf<ReturnType<typeof RedisSocket>> | Err<[unknown]>;
export type Redis =
    & Database
    & {
    disconnect(): 
        Promise<
            | Ok<void>
            | Err<[unknown]>
        >;
};
export async function Redis(_host: string, _password: string, _port: bigint): Promise<RedisR> {
    let _self: Redis;
    let _socket: RedisSocket;
    
    /** @constructor */ {
        _self = { get, set, disconnect };
        let socketR = RedisSocket(_host, _password, _port);
        if (socketR.err()) return socketR;
        _socket = socketR.unwrapSafely();
        let connectR = await Result.wrapAsync(_socket.connect);
        if (connectR.ok()) return Ok(_self);
        let disconnectR = await disconnect();
        if (disconnectR.err()) return disconnectR;
        return Err<[unknown]>([connectR.val()]);
    }

    async function get(... [key]: Parameters<Redis["get"]>): ReturnType<Redis["get"]> {
        let responseR = await Result.wrapAsync(async () => await _socket.get(key));
        if (responseR.err()) return Err([responseR.val()]);
        let response = responseR.unwrapSafely();
        if (response === null) return Ok(None);
        if (response === undefined) return Ok(None);
        return Ok(Some(response));
    }

    async function set(... [key, data]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let setR = await Result.wrapAsync(async () => _socket.set(key, data));
        if (setR.err()) return Err<[unknown]>([setR.val()]);
        return Ok(undefined);
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        let quitR = await Result.wrapAsync(_socket.quit);
        if (quitR.err()) return Err<[unknown]>([quitR.val()]);
        return Ok(undefined);
    }
}