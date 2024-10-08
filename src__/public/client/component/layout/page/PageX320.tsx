import type {ReactNode} from "src__/public/Bundle";
import type {CProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {C} from "src__/public/Bundle";
import {WX320} from "src__/public/Bundle";

export interface PageX320Props extends CProps {}

export function PageX320({style, children, ... more}: PageX320Props): ReactNode {
    let css: Css = {
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
        justifyContent: "start",
        ... (style as any)
    };

    return <>
        <C style={css} {... more}><WX320>{children}</WX320></C>
    </>;
}