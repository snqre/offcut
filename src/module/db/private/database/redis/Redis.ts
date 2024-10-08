import * as Host from "@host";

interface Redis extends Host.Db.Database {
    disconnect(): Promise<void>;
}

async function Redis(): Promise<Redis> {
    let _client: Host.RedisUtils.RedisClientType;

    /***/ {
        await _connect();
        return {get, set, disconnect};
    }

    async function get(key: string): Promise<unknown> {
        let item: unknown = await _client.get(key);
        if (item && typeof item === "string") {
            try {
                return JSON.parse(item);
            }
            catch {
                return item;
            }
        }
        return item;
    }

    async function set(key: string, item: unknown): Promise<void> {
        await _client.set(key, typeof item === "object" ? JSON.stringify(item) : String(item));
        return;
    }

    async function disconnect(): Promise<void> {
        _disconnect();
        return;
    }

    async function _connect(): Promise<void> {
        let password: string | undefined = process.env?.["REDIS_KEY"];
        Host.Validator.assert(password !== undefined, "MISSING_KEY");
        _client =
            Host.RedisUtils.createClient({
                password: password,
                socket: {
                    host: "redis-15112.c259.us-central1-2.gce.redns.redis-cloud.com",
                    port: 15112
                }
            });
        try {
            await _client.connect();
        }
        catch {
            await _disconnect();
        }
        return;
    }

    async function _disconnect(): Promise<void> {
        await _client.quit();
        return;
    }
}

export {Redis};