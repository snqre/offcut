import type {ReactNode} from "src__/public/Bundle";
import type {RProps} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import {R} from "src__/public/Bundle";

export interface RStackProps extends RProps {
    reverse?: boolean;
}

export function RStack({reverse, style, children, ... more}: RStackProps): ReactNode {
    let css: Css = {
        justifyContent: reverse ? "end" : "start",
        ... (style as any)
    };
    
    return <>
        <R style={css} {... more}>{children}</R>
    </>;
}