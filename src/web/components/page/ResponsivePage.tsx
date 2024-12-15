import type { Device } from "@web/hook";
import type { ComponentPropsWithRef } from "react";
import type { ReactNode } from "react";
import { useDevice } from "@web/hook";

export type ResponsivePageProps =
    & ComponentPropsWithRef<"div">
    & {};
export function ResponsivePage(props: ResponsivePageProps): ReactNode {
    let { style, children, ... more } = props;
    let device: Device = useDevice();
    let wrapper$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100vw",
            minHeight: "100vh",
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
            width: size()
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
                { children }
            </div>
        </div>
    </>;
}