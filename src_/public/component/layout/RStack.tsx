import type {ReactNode} from "react";
import type {RProps} from "@component/layout/R";
import {R} from "@component/layout/R";

export type RStackProps =
    & RProps
    & {
        reverse?: boolean
    };

export function RStack(props: RStackProps): ReactNode {
    let {reverse, style, ... more} = props;
    return <><R style={{justifyContent: reverse ? "end" : "start", ... more}} {... more}/></>;
}