import type {ReactNode} from "react";
import type {RStackProps} from "@component/layout/RStack";
import {RStack} from "@component/layout/RStack";

export type RStackScrollProps =
    & RStackProps
    & {};

export function RStackScroll(props: RStackProps): ReactNode {
    let {style, ... more} = props;
    return <><RStack style={{overflowX: "scroll", ... style}} {... more}/></>;
}