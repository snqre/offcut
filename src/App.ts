import type {ExecException} from "child_process";
import type {Maybe} from "kyudo"
import type {RedisClientType as RedisSocketLike} from "redis";
import {default as Path} from "path";
import {default as Stripe} from "stripe";
import {default as Express} from "express";
import {Router} from "express";
import {createClient as RedisSocket} from "redis";
import {OrderData} from "./web/common/OrderData";
import {ProductData} from "./web/common/ProductData";
import {exec} from "child_process";
import {some} from "kyudo";
import {none} from "kyudo";
import {assert} from "kyudo";

namespace App {
    export const PUBLIC_DIRECTORY: string = Path.join(__dirname, "web");
    export const STRIPE_CURRENCY: string = "gbp";
    export const STRIPE_MODE: string = "payment";

    export type Err =
        | "INPUT_ERR_HOST_REQUIRED"
        | "INPUT_ERR_PORT_UNDERFLOW"
        | "INPUT_ERR_PASSWORD_REQUIRED"
        | "EXT_ERR_UNABLE_TO_DISCONNECT_FROM_REDIS_DB"
        | "EXT_ERR_UNABLE_TO_CONNECT_TO_REDIS_DB"
        | "ENV_ERR_REDIS_PASSWORD_REQUIRED"
        | "ENV_ERR_STRIPE_PRIVATE_KEY_REQUIRED"
        | "IO_ERR_HTML_REQUIRED";

    export type StorageLayout = {
        users: []
        products: Array<ProductData>;
    };

    export type DatabaseSchema = Record<string, Maybe<object>>;

    export type Database<T extends DatabaseSchema>
        = {
        get<X extends keyof T>(key: X): Promise<T[X]>;
        set<X extends keyof T>(key: X, data: T[X]): Promise<null>;
        disconnect(): Promise<null>;
    };

    export type RedisConfiguration = ({
        host: string;
        port: bigint;
        password: string;
    });
    
    export const RedisConfiguration = ({host, port, password}: RedisConfiguration): RedisConfiguration => ({host, port, password});

    export async function Redis<T extends DatabaseSchema>({host, port, password}: RedisConfiguration): Promise<Database<T>> {
        let _socket: RedisSocketLike;
    
        /***/ {
            assert<Err>(host.length !== 0, "INPUT_ERR_HOST_REQUIRED");
            assert<Err>(port >= 0n, "INPUT_ERR_PORT_UNDERFLOW");
            assert<Err>(password.length !== 0, "INPUT_ERR_PASSWORD_REQUIRED");
            _socket = RedisSocket({
                password: password,
                socket: ({
                    host: host,
                    port: Number(port)
                })
            });
        }
    
        /***/ {
            /***/ {
                try {
                    await _socket.connect();
                }
                catch {
                    try {
                        await disconnect();
                    }
                    catch (e) {
                        assert<Err>(false, "EXT_ERR_UNABLE_TO_DISCONNECT_FROM_REDIS_DB");
                    }
                    assert<Err>(false, "EXT_ERR_UNABLE_TO_CONNECT_TO_REDIS_DB");
                }
            }
    
            /***/ {
                return ({get, set, disconnect});
            }
    
            async function get<X extends keyof T>(key: X): Promise<T[X]> {
                return (JSON.parse((await _socket.get((key as string)))!));
            }
    
            async function set<X extends keyof T>(key: X, data: T[X]): Promise<null> {
                _socket.set((key as string), JSON.stringify(data));
                return (null);
            }
    
            async function disconnect(): Promise<null> {
                await _socket.quit();
                return (null);
            }
        }
    }

    export function StripeAdaptor(_envloc: string) {
        let _stripe: Stripe;

        /***/ {
            let key: Maybe<string> = process.env?.[_envloc];
            assert<Err>(some(key), "ENV_ERR_STRIPE_PRIVATE_KEY_REQUIRED");
            _stripe = new Stripe(key, {apiVersion: "2024-10-28.acacia"});
            return {Session};
        }

        async function Session(order: OrderData, successUrl: string) {
            let cost: number = _cost(order);
            let line = order.items.map(item => ({
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": item[1].name
                    },
                    "unit_amount": item[1].price
                },
                "quantity": Number(item[0])
            }));
            return await _stripe.checkout.sessions.create({
                "payment_method_types": ["card"],
                "line_items": line,
                "mode": "payment",
                "client_reference_id": order.buyer.username,
                "success_url": successUrl,
                
            });
        }

        function _cost(order: OrderData): number {
            let cost: bigint = 0n;
            let i: bigint = 0n;
            while (i < order.items.length) {
                let [amount, product] = order.items[Number(i)];
                cost += BigInt((Number(amount) * (Number(product.price) / 10**2)));
                i++;
            }
            return Number(cost);
        }
    }

    export async function run(): Promise<null> {
        let tsxPath: string = Path.join(PUBLIC_DIRECTORY, "App.tsx");
        await _transpile(tsxPath, PUBLIC_DIRECTORY);
        let htmlPath: string = Path.join(PUBLIC_DIRECTORY, "App.html");
        let redisPassword: Maybe<string> = process.env?.["REDIS_PASSWORD"];
        assert<Err>(some(redisPassword), "ENV_ERR_REDIS_PASSWORD_REQUIRED");
        let database: Database<StorageLayout> = await Redis(RedisConfiguration({
            host: "redis-15112.c259.us-central1-2.gce.redns.redis-cloud.com",
            port: 15112n, 
            password: redisPassword
        }));
        let stripe = StripeAdaptor("STRIPE_SECRET_KEY");
        let port: bigint = 3000n;
        let app = Express()
            .use(Express.static(PUBLIC_DIRECTORY))
            .use(Express.json())
            .post("/*/checkout", async (request, response) => {
                try {
                    const origin = `${request.protocol}://${request.get('host')}`;
                    const successUrl = `${origin}/success`;
                    
                    let order: OrderData = request.body;
                    let session = await stripe.Session(order, successUrl);  // Pass successUrl to the session
                    response.status(200).json({id: session.id});
                }
                catch (e) {
                    console.error(e);
                    response.status(500).json({code: "ERR_FAILED_TO_CREATE_CHECKOUT_SESSION"});
                    return;
                }
            })
            .get("/products", async (rq, rs) => {
                rs.send(database.get("products"));
            })
            .get("/*/success", async (request, response) => {
                console.log("SUCCESS");
            })
            .get("/", (req, res) => res.sendFile(htmlPath))
            .listen(Number(port));
        return (null);
    }

    async function _transpile(path: string, outdir: string): Promise<null> {
        let e: Maybe<ExecException> = await new Promise(resolve => exec(`bun build ${path} --outdir ${outdir}`, e => resolve(e)));
        if (e) throw (e);
        return (null);
    }
}

await App.run();