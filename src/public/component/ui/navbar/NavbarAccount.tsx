import * as Client from "@client";

export interface NavbarAccountProps {
    
}

export function NavbarAccount(): Client.React.ReactNode {
    let [isSignedIn, setIsSignedIn] = Client.React.useState<boolean>(false);

    return <>
        <Client.Spring.animated.div
            style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}>
            {
                isSignedIn
                    ? <>
                        Username
                    </>
                    : <>
                        <Client.Spring.animated.div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 8
                            }}>
                            <Client.Component.Ui.Button.Outlined
                                to=""
                                alias="Sign In"/>
                            <Client.Component.Ui.Button.Outlined
                                to=""
                                alias="Sign Up"/>
                        </Client.Spring.animated.div>
                    </>
            }
        </Client.Spring.animated.div>
    </>;
}