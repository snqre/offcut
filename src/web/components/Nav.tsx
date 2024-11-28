import {default as React} from "react";
import * as ColorPalette from "../constant/ColorPalette";

export type RootProps = {

};
export function Root(): React.ReactNode {
    let container$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10
    };
    let logo$: React.CSSProperties = {
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
    };


    // #region Button
    
    let button$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        pointerEvents: "auto",
        cursor: "pointer",
        fontSize: "0.75em",
        fontWeight: "normal",
        fontFamily: "suisse-intl-regular",
        color: ColorPalette.OBSIDIAN
    };


    // #region Button With Star

    let buttonWithStarContainer$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    };
    let buttonWithStarIconContainer$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        position: "relative"
    };
    let buttonWithStarIcon$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(../icon/Star.png)",
        backgroundSize: "contain",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        width: 30,
        aspectRatio: 1 / 1,
        position: "absolute",
        bottom: 0,
        right: 2.5
    };
    let buttonWithStarButton$: React.CSSProperties = {
        ... button$,
        background: ColorPalette.OBSIDIAN,
        color: ColorPalette.SNOW
    };


    // #region Button Group

    let buttonGroup$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    };


    // #region Button Container

    let buttonContainer$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        position: "relative"
    };


    // #region Search Bar

    let searchBarContainer$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        pointerEvents: "auto",
        width: 300,
        gap: 10
    };
    let searchBarIcon$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(../icon/Search.png)",
        backgroundSize: "contain",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        width: 10,
        aspectRatio: 1 / 1
    };
    let searchBarInput$: React.ComponentPropsWithRef<"input"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
            color: ColorPalette.OBSIDIAN,
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            height: "100%"
        }
    };

    return <>
        <div style={container$}>
            <div style={logo$}/>
            <_ButtonGroup>
                <div style={buttonWithStarIconContainer$}><div style={buttonWithStarIcon$}/></div>
                <_Button type="inverted">For You</_Button>
            </_ButtonGroup>
            <_ButtonGroup>
                <_Button>Materials</_Button>
                <_Button>Sign In</_Button>
            </_ButtonGroup>
            <div style={searchBarContainer$}>
                <div style={searchBarIcon$}/>
                <input {... searchBarInput$}/>
            </div>
            <_ButtonGroup>
                <_Button>Basket</_Button>
                <_Button>Contact Us</_Button>
            </_ButtonGroup>
        </div>
    </>;
}


// #region Button Group

type _ButtonGroupProps = {
    children?: React.ReactNode;
};
function _ButtonGroup(props: _ButtonGroupProps): React.ReactNode {
    let container$: React.ComponentPropsWithRef<"div"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        }
    };

    return <>
        <div {... container$}>{props.children}</div>
    </>;
}


// #region Button

type _ButtonProps = {
    type?:
        | "standard"
        | "inverted"
    children?: React.ReactNode;
};
function _Button(props: _ButtonProps): React.ReactNode {
    props.type ??= "standard";
    let container$: React.ComponentPropsWithRef<"button"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "gray",
            borderRadius: 10,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            background: props.type === "inverted" ? ColorPalette.OBSIDIAN : "transparent",
            color: props.type === "inverted" ? ColorPalette.SNOW : ColorPalette.OBSIDIAN,
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            pointerEvents: "auto",
            cursor: "pointer"
        }
    };

    return <>
        <button {... container$}>{props.children}</button>
    </>;
}


// #region Drop Down

type _DropDownProps = {
    children: [React.ReactNode, React.ReactNode];
};
function _DropDown(props: _DropDownProps): React.ReactNode {
    let open = React.useState(false);

    let container$: React.ComponentPropsWithRef<"div"> = {
        onBlur: () => open[1](false),
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        }
    };
    let buttonContainer$: React.ComponentPropsWithRef<"div"> = {
        "onClick": () => open[1](true),
        "aria-expanded": open[0],
        "aria-haspopup": "true",
        "style": {
            "all": "unset",
            "display": "flex",
            "flexDirection": "row",
            "justifyContent": "center",
            "alignItems": "center",
            "color": "grey",
            "fontSize": "0.5em",
            "fontWeight": "normal",
            "fontFamily": "suisse-intl-regular",
            "gap": 5
        }
    };
    let dropDownContainer$: React.ComponentPropsWithRef<"div"> = {
        style: {
            position: "absolute",
            bottom: "100%",
            display: open[0] ? "block" : "none"
        }
    };

    return <>
        <div {... container$}>
            <div {... buttonContainer$}>{props.children[0]}</div>
            <div {... dropDownContainer$}>{props.children[1]}</div>
        </div>
    </>;
}

"▼";