import type {ReactNode} from "react";
import type {RProps} from "@component/layout/R";
import {R} from "@component/layout/R";

export type RFillProps =
    & RProps
    & {};

export function RFill(props: RFillProps): ReactNode {
    let {style, ... more} = props;
    return <><R style={{width: "100%", ... style}} {... more}/></>;
}