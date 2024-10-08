import type {ReactNode} from "react";
import type {CStackProps} from "@component/layout/CStack";
import {CStack} from "@component/layout/CStack";

export type CStackScrollProps =
    & CStackProps
    & {};

export function CStackScroll(props: CStackProps): ReactNode {
    let {style, ... more} = props;
    return <><CStack style={{overflowY: "scroll", ... style}} {... more}/></>;
}