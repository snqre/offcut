import type {ReactNode} from "src__/public/Bundle";
import type {ComponentPropsWithRef} from "src__/public/Bundle";
import {animated} from "src__/public/Bundle";

export interface BaseProps extends ComponentPropsWithRef<typeof animated.div> {}

export function Base({... more}: BaseProps): ReactNode {
    return <animated.div {... more}/>;
}