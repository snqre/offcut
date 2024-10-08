import type {ReactNode} from "src__/public/Bundle";
import type {BaseProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {Base} from "src__/public/Bundle";

export interface CProps extends BaseProps {}

export function C({style, children, ... more}: CProps): ReactNode {
    let css: Css = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        ... (style as any)
    };

    return <Base style={css} {... more}>{children}</Base>
}