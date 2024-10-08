import * as Client from "@client";

function render(app: Client.React.ReactNode): void {
    let e: HTMLElement | null = document.getElementById("root");
    if (e) {
        let root: Client.ReactDomClient.Root;
        root = Client.ReactDomClient.createRoot(e);
        root.render(app);
        return;
    }
    return;
}

export {render};