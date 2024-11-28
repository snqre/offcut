import {default as React} from "react";
import {ResponsivePage} from "./ResponsivePage";
import * as ColorPalette from "../constant/ColorPalette";
import * as Nav from "./Nav";

export type PageProps = {};
export function Page(props: PageProps): React.ReactNode {


    // #region Slide

    let slide0$: _SlideProps = {
        style: {
            justifyContent: "space-between"
        }
    };

    // #region Hero

    let hero$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }
    };
    let heroHeading$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontSize: "10em",
            fontWeight: "bold",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OBSIDIAN
        }
    };
    let heroSubHeading$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontSize: "3em",
            fontWeight: "bold",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OFFCUT_YELLOW,
            paddingBottom: 50
        }
    };
    

    // #region Sub Hero

    let subHero$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
            width: "100%",
            gap: 20
        }
    };
    let subHeroItem$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexGrow: 1
        }
    }
    let subHeroItemHeading$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            fontSize: "1.5em",
            fontWeight: "bold",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OFFCUT_YELLOW,
            paddingBottom: 20
        }
    };
    let subHeroItemBody$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            width: "100%",
            fontSize: "1em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OBSIDIAN,
            gap: 10,
            textAlign: "justify"
        }
    };
    let subHeroItemBodySegment$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%"
        }
    };


    // #region Down Arrow

    let downArrow$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontSize: "2em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular",
            color: ColorPalette.OBSIDIAN
        }
    };

    return <>
        <ResponsivePage>
            <_Slide {... slide0$}>
                <Nav.Root/>
                <div {... hero$}>
                    <div {... heroHeading$}>OFFCUTS</div>
                    <div {... heroSubHeading$}>Revive. Reuse. Rebuild.</div>
                </div>
                <div {... subHero$}>
                    <div {... subHeroItem$}>
                        <div {... subHeroItemHeading$}>Why Offcuts?</div>
                        <div {... subHeroItemBody$}>
                            <div {... subHeroItemBodySegment$}><strong style={{display: "contents"}}>Sustainable Solutions:</strong> Divert construction waste from landfills while supporting eco-friendly practices.</div>
                            <div {... subHeroItemBodySegment$}><strong style={{display: "contents"}}>Affordable Materials:</strong> Access high-quality reclaimed materials at a fraction of the cost.</div>
                            <div {... subHeroItemBodySegment$}><strong style={{display: "contents"}}>Fast & Easy:</strong> List, buy, or request leftover materials with ease.</div>
                        </div>
                    </div>
                    <div {... subHeroItem$}>
                        <div {... subHeroItemHeading$}>For Contractos</div>
                        <div {... subHeroItemBody$}>Turn your surplus into profit with quick pickups and a seamless listing process.</div>
                    </div>
                    <div {... subHeroItem$}>
                        <div {... subHeroItemHeading$}>For Buyers</div>
                        <div {... subHeroItemBody$}>Find unique, sustainable materials for your next project --big or small.</div>
                    </div>
                </div>
                <div {... downArrow$}>⏷</div>
            </_Slide>
            <_Slide>

            </_Slide>
        </ResponsivePage>
    </>;
}

type _SlideProps = 
    & React.ComponentPropsWithRef<"div">
    & {};
function _Slide(props: _SlideProps): React.ReactNode {
    let {style, children, ... more} = props;
    let container$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            ... style
        },
        ... more
    };
    
    return <>
        <div {... container$}>{children}</div>
    </>;
}