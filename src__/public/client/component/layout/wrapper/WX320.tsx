import type {ReactNode} from "src__/public/Bundle";
import type {CStackProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {CStack} from "src__/public/Bundle";

export interface WX320Props extends Omit<CStackProps, "reverse"> {}

export function WX320({style, children, ... more}: WX320Props): ReactNode {
    let css: Css = {
        width: "320px",
        ... (style as any)
    };
    
    return <>
        <CStack style={css} {... more}>{children}</CStack>
    </>;
}