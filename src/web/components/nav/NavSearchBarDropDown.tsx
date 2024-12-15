import { default as React } from "react";


export function NavSearchBarDropDown({
    children }: {
        children: React.ReactNode;
    }): React.ReactNode {
    let containerProps: React.ComponentPropsWithRef<"div"> = {
        style: {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            top: "100%",
            width: "100%",
            padding: 10
        }
    };

    return <>
        <div { ... containerProps }>{ children }</div>
    </>;
}