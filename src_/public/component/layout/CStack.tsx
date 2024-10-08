import type {ReactNode} from "react";
import type {CProps} from "@component/layout/C";
import {C} from "@component/layout/C";

export type CStackProps =
    & CProps
    & {
        reverse?: boolean;
    };

export function CStack(props: CStackProps): ReactNode {
    let {reverse, style, ... more} = props;
    return <><C style={{justifyContent: reverse ? "end" : "start", ... more}} {... more}/></>;
}