import type { RedisClientType as RedisSocketLike } from "redis";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { createClient as RedisSocket } from "redis";

export type RedisAdaptor = 
    & RedisSocketLike 
    & {};
export function RedisAdaptor(_host: string, _password: string, _port: bigint):
    | Ok<RedisAdaptor>
    | Err<"INVALID_HOST">
    | Err<"INVALID_PORT">
    | Err<"INVALID_PASSWORD">
    | Err<[unknown]> {

    /** @constructor */ {
        if (_host.length === 0) return Err<"INVALID_HOST">("INVALID_HOST");
        if (_port < 0) return Err<"INVALID_PORT">("INVALID_PORT");
        if (_password.length === 0) return Err<"INVALID_PASSWORD">("INVALID_PASSWORD");
        let socket: Result<RedisAdaptor, unknown> = 
            Result.wrap(() => 
                RedisSocket({
                    password: _password,
                    socket: {
                        host: _host,
                        port: Number(_port)
                    }
                }));
        if (socket.err()) return Err<[unknown]>([socket.val()]);
        return Ok((socket.unwrapSafely() as RedisAdaptor));
    }
}