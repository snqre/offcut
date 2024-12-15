import { ColorPalette } from "@web/constant";
import { BoxShadow } from "@web/constant";
import * as React from "react";

export type NavButtonProps = {
    children: React.ReactNode;
};
export function NavButton(props: NavButtonProps): React.ReactNode {
    let { children } = props;
    let wrapperProps: React.ComponentPropsWithRef<"button"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            pointerEvents: "auto",
            cursor: "pointer",
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            boxShadow: BoxShadow.TAILWIND_0,
            color: ColorPalette.OBSIDIAN
        }
    };

    return <>
        <button { ... wrapperProps }>{ children }</button>
    </>;
}