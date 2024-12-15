import type { Device } from "@web/hook";
import type { ComponentPropsWithRef } from "react";
import type { ReactNode } from "react";
import { Nav } from "@web/components";
import { useDevice } from "@web/hook";

export type ResponsiveAnchorPageProps =
    & ComponentPropsWithRef<"div">
    & {};
export function ResponsiveAnchorPage(props: ResponsiveAnchorPageProps): ReactNode {
    let { style, children, ... more } = props;
    let device: Device = useDevice();
    let wrapper$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            background: "white",
            ... style
        },
        ... more
    };
    let innerWrapper$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: size(),
            height: "100%"
        }
    };
    let contentWrapper$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            height: "100%"
        }
    };

    function size(): number {
        if (device === "LAPTOP") return 1024;
        if (device === "TABLET") return 768;
        if (device === "MOBILE") return 320;
        return 0;
    }

    return <>
        <div { ... wrapper$ }>
            <div { ... innerWrapper$ }>
                <Nav categories={[<>Paint</>, <>Wood</>, <>Steel</>]}/>
                <div { ... contentWrapper$ }>
                    { children }
                </div>
            </div>
        </div>
    </>;
}