import type {ReactNode} from "react";
import type {RootProps} from "@component/root/Root";
import {Root} from "@component/root/Root";
import {useSpring} from "react-spring";
import {useState} from "react";
import {useEffect} from "react";
import {easings} from "react-spring";

export type SineWaveHoverProps =
    & RootProps
    & {
        duration?: number;
    };

export function SineWaveHover(props: SineWaveHoverProps): ReactNode {
    let {duration = 1000, style, ... more} = props;
    let [phase, setPhase] = useState<boolean>(false);
    let [position, setPosition] = useSpring(() => ({transform: "translateY(0px)", config: ({duration: duration, easings: easings.easeInOutExpo})}));

    useEffect(() => {
        setTimeout(() => setPhase(last => !last), duration);
        if (phase) setPosition.start({transform: "translateY(0px)"});
        else setPosition.start({transform: "translateY(10px)"});
        return;
    }, [phase, duration, setPosition]);

    return <><Root style={{... position, ... style}} {... more}/></>;
}