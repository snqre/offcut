import {OrderData} from "./OrderData";

export type UserData = {
    username: string;
    hash: string; /// password hash
    email?: string;
    phone?: string;
    address?: string;
    style?: Array<string>;
    orders?: Array<OrderData>;
};

export const UserData = ({
    username,
    hash,
    email,
    phone,
    address,
    style,
    orders}: UserData) => ({
        username,
        hash,
        email,
        phone,
        address,
        style,
        orders
    });