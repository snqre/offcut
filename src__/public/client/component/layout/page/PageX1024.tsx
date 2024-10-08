import type {ReactNode} from "src__/public/Bundle";
import type {CProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {C} from "src__/public/Bundle";
import {WX1024} from "src__/public/Bundle";

export interface PageX1024Props extends CProps {}

export function PageX1024({style, children, ... more}: PageX1024Props): ReactNode {
    let css: Css = {
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
        justifyContent: "start",
        ... (style as any)
    };

    return <>
        <C style={css} {... more}><WX1024>{children}</WX1024></C>
    </>;
}
