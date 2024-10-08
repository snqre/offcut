import * as Client from "@client";

function Home(): Client.React.ReactNode {

    return <>
        <Client.Component.Layout.Page>
            <Client.Component.Ui.Navbar/>
        </Client.Component.Layout.Page>
    </>;
}

export {Home};