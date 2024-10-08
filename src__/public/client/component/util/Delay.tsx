import type {ReactNode} from "src__/public/Bundle";
import type {ComponentPropsWithRef} from "src__/public/Bundle";
import {animated} from "src__/public/Bundle";
import {useState} from "src__/public/Bundle";
import {useEffect} from "src__/public/Bundle";

export interface DelayProps extends ComponentPropsWithRef<typeof animated.div> {
    ms: number;
}

export function Delay({ms, children, ... more}: DelayProps): ReactNode {
    let [mounted, setMounted] = useState<ReactNode>(<></>);

    useEffect(() => {
        setTimeout(() => setMounted((children as any)), ms);
        return;
    }, []);

    return <>
        <animated.div
            {... more}>
            {mounted}
        </animated.div>
    </>;
}