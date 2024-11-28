import {default as React} from "react";
import {ResponsiveAnchorPage} from "./ResponsiveAnchorPage";
import {Nav} from "./Nav_";
import {Ref} from "@web/core/Ref";
import {Option} from "ts-results";
import {Some} from "ts-results";
import {None} from "ts-results";
import * as VisibilityObserver from "../hook/VisibilityObserver";
import * as BoxShadow from "../constant/BoxShadow";
import * as Device from "../hook/Device";
import * as ColorPalette from "../constant/ColorPalette";
import * as Spring from "react-spring";

// #region Page

export function Page(): React.ReactNode {
    let device = Device.useDevice();
    let mounted = React.useState<Array<React.ReactNode>>([]);
    let loading = React.useState<boolean>(true);
    let hasMore = React.useState<boolean>(true);
    let page$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        background: ColorPalette.SNOW
    };
    let innerPage$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width:
            device === "laptop" ? 1024 :
            device === "tablet" ? 760 :
            device === "mobile" ? 320 :
            1024,
        minHeight: "auto"
    };
    let card$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 300,
        boxShadow: BoxShadow.TAILWIND_0
    };
    let row$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 10,
        paddingBottom: 10
    };
    let footer$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    };
    let obs$: React.CSSProperties = {
        width: "100%",
        height: 50
    };

    let load = async (): Promise<Option<React.ReactNode>> => {

        return Some(<_Slot>
            <>Hello</>
            <>World</>
        </_Slot>);
    };

    let obs = VisibilityObserver.useVisibilityObserver({
        onVisible: async () => {
            if (!hasMore) return;
            loading[1](true);
            let component: Option<React.ReactNode> = await load();
            if (component.none) {
                hasMore[1](false);
                loading[1](false);
                return;
            }
            mounted[1](mounted => [... mounted, component.unwrap()]);
            loading[1](false);
            return;
        },
        onHidden: async () => loading[1](false)
    });

    const loader = <>
    
    </>;

    const footer = <>
    
    </>;
    
    return <>
        <div style={page$}>
            <div style={innerPage$}>
                <Nav/>
                <div style={card$}>

                </div>
                {mounted[0].map((component, key) =>
                <div style={row$} key={key}>{component}</div>)}
                <div style={footer$}>{loading[0] ? loader : footer}</div>
                <div style={obs$} ref={obs}/>
            </div>
        </div>
    </>;
}


// #region Slot


type _SlotProps = {
    children?: Array<React.ReactNode>;
};
function _Slot(props: _SlotProps): React.ReactNode {
    let width0: number = 10;
    let width1: number = 200;
    let width = Spring.useSpring(() => ({width: width0}));
    let row$: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 20,
        paddingTop: 10,
        paddingBottom: 10
    };

    let onMouseEnter = () => width[1].start({width: width1});

    let onMouseLeave = () => width[1].start({width: width0});

    return <>
        <div style={row$}>
            {props.children?.map(content =>
            <_SlotItem>
                {content}
            </_SlotItem>)}
        </div>
    </>;
}

type _SlotItemProps = {
    isFolded?: boolean;
    children?: React.ReactNode;
};
function _SlotItem(props: _SlotItemProps): React.ReactNode {
    let spring$ =
        Spring.useSpring({
            
            height: props.isFolded ? 0 : "auto",
            opacity: props.isFolded ? 0 : 1,
            config: {
                tension: 200,
                friction: 50
            }
        });
    let style$: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: BoxShadow.TAILWIND_0,
        background: ColorPalette.GHOST_WHITE,
        pointerEvents: "auto",
        cursor: "pointer"
    };

    return <>
        <Spring.animated.div style={{... style$, ... spring$}}>
            {props.children}
        </Spring.animated.div>
    </>;
}