import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { ResponsiveAnchorPage } from "@web/components";
import { ColorPalette } from "@web/constant";

export function HomePage(): ReactNode {
    let container$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 80
        }
    };
    let hero$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            width: "100%"
        }
    };
    let heroHeading$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "8em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OBSIDIAN
        }
    };
    let heroSubHeading$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OFFCUT_YELLOW
        }
    };
    let about$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
            width: "100%",
            gap: 80
        }
    };
    let aboutCard$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start"
        }
    };
    let aboutCardCaption$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OFFCUT_YELLOW,
            paddingBottom: 10
        }
    };
    let aboutCardContent$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            fontSize: "1em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OBSIDIAN,
            gap: 10,
            textAlign: "justify"
        }
    };
    let aboutCartContentBoldBulletPoint$: ComponentPropsWithRef<"strong"> = {
        style: {
            display: "contents"
        }
    };
    let aboutCardContentBulletPoint$: ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            color: ColorPalette.OBSIDIAN,
            fontSize: "1em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular"
        }
    };

    return <>
        <ResponsiveAnchorPage>
            <div { ... container$ }>
                <div { ... hero$ }>
                    <div { ... heroHeading$ }>OFFCUTS</div>
                    <div { ... heroSubHeading$ }>Revive. Reuse. Rebuild.</div>
                </div>
                <div { ... about$ }>
                    <div { ... aboutCard$ }>
                        <div { ... aboutCardCaption$ }>Why Offcuts?</div>
                        <div { ... aboutCardContent$ }>
                            <div { ... aboutCardContentBulletPoint$ }><strong { ... aboutCartContentBoldBulletPoint$ }>Sustainable Solutions: </strong>Divert construction waste from landfills while supporting eco-friendly practices.</div>
                            <div { ... aboutCardContentBulletPoint$ }><strong { ... aboutCartContentBoldBulletPoint$ }>Affordable Materials: </strong>Access high-quality reclaimed materials at a fraction of the cost.</div>
                            <div { ... aboutCardContentBulletPoint$ }><strong { ... aboutCartContentBoldBulletPoint$ }>Fast & Easy: </strong>List, buy, or request leftover materials with ease.</div>
                        </div>
                    </div>
                    <div { ... aboutCard$ }>
                        <div { ... aboutCardCaption$ }>For Contractors</div>
                        <div { ... aboutCardContent$ }>Turn your surplus into profit with quick pickups and a seamless listing process.</div>
                    </div>
                    <div { ... aboutCard$ }>
                        <div { ... aboutCardCaption$ }>For Buyers</div>
                        <div { ... aboutCardContent$ }>Find unique, sustainable materials for your next project -- big or small.</div>
                    </div>
                </div>
            </div>
        </ResponsiveAnchorPage>
    </>;
}