import type {ReactNode} from "react";
import type {CStackProps} from "@component/layout/CStack";
import {CStack} from "@component/layout/CStack";

export type WX320Props =
    & CStackProps
    & {};

export function WX320(props: WX320Props): ReactNode {
    let {style, ... more} = props;
    return <><CStack style={{width: "320px", ... style}} {... more}/></>;
}