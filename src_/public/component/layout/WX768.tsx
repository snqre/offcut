import type {ReactNode} from "react";
import type {CStackProps} from "@component/layout/CStack";
import {CStack} from "@component/layout/CStack";

export type WX768Props =
    & CStackProps
    & {};

export function WX768(props: WX768Props): ReactNode {
    let {style, ... more} = props;
    return <><CStack style={{width: "768px", ... style}} {... more}/></>;
}