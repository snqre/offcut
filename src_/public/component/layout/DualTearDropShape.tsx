import type {ReactNode} from "react";
import type {RootProps} from "@component/root/Root";
import {Root} from "@component/root/Root";

export type DualTearDropShapeProps =
    & RootProps
    & {};

export function DualTearDropShape(props: DualTearDropShapeProps): ReactNode {
    let {style, ... more} = props;
    return <><Root style={{borderTopLeftRadius: "25px", borderBottomRightRadius: "25px", ... style}} {... more}/></>;
}