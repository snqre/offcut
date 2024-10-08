import type {ReactNode} from "src__/public/Bundle";
import type {CStackProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {CStack} from "src__/public/Bundle";

export interface WX768Props extends Omit<CStackProps, "reverse"> {}

export function WX768({style, children, ... more}: WX768Props): ReactNode {
    let css: Css = {
        width: "768px",
        ... (style as any)
    };
    
    return <>
        <CStack style={css} {... more}>{children}</CStack>
    </>;
}