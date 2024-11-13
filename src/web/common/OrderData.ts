import {ProductData} from "./ProductData";
import {UserData} from "./UserData";

export namespace OrderDataV2 {
    export type Type = 
        | "delivery"
        | "pickup";

    export type Status =
        | "idle"
        | "paid"
        | "done";
    
    export type OrderData = {
        type: Type;
        status: Status;
        buyerUsername: string;
        buyerEmail?: string;
        buyerPhone?: string;
        buyerAddress?: string;
    };

    export const OrderData = ({
        type,
        status = "idle",
        buyerUsername,
        buyerEmail,
        buyerPhone,
        buyerAddress
        }: OrderData) => ({
            type,
            status,
            buyerUsername,
            buyerEmail,
            buyerPhone,
            buyerAddress
        });
}






export type OrderDataType = 
    | "DELIVERY"
    | "PICK_UP";

export type OrderDataStatus =
    | "waiting"
    | "pending"
    | "enroute"
    | "rejected"
    | "failure" 
    | "success";

export type OrderData = {
    items: Array<[amount: number, product: ProductData]>;
    buyer: UserData;
    status: OrderDataStatus;
};

export const OrderData = ({
    items=[],
    buyer,
    status="waiting"
    }: OrderData) => ({
        items,
        buyer,
        status
    });

export function isOrderData(item: unknown): item is OrderData {
    if (
        !!item
        && typeof item === "object"
        && "items" in item
        && "buyer" in item
        && "status" in item
        && Array.isArray(item.items)
        && typeof item.buyer === "object"
        && typeof item.status === "string"
    ) return true;
    return false;
}