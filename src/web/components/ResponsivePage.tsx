import type {Device} from "@web/hook/Device";
import type {ComponentPropsWithRef} from "react-spring";
import type {Maybe} from "@web/util/Maybe";
import type {ReactNode} from "react";
import {useDevice} from "@web/hook/Device";
import {animated} from "react-spring";
import * as Nav from "./Nav";
import * as ColorPalette from "@web/constant/ColorPalette";

export type ResponsivePageProps =
    & ComponentPropsWithRef<"div">
    & {};
export function ResponsivePage({style, children, ... more}: ResponsivePageProps): ReactNode {
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
                minHeight: "100vh",
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
                    width: size() ?? undefined
                })}>
                {children}
            </animated.div>
        </animated.div>
    </>);
}