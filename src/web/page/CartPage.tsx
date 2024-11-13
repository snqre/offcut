import type {ComponentPropsWithRef} from "react";
import type {MouseEventHandler} from "react";
import type {ReactNode} from "react";
import type {Maybe} from "../util/Maybe";
import type {ComponentPropsWithRef as ReactComponentPropsWithRef} from "react";
import {ResponsiveAnchorPage} from "../components/ResponsiveAnchorPage";
import {CheckoutButton} from "../components/CheckoutButton";
import {UserData} from "../common/UserData";
import {ProductData} from "../common/ProductData";
import {useEffect} from "react";
import {useState} from "react";
import * as BoxShadow from "../constant/BoxShadow";
import * as ColorPalette from "../constant/ColorPalette";
import * as Server from "../core/Server";

export function CartPage(): ReactNode {
    let [user, setUser] = useState<Maybe<UserData>>(null);

    useEffect(() => {
        setUser((Server.user()));
        return;
    }, []);

    return <>
        <ResponsiveAnchorPage>
            <CartPageContainer>
                <CartPageSlice
                    style={{
                        alignItems: "start",
                        overflowY: "scroll",
                        padding: 20,
                        gap: 20
                    }}>
                    <CartPageRow
                        slots={[
                            <CartPageRowHeading
                                label="Name"/>,
                            <CartPageRowHeading
                                label="Amount"/>,
                            <CartPageRowHeading
                                label="Price"/>,
                            <CartPageRowHeading
                                label="Stock"/>
                        ]}/>
                    <CartPageRowProduct
                        name="Jeans"
                        amount={5n}
                        price={500n}
                        stock={50n}/>
                </CartPageSlice>
                <CartPageSlice
                    style={{
                        alignItems: "end",
                        paddingLeft: 10,
                        paddingRight: 10
                    }}>
                    <CartPageContainer>
                        <CartPageUtilContainer>
                            <CheckoutButton
                                order={{
                                    buyer: {
                                        username: "Joe",
                                        hash: "123"
                                    },
                                    items: [[
                                        5000, {
                                            name: "Cheetos",
                                            description: "",
                                            price: 50,
                                            stock: 60
                                        }
                                    ]],
                                    status: "waiting"
                                }}>
                                Pay Now
                            </CheckoutButton>
                        </CartPageUtilContainer>
                    </CartPageContainer>
                </CartPageSlice>
            </CartPageContainer>
        </ResponsiveAnchorPage>
    </>;
}


// #region Container

export function CartPageContainer({
    children}: {
        children?: ReactNode;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                flexGrow: 1
            }}>
            {children}
        </div>
    </>;
}


// #region Slice

export function CartPageSlice({
    style,
    children,
    ... more}:
        & ReactComponentPropsWithRef<"div">
        & {}): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                ... style
            }}
            {... more}>
            {children}
        </div>
    </>;
}


// #region Row

export function CartPageRow({
    slots,
    style,
    children,
    ... more}: 
        & ComponentPropsWithRef<"div">
        & {
        slots: Array<ReactNode>;
    }): ReactNode {
    let components = slots.map(slot =>
    <CartPageRowItem>
        {slot}
    </CartPageRowItem>);

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                minWidth: 700,
                minHeight: 50,
                boxShadow: BoxShadow.TAILWIND_0,
                background: ColorPalette.GHOST_WHITE,
                padding: 10,
                ... style
            }}
            {... more}>
            {components}
        </div>
    </>;
}

export function CartPageRowItem({
    children}: {
        children?: ReactNode
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                flexGrow: 1
            }}>
            {children}
        </div>
    </>;
}

export function CartPageRowHeading({
    label}: {
        label: string;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1em",
                fontWeight: "bold",
                fontFamily: "suisse-intl-regular",
                color: ColorPalette.OBSIDIAN
            }}>
            {label}
        </div>
    </>;
}

export function CartPageRowProductName({
    name}: {
        name: string
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                color: ColorPalette.OBSIDIAN,
                gap: 10
            }}>
            <CartPageRowCharButton
                char="-"
                color={ColorPalette.JASPER}
                onClick={() => {}}/>
            {name}
            <CartPageRowCharButton
                char="+"
                color={ColorPalette.LIGHT_SEA_GREEN}
                onClick={() => {}}/>
        </div>
    </>;
}

export function CartPageRowCharButton({
    char,
    color,
    onClick}: {
        char: string;
        color: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
    }): ReactNode {
    return <>
        <div
            onClick={onClick}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                padding: 5,
                borderRadius: 5,
                boxShadow: BoxShadow.TAILWIND_0,
                color: color,
                width: 30,
                height: 30,
                background: ColorPalette.OBSIDIAN,
                aspectRatio: 1 / 1,
                pointerEvents: "auto",
                cursor: "pointer"
            }}>
            {char}
        </div>
    </>;
}

export function CartPageRowProduct({
    name,
    amount,
    price,
    stock}: {
        name: string;
        amount: bigint;
        price: bigint;
        stock: bigint;
    }): ReactNode {
    return <>
        <CartPageRow
            style={{
                background: "transparent"
            }}
            slots={[
                <CartPageRowProductName
                    name={name}/>,
                <CartPageRowProductItem
                    data={amount.toLocaleString()}/>,
                <CartPageRowProductItem
                    data={(Number(price) / 10**2).toLocaleString()}/>,
                <CartPageRowProductItem
                    data={stock.toLocaleString()}/>
            ]}/>
    </>;
}

export function CartPageRowProductItem({
    data}: {
        data: string;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular"
            }}>
            {data}
        </div>
    </>;
}


// #region UtilContainer

export function CartPageUtilContainer({
    children}: {
        children?: ReactNode;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "100%",
                padding: 5,
                boxShadow: BoxShadow.TAILWIND_0
            }}>
            {children}
        </div>
    </>;
}

