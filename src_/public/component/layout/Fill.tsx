import type {ReactNode} from "react";
import type {RootProps} from "@component/root/Root";
import {Root} from "@component/root/Root";

export type FillProps =
    & RootProps
    & {};

export function Fill(props: FillProps): ReactNode {
    let {style, ... more} = props;
    return <><Root style={{width: "100%", height: "100%", ... style}} {... more}/></>;
}