import type {ReactNode} from "react";
import {Link as ReactRouterDomLink} from "react-router-dom";

export function Link({
    to, 
    children}: {
        to: string;
        children: ReactNode;}): ReactNode {
    return (<>
        <ReactRouterDomLink
            to={to ?? "/"}
            style={{
                all: "unset"
            }}>
            {children}
        </ReactRouterDomLink>
    </>);
}