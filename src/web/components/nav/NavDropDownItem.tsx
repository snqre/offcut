import * as React from "react";

export type NavDropDownItemProps = {
    children: React.ReactNode;
};
export function NavDropDownItem(props: NavDropDownItemProps): React.ReactNode {
    let { children } = props;
    let wrapperProps: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            pointerEvents: "auto",
            cursor: "pointer",
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular"
        }
    };
    let innerWrapperProps: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%"
        }
    };

    return <>
        <div { ... wrapperProps }>
            <div { ... innerWrapperProps }>
                { children }
            </div>
        </div>
    </>;
}