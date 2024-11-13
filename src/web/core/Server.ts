import type {AxiosResponse} from "axios";
import type {Maybe} from "../util/Maybe";
import {default as Axios} from "axios";
import {ProductData} from "../common/ProductData";
import {UserData} from "../common/UserData";
import {OrderData} from "../common/OrderData";
import {SignInRequest} from "../common/SignInRequest";
import {assert} from "../util/Assert";


// #region |> Product

export async function products(): Promise<Array<ProductData>> {
    let response: AxiosResponse = await Axios.get("/get/products");
    let data: unknown = response.data;
    let errcode: string = "SERVER_ERR_UNSUPPORTED_RESPONSE";
    assert(Array.isArray(data), errcode);
    (data as any).forEach((product: unknown) => assert(
        !!product
        && typeof product === "object"
        && "name" in product
        && "description" in product
        && "price" in product
        && "stock" in product
        && typeof product.name === "string"
        && typeof product.description === "string"
        && typeof product.price === "bigint"
        && typeof product.stock === "bigint",
        errcode
    ));
    return (data as Array<ProductData>);
}


// #region |> User

let _user: Maybe<UserData> = null;

export function user(): Maybe<UserData> {
    return _user;
}

export function loggedIn(): boolean {
    return !!_user;
}

export async function signIn(request: SignInRequest): Promise<UserData> {
    if (loggedIn()) return _user!;
    let response: AxiosResponse = await Axios.post("/user/sign-in", request);
    let data: unknown = response.data;
    let errcode: string = "SERVER_ERR_UNSUPPORTED_RESPONSE";
    assert(
        !!data
        && typeof data === "object"
        && "username" in data
        && "hash" in data
        && typeof data.username === "string"
        && typeof data.hash === "string",
        errcode
    );
    return (data as UserData);
}

export async function signUp() {

}