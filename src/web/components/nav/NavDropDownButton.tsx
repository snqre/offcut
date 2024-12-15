import { NavDropDown } from "@web/components";
import { NavDropDownSubButton } from "@web/components";
import * as React from "react";

export type NavDropDownButtonProps = {
    children: [React.ReactNode, dropDown: React.ReactNode];
};
export function NavDropDownButton(props: NavDropDownButtonProps): React.ReactNode {
    let { children } = props;
    let [toggled, setToggled] = React.useState<boolean>(false);
    let wrapperProps: React.ComponentPropsWithRef<"div"> = {
        onMouseLeave: () => setToggled(false),
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        }
    };
    let buttonProps: React.ComponentPropsWithRef<"div"> = {
        onClick: () => setToggled(v => !v),
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            pointerEvents: "auto",
            cursor: "pointer"
        }
    };

    return <>
        <div { ... wrapperProps }>
            <div { ... buttonProps }>
                { children[0] }
                { toggled ? <NavDropDown>{ children[1] }</NavDropDown> : <NavDropDownSubButton>Categories</NavDropDownSubButton> }
            </div>
        </div>
    </>;
}