import * as Client from "@client";

export interface NavbarOptionProps {
    alias: string;
    to: string;
}

export function NavbarOption({alias, to}: NavbarOptionProps): Client.React.ReactNode {

    return <>
        <Client.ReactRouterDom.Link
            to={to}
            style={{
                all: "unset"
            }}>
            <Client.Spring.animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1em",
                    fontWeight: "bold",
                    fontFamily: "sans-serif"
                }}>
                {alias}
            </Client.Spring.animated.div>
        </Client.ReactRouterDom.Link>
    </>;
}