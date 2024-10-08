import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react-spring";
import {animated} from "react-spring";

export type RootProps = 
    & ComponentPropsWithRef<typeof animated.div> 
    & {};

export function Root(props: RootProps): ReactNode {
    return <><animated.div {... props}/></>
}