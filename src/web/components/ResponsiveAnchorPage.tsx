import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react-spring";
import type {Maybe} from "@web/util/Maybe";
import type {Device} from "@web/hook/Device";
import {useDevice} from "@web/hook/Device";
import {animated} from "react-spring";
import * as Nav from "./Nav";
import * as ColorPalette from "@web/constant/ColorPalette";

export type ResponsiveAnchorPageProps =
    & ComponentPropsWithRef<"div">
    & {};
export function ResponsiveAnchorPage({style, children, ... more}: ResponsiveAnchorPageProps): ReactNode {
    const device: Device = useDevice();

    function size(): Maybe<string> {
        return (
            device === "laptop" ? "1024px" :
            device === "tablet" ? "768px" :
            device === "mobile" ? "320px" :
            null
        );
    }
    
    return (<>
        <animated.div
            style={({
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                background: ColorPalette.SNOW,
                ... style
            })}
            {... more}>
            <animated.div
                style={({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width: size() ?? undefined,
                    height: "100%"
                })}>
                <Nav.Root/>
                <animated.div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        flexGrow: 1,
                        width: "100%",
                        height: "100%"
                    }}>
                    {children}
                </animated.div>
            </animated.div>
        </animated.div>
    </>);
}