import type {ReactNode} from "src__/public/Bundle";
import type {CProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {C} from "src__/public/Bundle";
import {WX768} from "src__/public/Bundle";

export interface PageX768Props extends CProps {}

export function PageX768({style, children, ... more}: PageX768Props): ReactNode {
    let css: Css = {
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
        justifyContent: "start",
        ... (style as any)
    };

    return <>
        <C style={css} {... more}><WX768>{children}</WX768></C>
    </>;
}