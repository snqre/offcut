import type {ReactNode} from "src__/public/Bundle";
import type {ComponentPropsWithRef} from "src__/public/Bundle";
import {R} from "src__/public/Bundle";
import {WX1024} from "src__/public/Bundle";
import {SizeAdaptor} from "src__/public/Bundle";
import {animated} from "src__/public/Bundle";

export interface PageProps extends ComponentPropsWithRef<typeof animated.div> {}

export function Page({children, style, ... more}: PageProps): ReactNode {
    return <>
        <R w={SizeAdaptor("100vw")}>

        </R>
    </>;
}