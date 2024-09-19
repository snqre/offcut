import {DependencyList} from "react";
import {useRef} from "react";
import {useCallback} from "react";

export type IntersectionObserverListener = () => void;

export type UseIntersectionObserverOptions = {
    onVisible?: IntersectionObserverListener;
    onHidden?: IntersectionObserverListener;
    dependencies?: DependencyList;
}

export function useIntersectionObserver<T extends HTMLElement>({onVisible, onHidden, dependencies = []}: UseIntersectionObserverOptions) {
    let observer = useRef<IntersectionObserver | null>(null);

    return useCallback<(element: T | null) => void>(element => {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => entries[0].isIntersecting ? onVisible && onVisible() : onHidden && onHidden());
        element && observer.current.observe(element);
        return;
    }, [onVisible, onHidden, ... dependencies]);
}