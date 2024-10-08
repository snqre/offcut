import type {ReactNode} from "react";
import type {CProps} from "@component/layout/C";
import {C} from "@component/layout/C";

export type CFillProps =
    & CProps
    & {};

export function CFill(props: CFillProps): ReactNode {
    let {style, ... more} = props;
    return <><C style={{height: "100%", ... style}} {... more}/></>;
}