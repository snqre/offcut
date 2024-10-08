import * as Client from "@client";

interface PageProps extends Client.Spring.ComponentPropsWithRef<typeof Client.Spring.animated.div> {}

function Page({style, children, ... more}: PageProps): Client.React.ReactNode {
    let device: Client.Component.Hook.Device = Client.Component.Hook.useDevice();

    return <>
        <Client.Spring.animated.div
            style={{
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                ... style
            }}
            {... more}>
            <Client.Spring.animated.div
                style={{
                    width:
                        device === "laptop" ? "1024px" :
                        device === "tablet" ? "768px" :
                        device === "mobile" ? "320px" :
                        device,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center"  
                }}>
                {children}
            </Client.Spring.animated.div>
        </Client.Spring.animated.div>
    </>;
}

export type {PageProps};
export {Page};