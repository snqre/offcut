import type {ReactNode} from "react";
import type {FillProps} from "@component/layout/Fill";
import {Fill} from "@component/layout/Fill";

export type RackProps =
    & FillProps
    & {};

export function Rack(props: RackProps): ReactNode {
    let {style, ... more} = props;
    return <><Fill style={{position: "relative", ... style}} {... more}/></>;
}