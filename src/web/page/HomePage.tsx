import type {ReactNode} from "react";
import type {ComponentPropsWithRef as ReactComponentPropsWithRef} from "react";
import {ResponsiveAnchorPage} from "../components/ResponsiveAnchorPage";
import {Link} from "../components/Link";
import {easings as Easings} from "react-spring";
import {animated} from "react-spring";
import {useSpring} from "react-spring";
import * as BoxShadow from "../constant/BoxShadow";
import * as ColorPalette from "../constant/ColorPalette";
import * as Server from "../core/Server";

export function HomePage(): ReactNode {
    let duration: number = 5000;
    let durationOffset: number = 1000;

    return <>
        <ResponsiveAnchorPage>
            <HomePageSlice>
                <HomePageContentArea
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 40
                    }}>
                    <HomePageCallToActionButton
                        label={Server.loggedIn() ? "Explore" : "Pick Your Style"}
                        to="/inspo"/>
                    <HomePageCallToActionButton
                        label="Sign Up"
                        to="/sign-up"/>
                </HomePageContentArea>
                <HomePageContentArea
                    style={{
                        gap: 30,
                        justifyContent: "center"
                    }}>
                    <HomePageCounter
                        tag="Users"
                        count={2750000n}
                        duration={duration}/>
                    <HomePageCounter
                        tag="Rating"
                        suffix="★"
                        precision={2n}
                        count={4.25}
                        duration={duration + (durationOffset * 1)}/>
                </HomePageContentArea>
            </HomePageSlice>
            <HomePageSlice>
                <HomePageFocus/>
            </HomePageSlice>
            <HomePageSlice>
                <HomePageContentArea
                    style={{
                        gap: 30,
                        justifyContent: "center"
                    }}>
                    <HomePageCounter
                        tag="Saved"
                        suffix="tons"
                        count={75n}
                        duration={duration + (durationOffset * 2)}/>
                    <HomePageCounter
                        tag="Sold"
                        count={250000n}
                        duration={duration + (durationOffset * 3)}/>
                </HomePageContentArea>
                <HomePageContentArea
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "justify",
                        paddingLeft: 25,
                        paddingRight: 25,
                        fontSize: "0.75em",
                        fontWeight: "normal",
                        fontFamily: "suisse-intl-regular"
                    }}>
                    <p><strong>Offcut</strong> <em>transforms construction waste into opportunity</em> by purchasing <em>excess materials</em> and reselling them to <em>reduce waste and carbon emissions</em>. We help builders access <em>sustainable, cost-effective resources</em> while promoting a <em>circular economy</em> in construction.</p>
                </HomePageContentArea>
            </HomePageSlice>
        </ResponsiveAnchorPage>
    </>;
}


// #region ContentArea

export function HomePageContentArea({
    style, children, ... more}: ReactComponentPropsWithRef<"div">): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                padding: 20,
                ... style
            }}
            {... more}>
            {children}
        </div>
    </>;
}


// #region Slice

export function HomePageSlice({
    children}: {
        children?: ReactNode;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                flexGrow: 1
            }}>
            {children}
        </div>
    </>;
}


// #region Focus

export function HomePageFocus(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                gap: "20px"
            }}>
            <HomePageFocusHeading/>
            <HomePageFocusSubHeading/>
        </div>
    </>;
}

export function HomePageFocusHeading(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10
            }}>
            <div
                style={{
                    fontWeight: "bold",
                    fontFamily: "suisse-intl-regular",
                    fontSize: "10em",
                    background: ColorPalette.OBSIDIAN,
                    backgroundClip: "text",
                    backgroundSize: "cover",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    color: "transparent"
                }}>
                Eco Friendly
            </div>
        </div>
    </>;
}

export function HomePageFocusSubHeading(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                fontWeight: 500,
                fontFamily: "suisse-intl-regular",
                fontSize: "2.5em",
                width: "100%",
                color: ColorPalette.OBSIDIAN
            }}>
            Construction Materials.
        </div>
    </>;
}


// #region Counter

export function HomePageCounter({
    tag,
    count,
    precision = 0n,
    prefix,
    suffix,
    duration=2500}: {
        tag: string;
        count: bigint | number;
        precision?: bigint;
        prefix?: string;
        suffix?: string;
        duration?: number;
    }): ReactNode {
    let counter = useSpring({
        to: {
            number: Number(count)
        },
        from: {
            number: 0
        },
        reset: false,
        config: {
            duration: duration,
            easing: Easings.easeInOutExpo
        }
    });

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                width: "100%"
            }}>
            <animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    fontSize: "1.8em",
                    width: "100%"
                }}>
                {counter.number.to(count => `${prefix ?? ""} ${Number(count.toFixed(Number(precision))).toLocaleString()} ${suffix ?? ""}`)}
            </animated.div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    fontWeight: "normal",
                    fontSize: "0.65em",
                }}>
                {tag}
            </div>
        </div>
    </>;
}


// #region CallToActionButton

export function HomePageCallToActionButton({
    label,
    to}: {
        label: string;
        to: string;
    }): ReactNode {
    return <>
        <Link
            to={to}>
            <animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: BoxShadow.TAILWIND_0,
                    fontSize: "1.12em",
                    fontWeight: "normal",
                    fontFamily: "suisse-intl-regular",
                    borderRadius: 5,
                    padding: 10,
                    pointerEvents: "auto",
                    cursor: "pointer"
                }}>
                {label}
            </animated.div>
        </Link>
    </>;
}