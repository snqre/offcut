import * as Client from "@client";

function Navbar(): Client.React.ReactNode {
    return <>
        <Client.Spring.animated.div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8
            }}>
            <Client.Spring.animated.div
                style={{
                    width: 150,
                    aspectRatio: "2/1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: "url(../../img/brand/Logo.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
                }}/>
            <Client.Spring.animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8
                }}>
                <Client.Component.Ui.NavbarOption
                    to="/"
                    alias="Home"/>
                <Client.Component.Ui.NavbarOption
                    to="/inspo"
                    alias="Inspo"/>
            </Client.Spring.animated.div>
            <Client.Component.Ui.NavbarAccount/>
        </Client.Spring.animated.div>
    </>;
}

export {Navbar};