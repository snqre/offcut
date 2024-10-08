import * as Client from "./Client";
import React from "react";

Client.Render.render(<>
    <Client.ReactRouterDom.BrowserRouter>
        <Client.ReactRouterDom.Routes>
            <Client.ReactRouterDom.Route path="/" element={<Client.Component.Page.Home/>}/>
            <Client.ReactRouterDom.Route path="/sign-in"/>
            <Client.ReactRouterDom.Route path="/sign-up"/>
        </Client.ReactRouterDom.Routes>
    </Client.ReactRouterDom.BrowserRouter>
</>);