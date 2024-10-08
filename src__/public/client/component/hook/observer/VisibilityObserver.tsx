import type {MutableRefObject} from "src__/public/Bundle";
import {useRef} from "src__/public/Bundle";
import {useCallback} from "src__/public/Bundle";

export type VisibilityObserverListener = () => void;
export type VisibilityObserverRef = IntersectionObserver | null;
export type VisibilityObserverCallback<T> = (element: T | null) => void;

export interface VisibilityObserverConfig {
    onVisible?: VisibilityObserverListener;
    onHidden?: VisibilityObserverListener;
}

export function useVisibilityObserver<T extends HTMLElement>({onVisible, onHidden}: VisibilityObserverConfig): VisibilityObserverCallback<T> {
    let obs: MutableRefObject<VisibilityObserverRef> = useRef<IntersectionObserver | null>(null);
    return useCallback<VisibilityObserverCallback<T>>(element => {
        obs.current?.disconnect();
        obs.current = new IntersectionObserver(entries => entries[0]?.isIntersecting ? onVisible && onVisible() : onHidden && onHidden());
        element && obs.current.observe(element);
        return;
    }, [onVisible, onHidden]);
}