import type {ReactNode} from "react";
import type {RootProps} from "@component/root/Root";
import {Root} from "@component/root/Root";

export type RProps =
    & RootProps
    & {};

export function R(props: RProps): ReactNode {
    let {style, ... more} = props;
    return <><Root style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", ... style}} {... more}/></>;
}