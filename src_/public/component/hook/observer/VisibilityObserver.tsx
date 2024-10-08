import type {MutableRefObject} from "react";
import {useRef} from "react";
import {useCallback} from "react";

export type IntersectionObserverListener = () => void;
export type IntersectionObserverRef = IntersectionObserver | null;
export type IntersectionObserverCallback<T> = (element: T | null) => void;
export type IntersectionObserverOption = {
    onVisible?: IntersectionObserverListener;
    onHidden?: IntersectionObserverListener;
}

export function useVisibilityObserver<T extends HTMLElement>(option: IntersectionObserverOption) {
    let {onVisible, onHidden} = option;
    let observer: MutableRefObject<IntersectionObserverRef> = useRef<IntersectionObserver | null>(null);
    return useCallback<IntersectionObserverCallback<T>>(element => {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => entries[0]?.isIntersecting ? onVisible && onVisible() : onHidden && onHidden());
        element && observer.current.observe(element);
        return;
    }, [onVisible, onHidden]);
}