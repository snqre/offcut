import type { RedisClientType as RedisSocketLike } from "redis";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { createClient } from "redis";

export type RedisSocket = 
    & RedisSocketLike 
    & {};
export function RedisSocket(_host: string, _password: string, _port: bigint):
    | Ok<RedisSocket>
    | Err<"INVALID_HOST">
    | Err<"INVALID_PORT">
    | Err<"INVALID_PASSWORD">
    | Err<[unknown]> {

    /** @constructor */ {
        if (_host.length === 0) return Err<"INVALID_HOST">("INVALID_HOST");
        if (_port < 0) return Err<"INVALID_PORT">("INVALID_PORT");
        if (_password.length === 0) return Err<"INVALID_PASSWORD">("INVALID_PASSWORD");
        let socketR: Result<RedisSocket, unknown> = 
            Result.wrap(() => 
                createClient({
                    password: _password,
                    socket: {
                        host: _host,
                        port: Number(_port)
                    }
                }));
        if (socketR.err()) return Err<[unknown]>([socketR.val()]);
        let socket = socketR.unwrapSafely();
        return Ok(socket);
    }
}