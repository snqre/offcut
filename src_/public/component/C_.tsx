import type {MutableRefObject} from "react";
import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react-spring";
import {Link} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {useRef} from "react";
import {useCallback} from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useSpring} from "react-spring";
import {animated} from "react-spring";

namespace ColorPalette {

}


export type IntersectionObserverListener = () => void;
export type IntersectionObserverRef = IntersectionObserver | null;
export type IntersectionObserverCallback<T> = (element: T | null) => void;
export type IntersectionObserverOption = {
    onVisible?: IntersectionObserverListener;
    onHidden?: IntersectionObserverListener;
}

export function useVisibilityObserver<T extends HTMLElement>(option: IntersectionObserverOption) {
    let {onVisible, onHidden} = option;
    let observer: MutableRefObject<IntersectionObserverRef> = useRef<IntersectionObserver | null>(null);
    return useCallback<IntersectionObserverCallback<T>>(element => {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => entries[0]?.isIntersecting ? onVisible && onVisible() : onHidden && onHidden());
        element && observer.current.observe(element);
        return;
    }, [onVisible, onHidden]);
}

export type RootProps = 
    & ComponentPropsWithRef<typeof animated.div> 
    & {};

export function Root(props: RootProps): ReactNode {
    return <><animated.div {... props}/></>
}

export type CProps =
    & RootProps
    & {};

export function C(props: CProps): ReactNode {
    let {style, ... more} = props;
    return <><Root style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} {... more}/></>;
}

export type RProps =
    & RootProps
    & {};

export function R(props: RProps): ReactNode {
    let {style, ... more} = props;
    return <><Root style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} {... more}/></>;
}


type FillProps =
    & RootProps
    & {};

function Fill(props: FillProps): ReactNode {
    return <><Root style={{width: "100%", height: "100%"}}/></>;
}

type CFillProps =
    & CProps
    & {}

function CFill(props: CFillProps) {

}

function RFill() {}

function Sprite() {}

export type TypographyProps =
    & RootProps
    & {
        type:
            | "h6"
            | "h5"
            | "h4"
            | "h3"
            | "h2"
            | "h1"
            | "body1"
            | "body2"
            | "button";
    };

export function Typography(props: TypographyProps): ReactNode {
    let {type, children, ... more} = props;
    return <>
        <Root
            style={{
                fontSize:
                    type === "h6" ? "16px" :
                    type === "h5" ? "18px" :
                    type === "h4" ? "20px" :
                    type === "h3" ? "24px" :
                    type === "h2" ? "32px" :
                    type === "h1" ? "40px" :
                    type === "body1" ? "16px" :
                    type === "body2" ? "14px" :
                    type === "button" ? "14px" :
                    undefined
            }}
            {... more}>
            {children}
        </Root>
    </>;
}

function Button(): ReactNode {
    let [hover, setHover] = useState<boolean>(false);
    let [style, setStyle] = useSpring(() => ({opacity: "0"}));

    useEffect(() => {
        if (hover) setStyle.start({opacity: "1"});
        else setStyle.start({opacity: "0"});
        return;
    }, [hover]);

    return <>
        <R style={{position: "relative"}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <R style={{width: "100%", height: "100%", position: "absolute", ... style}}/>
            <R style={{width: "100%", height: "100%", position: "absolute"}}></R>
        </R>
    </>;
}


type InfiniteScrollListenerAsync = () => Promise<ReactNode[]>;
type InfiniteScrollListener = () => ReactNode[];
type InfiniteScrollProps = 
    & RootProps 
    & {
        load: InfiniteScrollListener | InfiniteScrollListenerAsync;
        loader?: ReactNode;
        footer?: ReactNode;
    };

function InfiniteScroll(props: InfiniteScrollProps): ReactNode {
    let {load, loader, footer, style, ... more} = props;
    let [mounted, setMounted] = useState<ReactNode[]>([]);
    let [loading, setLoading] = useState<boolean>(true);
    let [hasMore, setHasMore] = useState<boolean>(true);

    let ref: (element: HTMLElement | null) => void = useVisibilityObserver({
        onVisible: async (): Promise<void> => {
            if (!hasMore) return;
            setLoading(true);
            let loadedComponents: ReactNode[] = await load();
            if (loadedComponents.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }
            setMounted(mounted => [... mounted, ... loadedComponents]);
            setLoading(false);
            return;
        },
        onHidden: async (): Promise<void> => setLoading(false)
    });

    return <>
        <C style={{width: "100%", height: "100%", ... style}} {... more}>
            {mounted.map((component, key) => <R key={key} style={{width: "100%"}}>{component}</R>)}
            <R style={{width: "100%"}}>{loading ? loader : footer}</R>
            <R style={{width: "100%"}} ref={ref}/>
        </C>
    </>;
}


type ResponsiveWrapperProps =
    & RootProps
    & {};

function WX1024(props: ResponsiveWrapperProps): ReactNode {
    let {style, children, ... more} = props;
    return <><C style={{width: "1024px", ... style}} {... more}>{children}</C></>;
}


function Navbar(): ReactNode {
    return <>
        <C style={{width: "100%", gap: "8px"}}>
            <R style={{justifyContent: "start", alignItems: "start"}}>
                <Link to="/sign-in"></Link>
                <Link to="/sign-up"></Link>
            </R>
            <R style={{width: "100%", height: "1px", background: "darkgrey"}}/>
            <R>

            </R>
        </C>
    </>;
}

function AccountUiGroup(): ReactNode {
    return <>
        <R>
            <Typography type="h1">Account</Typography>
        </R>
    </>;
}



function HomePage(): ReactNode {
    return <>
        <WX1024>

        </WX1024>
    </>;
}


function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    </>;
}

((): void => {

})();