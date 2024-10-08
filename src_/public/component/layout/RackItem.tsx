import type {ReactNode} from "react";
import type {FillProps} from "@component/layout/Fill";
import {Fill} from "@component/layout/Fill";

export type RackItemProps =
    & FillProps
    & {};

export function RackItem(props: RackItemProps): ReactNode {
    let {style, ... more} = props;
    return <><Fill style={{width: "100%", height: "100%", position: "absolute", ... style}} {... more}/></>;
}