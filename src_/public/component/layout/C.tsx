import type {ReactNode} from "react";
import type {RootProps} from "@component/root/Root";
import {Root} from "@component/root/Root";

export type CProps =
    & RootProps
    & {};

export function C(props: CProps): ReactNode {
    let {style, ... more} = props;
    return <><Root style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", ... style}} {... more}/></>;
}