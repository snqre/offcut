import type {ReactNode} from "react";
import type {CStackProps} from "@component/layout/CStack";
import {CStack} from "@component/layout/CStack";

export type WX1024Props =
    & CStackProps
    & {};

export function WX1024(props: WX1024Props): ReactNode {
    let {style, ... more} = props;
    return <><CStack style={{width: "1024px", ... style}} {... more}/></>;
}