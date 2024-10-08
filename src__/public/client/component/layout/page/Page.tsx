import type {ReactNode} from "src__/public/Bundle";
import {PageX1024} from "src__/public/Bundle";
import {PageX768} from "src__/public/Bundle";
import {PageX320} from "src__/public/Bundle";

export interface PageProps {
    type: "laptop" | "tablet" | "mobile";
    children?: ReactNode;
}

export function Page({type, children}: PageProps) {
    return <>
        {
            type === "laptop" ? <PageX1024>{children}</PageX1024> :
            type === "tablet" ? <PageX768>{children}</PageX768> :
            type === "mobile" ? <PageX320>{children}</PageX320> :
            undefined
        }
    </>;
}

<Page type="laptop">

</Page>