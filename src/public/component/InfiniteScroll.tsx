import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import {Stack} from "@mui/material";
import {Box} from "@mui/material";
import {useState} from "react";
import {useIntersectionObserver} from "./hook/UseIntersectionObserverHook";

export type InfiniteScrollListenerAsync = () => Promise<ReactNode[]>;
export type InfiniteScrollListener = () => ReactNode[];
export type InfiniteScrollProps = ComponentPropsWithRef<typeof Stack> & {
    load: InfiniteScrollListener | InfiniteScrollListenerAsync;
    loader?: ReactNode;
    footer?: ReactNode;
}

export function InfiniteScroll(props: InfiniteScrollProps): ReactNode {
    let {load, loader, footer, ... more} = props;
    let [mounted, setMounted] = useState<ReactNode[]>([]);
    let [loading, setLoading] = useState<boolean>(true);
    let [hasMore, setHasMore] = useState<boolean>(true);

    let ref: (element: HTMLElement | null) => void = useIntersectionObserver({
        onVisible: async (): Promise<void> => {
            if (!hasMore) return;
            setLoading(true);
            let loadedComponents: ReactNode[] = await load();
            if (loadedComponents.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }
            setMounted(mounted => [... mounted, ... loadedComponents]);
            setLoading(false);
            return;
        },
        onHidden: async (): Promise<void> => setLoading(false),
        dependencies: [setMounted, setLoading, setHasMore]
    });

    return <>
        <Stack width="100%" height="100%" {... more}>
            {mounted.map((component, key) => <Stack key={key} width="100%" direction="row" justifyContent="center" alignItems="center">{component}</Stack>)}
            <Stack width="100%" direction="row" justifyContent="center" alignItems="center">{loading ? loader : footer}</Stack>
            <Box ref={ref} width="100%"/>
        </Stack>
    </>;
}