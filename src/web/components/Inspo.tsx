import {default as React} from "react";
import {ResponsiveAnchorPage} from "./ResponsiveAnchorPage";
import {Nav} from "./Nav";
import * as VisibilityObserver from "../hook/VisibilityObserver";
import * as BoxShadow from "../constant/BoxShadow";
import * as Device from "../hook/Device";
import * as ColorPalette from "../constant/ColorPalette";

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
        width: "100%"
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

    let load = async (): Promise<Array<React.ReactNode>> => {
        /// todo
        return [<>S</>];
    };

    let obs = VisibilityObserver.useVisibilityObserver({
        onVisible: async () => {
            if (!hasMore) return;
            loading[1](true);
            let components: React.ReactNode[] = await load();
            if (components.length === 0) {
                hasMore[1](false);
                loading[1](false);
                return;
            }
            mounted[1](mounted => [... mounted, ... components]);
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