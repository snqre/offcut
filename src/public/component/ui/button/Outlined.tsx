import * as Client from "@client";

export interface OutlinedProps {
    alias: string;
    to: string;
}

export function Outlined({alias, to}: OutlinedProps): Client.React.ReactNode {
    let [spring, animate] = Client.Spring.useSpring(() => ({
        borderColor: "#171717",
        config: {
            duration: 250,
            easing: Client.Spring.easings.easeOutCubic
        }
    }));

    return <>
        <Client.ReactRouterDom.Link
            to={to}
            style={{
                all: "unset"
            }}>
            <Client.Spring.animated.div
                onMouseEnter={() => animate.start({
                    borderColor: "whitesmoke"
                })}
                onMouseLeave={() => animate.start({
                    borderColor: "#171717"
                })}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "5px",
                    fontSize: "1em",
                    fontWeight: "normal",
                    fontFamily: "sans-serif",
                    padding: 8,
                    pointerEvents: "auto",
                    cursor: "pointer",
                    ... spring
                }}>
                {alias}
            </Client.Spring.animated.div>
        </Client.ReactRouterDom.Link>
    </>;
}