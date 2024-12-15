import * as React from "react";

export type NavDropDownProps = {
    children: React.ReactNode;
};
export function NavDropDown(props: NavDropDownProps): React.ReactNode {
    let { children } = props;
    let wrapperProps: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            position: "absolute",
            top: "100%",
            left: 0
        }
    };

    return <>
        <div { ... wrapperProps }>{ children }</div>
    </>;
}