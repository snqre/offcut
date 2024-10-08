import type {ReactNode} from "react";
import type {RootProps} from "./Root";
import {Root} from "./Root";
import {useState} from "react";
import {useEffect} from "react";

export type StaggeredProps = RootProps & {
    mountDelay: bigint;
    mountCooldown: bigint;
};

export function Staggered(props: StaggeredProps): ReactNode {
    let {mountDelay, mountCooldown, children, ... more} = props;
    let [mounted, setMounted] = useState<ReactNode[]>([]);

    useEffect((): void => {
        if (!Array.isArray(children)) return;
        setMounted([]);
        setTimeout((): void => {
            let cooldown: bigint = 0n;
            let i: bigint = 0n;
            while (i < children.length) {
                setTimeout((): void => setMounted(mounted => [... mounted, children[Number(i)]]), Number(cooldown));
                cooldown += mountCooldown;
                i += 1n;
            }
            return;
        }, Number(mountDelay));
        return;
    }, [children, mountDelay, mountCooldown]);

    return <>
        <Root {... more}>
            {mounted}
        </Root>
    </>;
}