import type { Database } from "src/server/class/Class";
import { default as RedisUtil } from "redis";
import { CustomResultHandler } from "@common";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";

export type RedisR<T extends object> = Result<RedisT<T>, RedisE>;
export type RedisT<T extends object> = Redis<T>;
export type RedisE =
    | "ERR_INVALID_HOST"
    | "ERR_PORT_BELOW_ZERO"
    | "ERR_INVALID_PASSWORD"
    | [unknown];
export type Redis<T extends object> = 
    & Database<T>
    & {
    get(key: string): Promise<Result<T, [unknown]>>;
    set(key: string, data: T): Promise<Result<void, [unknown]>>;
    disconnect(): Promise<Result<void, [unknown]>>;
};
export async function Redis<T extends object>(_host: string, _password: string, _port: bigint): Promise<RedisR<T>> {
    let _socket: RedisUtil.RedisClientType;

    /** @constructor */ {

        /***/ {
            if (_host.length === 0) return Err("ERR_INVALID_HOST");
            if (_port < 0) return Err("ERR_PORT_BELOW_ZERO");
            if (_password.length === 0) return Err("ERR_INVALID_PASSWORD");
        }

        /***/ {
            let socketR = 

            let socket: Awaited<ReturnType<typeof _construct>> = await _construct(_host, _password, _port);
            if (socket.err()) return socket;
            _socket = socket.unwrapSafely();
        }

        /***/ {
            let connectR: Result<RedisUtil.RedisClientType, unknown> = await Result.wrapAsync(async () => await _socket.connect());
            if (connectR.err()) {
                let disconnectR: Awaited<ReturnType<typeof disconnect>> = await disconnect();
                if (disconnectR.err()) return disconnectR;
                return Err<[unknown]>([connectR.val()]);
            }
        }

        return Ok({ get, set, disconnect });
    }

    async function get(...[key]: Parameters<Redis["get"]>): ReturnType<Redis["get"]> {
        return await Result.wrapAsync(async () => await _socket.get(key));
    }

    async function set(...[key, v]: Parameters<Redis["set"]>): ReturnType<Redis["set"]> {
        let cargo: ReturnType<typeof _toString> = _toString(v);
        if (cargo.err()) return cargo;
        return _set(key, cargo.unwrapSafely());
    }

    async function disconnect(): ReturnType<Redis["disconnect"]> {
        let r: Result<string, unknown> = await Result.wrapAsync(async () => _socket.quit());
        if (r.err()) return Err<[unknown]>([r.val()]);
        return Ok(undefined);
    }

    async function _construct(host: string, password: string, port: bigint): Promise<Result<RedisUtil.RedisClientType, [unknown]>> {
        let r: Result<RedisUtil.RedisClientType, unknown> = 
        await Result.wrapAsync(async () =>
            RedisUtil.createClient({
                password: password,
                socket: {
                    host: host,
                    port: Number(port)
                }
            }));
        if (r.err()) return Err<[unknown]>([r.val()]);
        return Ok(r.unwrapSafely());
    }

    async function _set(key: string, cargo: string): Promise<Result<void, [unknown]>> {
        let r: Result<string | null, void> = await Result.wrapAsync(async () => await _socket.set(key, cargo));
        if (r.err()) return Err<[unknown]>([r.val()]);
        return Ok(undefined);
    }

    function _toString(v: object): Result<string, [unknown]> {
        let cargo: Result<string, unknown> = Result.wrap(() => JSON.stringify(v));
        if (cargo.err()) return Err<[unknown]>([cargo.val()]);
        return Ok(cargo.unwrapSafely());
    }
}

