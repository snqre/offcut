import type {ReactNode} from "./Bundle.tsx";
import type {Root} from "./Bundle.tsx";
import {App} from "./Bundle.tsx";
import {createRoot} from "./Bundle.tsx";
import React from "react";

interface WebApp {
    render(app: ReactNode): void;
}

function WebApp(): WebApp {
    /***/ return {render};

    function render(app: ReactNode): void {
        let e: HTMLElement | null = document.getElementById("root");
        if (e) {
            let root: Root;
            root = createRoot(e);
            root.render(app);
            return;
        }
        return;
    }
}

(() => {
    let app: WebApp = WebApp();
    app.run(<App/>);
    return;
})();