import type {ReactNode} from "react";
import type {ComponentPropsWithRef as ReactComponentPropsWithRef} from "react";
import type {Maybe} from "../util/Maybe";
import {ProductData} from "@web/common/ProductData";
import {UserData} from "../common/UserData";
import {OrderData} from "../common/OrderData";
import {Link} from "@web/components/Link";
import {useState} from "react";
import {useRef} from "react";
import {useEffect} from "react";
import * as Lev from "fast-levenshtein";
import * as BoxShadow from "@web/constant/BoxShadow";
import * as ColorPalette from "@web/constant/ColorPalette";
import * as Server from "../core/Server";

export function Nav(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                paddingTop: 10
            }}>
            <NavTop/>
            <NavBottom/>
        </div>
    </>;
}


// #region Top

export function NavTop(): ReactNode {
    let [products, setProducts] = useState<Array<ProductData>>([]);

    useEffect(() => {
        async () => setProducts((await Server.products()));
        return;
    }, []);

    const suggestables = () => products.map(product => NavTopSearchBarSuggestable({product}));
    
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                gap: 20,
                flexGrow: 1,
                width: "100%"
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5
                }}>
                <NavTopButton
                    label="Sign In"
                    to="/sign-in"/>
                <NavTopButton
                    label="Sign Up"
                    to="/sign-up"/>
            </div>
            <NavTopSearchBar
                icon="../icon/Search.png"
                suggestionThreshold={4n}
                suggestionCount={8n}
                suggestables={(suggestables())}/>
        </div>
    </>;
}

export function NavTopSearchBarSuggestable({
    product}: {
        product: ProductData;
    }): [string, ReactNode] {
    let {name, price, stock} = product;
    let available: boolean = stock > 0n;

    return [name, <>
        <Link
            to="/product">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1,
                    pointerEvents: available ? "auto" : "none",
                    cursor: available ? "pointer" : "auto",
                    opacity: available ? 1 : 0.5,
                    fontSize: "0.75em",
                    fontWeight: "bold",
                    fontFamily: "suisse-intl-regular",
                    color: ColorPalette.OBSIDIAN
                }}>
                {name}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 5,
                        boxShadow: BoxShadow.TAILWIND_0,
                        background: available ? ColorPalette.OFFCUT_YELLOW : ColorPalette.SNOW,
                        borderRadius: "5px"
                    }}>
                    {price.toLocaleString()}
                </div>
            </div>
        </Link>
    </>];
}

export function NavTopSearchBar({
    icon,
    suggestionThreshold=4n,
    suggestionCount=8n,
    suggestables=[]}: 
        & ReactComponentPropsWithRef<"div"> 
        & {
        icon: string;
        suggestionThreshold?: bigint;
        suggestionCount?: bigint;
        suggestables?: Array<[string, ReactNode]>;
    }): ReactNode {
    let [suggestions, setSuggestions] = useState<Maybe<Array<string>>>(null);
    let [input, setInput] = useState<Maybe<string>>(null);
    let ref = useRef<HTMLDivElement>(null);

    const removeDuplicateSuggestable = () => suggestables.filter((item, index, self) => index === self.findIndex((t) => t[0] === item[0]));

    const sort = () => {
        if (input === null) return null;
        if (input === undefined) return null;
        if (input === "") return null;
        if (suggestables === null) return null;
        return suggestables
            .map(item => item[0])
            .map(item => ({item, distance: Lev.get(input.toLocaleLowerCase(), item.toLocaleLowerCase())}))
            .filter(item => item.distance <= Number(suggestionThreshold))
            .sort((x, y) => x.distance - y.distance)
            .map(result => result.item)
            .slice(0, Number(suggestionCount));
    }

    const close = (e: MouseEvent) => {
        if (!ref.current) return;
        if (ref.current.contains((e.target as Node))) return;
        setSuggestions([]);
        return;
    }

    const lookup = (suggestion: string) => {
        for (let i = 0; i < suggestables.length; i++) if (suggestion === suggestables[i][0]) return suggestables[1];
        return <div>ERR_ITEM_NOT_FOUND</div>;
    }

    suggestables = removeDuplicateSuggestable();

    useEffect(() => setSuggestions(sort()), [input, suggestables]);

    useEffect(() => {
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return <>
        <div
            ref={ref}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                flexGrow: 1,
                position: "relative"
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    boxShadow: BoxShadow.TAILWIND_0,
                    gap: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: "100%",
                    flexGrow: 1,
                    position: "relative"
                }}>
                <div
                    style={{
                        backgroundImage: `url(${icon})`,
                        backgroundSize: "contain",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat",
                        width: 10,
                        aspectRatio: "1/1"
                    }}/>
                <input
                    type="text"
                    onChange={e => setInput(e.target.value)}
                    style={{
                        all: "unset",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "0.75em",
                        fontWeight: "normal",
                        fontFamily: "suiss-intl-regular",
                        flexGrow: 1,
                        padding: 5
                    }}/>
            </div>
            {suggestions && suggestions.length > 0 &&
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    background: ColorPalette.SNOW,
                    boxShadow: BoxShadow.TAILWIND_0,
                    zIndex: 10**18,
                    padding: 10,
                    gap: 10
                }}>
                {suggestions.map((suggestion, key) =>
                <div
                    key={key}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        fontSize: "0.75em",
                        fontWeight: "normal",
                        fontFamily: "suisse-intl-regular",
                        gap: 10
                    }}>
                    {lookup(suggestion)}    
                </div>
                )}
            </div>}
        </div>
    </>;
}

