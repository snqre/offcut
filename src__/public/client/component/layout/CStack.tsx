import type {ReactNode} from "src__/public/Bundle";
import type {CProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {C} from "src__/public/Bundle";

export interface CStackProps extends CProps {
    reverse?: boolean;
}

export function CStack({reverse, style, children, ... more}: CStackProps): ReactNode {
    let css: Css = {
        justifyContent: reverse ? "end" : "start",
        ... (style as any)
    };
    
    return <>
        <C style={css} {... more}>{children}</C>
    </>;
}