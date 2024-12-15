import { default as React } from "react";

export type NavDropDownSubButtonProps = {
    children: React.ReactNode;
};
export function NavDropDownSubButton(props: NavDropDownSubButtonProps): React.ReactNode {
    let { children } = props;
    let wrapperProps: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "100%",
            color: "darkgrey",
            gap: 5,
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular"
        }
    };

    return <>
        <div { ... wrapperProps }>{ children }<>▼</></div>
    </>;
}