import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Result } from "ts-results";
import { Ok } from "ts-results";
import { Err } from "ts-results";
import { createRoot as Root} from "react-dom/client";
import { HomePage } from "@web/page";

function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
            </Routes>
        </BrowserRouter>
    </>;
}

function render(app: ReactNode):
    | Ok<void>
    | Err<"ERR_ROOT_REQUIRED">
    | Err<[unknown]> {
    _loadGoogleFont("Roboto", "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
    let element:
        | HTMLElement
        | null
        = document.getElementById("root");
    if (element) {
        let result: Result<void, unknown> = Result.wrap(() => Root(element).render(app));
        if (result.err) return Err<[unknown]>([result.val]);
        return Ok(undefined);
    }
    return Err("ERR_ROOT_REQUIRED" as const);
}

function _loadFont(key: string, format: string, url: string): void {
    let style: HTMLStyleElement = document.createElement("style");
    style.textContent = `
@font-face {
    font-family: ${ key };
    src: url(${ url }) format(${ format });
}
    `;
    document.head.appendChild(style);
    return;
}

function _loadGoogleFont(key: string, url: string): void {
    let link: HTMLLinkElement = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
    return;
}

render(<App/>).unwrap();