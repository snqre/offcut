import type {MouseEventHandler} from "react";
import type {ReactNode} from "react";
import type {Maybe} from "../util/Maybe";
import {ResponsiveAnchorPage} from "../components/ResponsiveAnchorPage";
import {CheckoutButton} from "../components/CheckoutButton";
import {UserData} from "../common/UserData";
import {OrderData} from "../common/OrderData";
import {Ref} from "@web/core/Ref";
import {Option} from "ts-results";
import {Some} from "ts-results";
import {None} from "ts-results";
import * as BoxShadow from "../constant/BoxShadow";
import * as ColorPalette from "../constant/ColorPalette";
import * as Server from "../core/Server";
import * as React from "react";
import * as ReactRouterDom from "react-router-dom";


// #region Shopping Cart

export type Item = {
    name: string;
    amount: bigint;
    price: number;
    stock: bigint;
};
export const Item = (item: Item) => item;

const _set: Ref<ReadonlyArray<Item>> = Ref([]);
const _user: Ref<Option<UserData>> = Ref(None);
const _order: Ref<Option<OrderData>> = Ref(None);

export function items(): ReadonlyArray<Item>;
export function items(i: number): Option<Readonly<Item>>;
export function items(i?: number): ReadonlyArray<Item> | Option<Readonly<Item>> {
    if (i) {
        let item: Maybe<Item> = _set.get().at(Number(i));
        if (item) return Some(item);
        return None;
    }
    return _set.get();
}

export function insert(item: Item): void {
    if (_keyof(item.name) === -1n) return _set.set([... items().slice(), item]);
    items()[Number(_keyof(item.name))].amount += 1n;
    return;
}

export function remove(name: string): void {
    let key: bigint = _keyof(name);
    if (key === -1n) return;
    let remaining: bigint = items()[Number(_keyof(name))].amount -= 1n;
    if (remaining !== 0n) return;
    _set.set(items().filter((_, i) => BigInt(i) !== key));
    return;
}

function _keyof(name: string): bigint {
    return BigInt(items().findIndex(item => item.name === name));
}


// #region Page

export function Page(): React.ReactNode {
    return <>
        <_Scaffold>
            <_Table/>
            <_Checkout/>
        </_Scaffold>
    </>;
}

type _ScaffoldProps = {
    children: [React.ReactNode, React.ReactNode];
};
function _Scaffold(props: _ScaffoldProps): React.ReactNode {
    let table$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexGrow: 1
    };
    let checkout$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "end",
        height: "100%",
        paddingLeft: 10,
        paddingRight: 10
    };

    return <>
        <ResponsiveAnchorPage>
            <div style={table$}>
                {props.children[0]}
            </div>
            <div style={checkout$}>
                {props.children[1]}
            </div>
        </ResponsiveAnchorPage>
    </>;
}


// #region Table

type _TableProps = {};
function _Table(props: _TableProps): React.ReactNode {
    let set = React.useState<ReadonlyArray<Item>>([]);
    let nav = ReactRouterDom.useNavigate();
    let container$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexGrow: 1,
        overflowY: "scroll",
        padding: 20,
        gap: 20
    };

    React.useEffect(() => {
        let user = Server.user();
        if (user) _user.set(Some(user));
        else return nav("/sign-in");
        let copy: ReadonlyArray<Item> = _set.get();
        set[1](copy);
        const del = _set.mount(copy => set[1](copy));
        return () => del();
    }, []);

    return <>
        <div style={container$}>
            <_TableHeadingRow>
                <_TableHeading>Product</_TableHeading>
                <_TableHeading>Amount</_TableHeading>
                <_TableHeading>Price</_TableHeading>
                <_TableHeading>Stock</_TableHeading>
                <_TableHeading> </_TableHeading>
            </_TableHeadingRow>
            {set[0]?.map(item => 
            <_TableItem
                name={item.name}
                amount={item.amount}
                price={item.price}
                stock={item.stock}/>)}
        </div>
    </>;
}

type _TableItemProps = {
    name: string;
    amount: bigint;
    price: number;
    stock: bigint;
};
function _TableItem(props: _TableItemProps): React.ReactNode {
    function insertItem(): void {
        insert(Item({
            name: props.name,
            amount: props.amount,
            price: props.price,
            stock: props.stock
        }));
        return;
    }

    function removeItem(): void {
        remove(props.name);
        return;
    }

    return <>
        <_TableRow>
            <_TableCell>{props.name}</_TableCell>
            <_TableCell>{props.amount.toLocaleString()}</_TableCell>
            <_TableCell>{props.price}</_TableCell>
            <_TableCell>{props.stock.toLocaleString()}</_TableCell>
            <_TableCell>
                <_TableSymbolButton color={ColorPalette.MOONSTONE} onClick={() => insertItem()}>+</_TableSymbolButton>
                <_TableSymbolButton color={ColorPalette.JASPER} onClick={() => removeItem()}>-</_TableSymbolButton>
            </_TableCell>
        </_TableRow>
    </>;
}

type _TableHeadingRowProps = {
    children: ReadonlyArray<ReactNode>;
};
function _TableHeadingRow(props: _TableHeadingRowProps): ReactNode {
    let style$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
        boxShadow: BoxShadow.TAILWIND_0,
        gap: 10
    };
    return <>
        <div style={style$}>
            {props.children.map(child =>
            <>
                {child}
            </>)}
        </div>
    </>;
}

type _TableRowProps = {
    children: ReadonlyArray<ReactNode>;
};
function _TableRow(props: _TableRowProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: 10
            }}>
            {props.children.map(child =>
            <>
                {child}
            </>)}
        </div>
    </>;
}

type _TableHeadingProps = {
    children: Readonly<ReactNode>;
};
function _TableHeading(props: _TableHeadingProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                fontSize: "1.25em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                color: ColorPalette.OBSIDIAN
            }}>
            {props.children}
        </div>
    </>;
}

type _TableCellProps = {
    children: Readonly<ReactNode>;
};
function _TableCell(props: _TableCellProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                color: ColorPalette.OBSIDIAN,
                gap: 10
            }}>
            {props.children}
        </div>
    </>;
}

type _TableSymbolButtonProps = {
    color: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    children: ReactNode;
};
function _TableSymbolButton(props: _TableSymbolButtonProps): ReactNode {
    let style$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        aspectRatio: 1 / 1,
        boxShadow: BoxShadow.TAILWIND_0,
        fontSize: "1em",
        fontWeight: "normal",
        fontFamily: "suisse-intl-regular",
        color: props.color,
        pointerEvents: "auto",
        cursor: "pointer",
        padding: 5
    };

    return <>
        <div style={style$} onClick={e => props.onClick(e)}>
            {props.children}
        </div>
    </>;
}


// #region Checkout

function _Checkout(): React.ReactNode {
    let order = React.useState<Option<OrderData>>(None);
    let container$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexGrow: 1,
        padding: 20
    };
    let checkoutButtonContainer$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"  
    };
    let checkoutButton$: React.CSSProperties = {
        padding: 5,
        borderRadius: 5
    };

    React.useEffect(() => {
        order[1]((_order.get()));
        const del = _order.mount(copy => order[1](copy));
        return () => del();
    }, []);

    return <>
        <div style={container$}>
            <div style={checkoutButtonContainer$}>
                {order[0].some ? 
                <CheckoutButton style={checkoutButton$} order={order[0].unwrap()}>
                    Checkout
                </CheckoutButton> :
                undefined}
            </div>
        </div>
    </>;
}