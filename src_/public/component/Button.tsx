import type {ReactNode} from "react";
import {C} from "@component/layout/C";
import {R} from "@component/layout/R";
import {useSpring} from "react-spring";
import {useState} from "react";
import {useEffect} from "react";
import {config} from "react-spring";

export type ButtonProps =
    & {
        text: string;
        size: 
            | "large"
            | "small"
            | "smallest";
    };

export function Button(props: ButtonProps): ReactNode {
    let {text, size} = props;
    let buttonSurfacePositionIdle: string = "translate(0px, -5px)";
    let buttonSurfacePositionHover: string = "translate(0px, -10px)";
    let buttonSurfacePositionClick: string = "translate(0px, -2px)";
    let [isHovered, setIsHovered] = useState<boolean>(false);
    let [isClicked, setIsClicked] = useState<boolean>(false);
    let [buttonSurfacePosition, setButtonSurfacePosition] = useSpring(() => ({transform: buttonSurfacePositionIdle, config: config.wobbly}))

    useEffect((): void => {
        if (isHovered) setButtonSurfacePosition.start({transform: buttonSurfacePositionHover});
        else setButtonSurfacePosition.start({transform: buttonSurfacePositionIdle});
        return;
    }, [isHovered]);

    useEffect(() => {
        if (!isClicked) return;
        setIsClicked(false);
        setButtonSurfacePosition.start({transform: buttonSurfacePositionClick});
        setTimeout(() => setButtonSurfacePosition.start({transform: buttonSurfacePositionIdle}), 250);
        return;
    }, [isClicked]);

    return <>


        <C 
            style={{
                width: "150px", 
                height: "50px",
                position: "relative", 
                background: "#171717",
                cursor: "pointer",
                pointerEvents: "auto",
                overflow: "visible"
            }} 
            onMouseEnter={(): void => setIsHovered(true)} 
            onMouseLeave={(): void => setIsHovered(false)}
            onClick={(): void => setIsClicked(true)}>
            <C 
                style={{
                    width: "100%", 
                    height: "100%", 
                    position: "absolute", 
                    background: "whitesmoke",
                    ... buttonSurfacePosition
                }}>
                <R
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "linear-gradient(to bottom, white, transparent)",
                        opacity: "0.5",
                        position: "absolute"
                    }}
                />
                <R
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "linear-gradient(to right, yellow, orange)",
                        position: "absolute"
                    }}
                />
                <R
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    Click Me
                </R>
            </C>
        </C>
    </>;
}