export function NavTopButton({
    label,
    to}: {
        label: string;
        to: string;
    }): ReactNode {
    return <>
        <Link
            to={to}>
            <button
                style={{
                    all: "unset",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "auto",
                    cursor: "pointer",
                    color: ColorPalette.OBSIDIAN,
                    boxShadow: BoxShadow.TAILWIND_0,
                    padding: 5,
                    borderRadius: 5,
                    fontSize: "0.75em",
                    fontWeight: "normal",
                    fontFamily: "suisse-intl-regular"
                }}>
                {label}
            </button>
        </Link>
    </>;
}


// #region Bottom

export function NavBottom(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                gap: 20
            }}>
            <NavBottomLogo/>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "start",
                    width: "100%",
                    flexGrow: 1
                }}>
                <NavBottomGotoGroup>
                    <NavBottomGotoButton
                        label="Home"
                        to="/"/>
                    <NavBottomGotoButton
                        label="Products"
                        to="/products"/>
                    <NavBottomGotoButton
                        label="Inspo"
                        to="/inspo"/>
                </NavBottomGotoGroup>
                <NavBottomUtilGroup>
                    <NavBottomAccountButton/>
                    <NavBottomCartButton/>
                </NavBottomUtilGroup>
            </div>
        </div>
    </>;
}

export function NavBottomLogo(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url(../img/Logo.png)",
                backgroundSize: "contain",
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                backgroundRepeat: "no-repeat",
                width: 150,
                aspectRatio: 2 / 1
            }}/>
    </>;
}

export function NavBottomGotoGroup({
    children}: {
        children?: ReactNode;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                gap: 20
            }}>
            {children}
        </div>
    </>;
}

export function NavBottomGotoButton({
    label,
    to}: {
        label: string;
        to: string;
    }): ReactNode {
    return <>
        <Link
            to={to}>
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
                    pointerEvents: "auto",
                    cursor: "pointer"
                }}>
                {label}
            </div>
        </Link>
    </>;
}

export function NavBottomUtilGroup({
    children}: {
        children?: ReactNode
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                gap: 10
            }}>
            {children}
        </div>
    </>;
}

export function NavBottomAccountButton(): ReactNode {
    return <>
        <Link
            to="/account">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: BoxShadow.TAILWIND_0,
                    padding: 5,
                    pointerEvents: "auto",
                    cursor: "pointer",
                    borderRadius: 5
                }}>
                <div
                    style={{
                        background: "url(../icon/Account.png)",
                        backgroundSize: "contain",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat",
                        width: 20,
                        aspectRatio: 1 / 1
                    }}/>
            </div>
        </Link>
    </>;
}

export function NavBottomCartButton(): ReactNode {
    let [count, setCount] = useState<bigint>(0n);

    useEffect(() => {
        (async () => {
            let user: Maybe<UserData> = Server.user();
            if (!user) return;
            let cart: Maybe<OrderData> = user.orders?.at(-1);
            if (!cart) return;
            if (cart.status !== "waiting") return;
            let count: bigint = BigInt(cart.items.length);
            setCount(count);
            return;
        })();
        return;
    });

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5
            }}>
            <Link
                to="/cart">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        boxShadow: BoxShadow.TAILWIND_0,
                        pointerEvents: "auto",
                        cursor: "pointer",
                        padding: 5,
                        gap: 5,
                        borderRadius: 5
                    }}>
                    <div
                        style={{
                            backgroundImage: "url(../icon/Cart.png)",
                            backgroundSize: "contain",
                            backgroundPositionX: "center",
                            backgroundPositionY: "center",
                            backgroundRepeat: "no-repeat",
                            width: 20,
                            aspectRatio: 1 / 1
                        }}/>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1em",
                            fontWeight: "normal",
                            fontFamily: "suisse-intl-regular",
                            color: ColorPalette.OBSIDIAN
                        }}>
                        Cart
                    </div>
                </div>
            </Link>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `linear-gradient(to bottom, ${ColorPalette.LIGHT_SEA_GREEN}, ${ColorPalette.MOONSTONE})`,
                    backgroundClip: "text",
                    backgroundSize: "cover",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    color: "transparent",
                    boxShadow: BoxShadow.TAILWIND_0,
                    fontSize: "1em",
                    fontWeight: "bold",
                    fontFamily: "suisse-intl-regular",
                    padding: 5
                }}>
                {count.toLocaleString()}
            </div>
        </div>
    </>;
}