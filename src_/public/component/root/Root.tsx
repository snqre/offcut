import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react-spring";
import type {IntersectionObserverOption} from "@component/hook/observer/VisibilityObserver";
import type {IntersectionObserverCallback} from "@component/hook/observer/VisibilityObserver";
import {animated} from "react-spring";
import {useVisibilityObserver} from "@component/hook/observer/VisibilityObserver";

export type RootProps = 
    & ComponentPropsWithRef<typeof animated.div>
    & IntersectionObserverOption
    & {};

export function Root(props: RootProps): ReactNode {
    let {onVisible, onHidden, style, ... more} = props;
    let visibilityRef: IntersectionObserverCallback<HTMLElement> = useVisibilityObserver({onVisible, onHidden});
    return <><animated.div ref={visibilityRef} style={{overflowX: "hidden", overflowY: "hidden", ... style}} {... more}/></>
}