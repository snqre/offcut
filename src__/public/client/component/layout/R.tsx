import type {ReactNode} from "src__/public/Bundle";
import type {BaseProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {Base} from "src__/public/Bundle";

export interface RProps extends BaseProps {}

export function R({style, children, ... more}: RProps): ReactNode {
    let css: Css = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        ... (style as any)
    };

    return <>
        <Base style={css} {... more}>{children}</Base>
    </>;
}