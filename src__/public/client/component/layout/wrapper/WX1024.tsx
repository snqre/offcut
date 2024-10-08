import type {ReactNode} from "src__/public/Bundle";
import type {CStackProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {CStack} from "src__/public/Bundle";

export interface WX1024Props extends Omit<CStackProps, "reverse"> {}

export function WX1024({style, children, ... more}: WX1024Props): ReactNode {
    let css: Css = {
        width: "1024px",
        overflowX: "hidden",
        overflowY: "hidden",
        ... (style as any)
    };
    
    return <>
        <CStack style={css} {... more}>{children}</CStack>
    </>;
}