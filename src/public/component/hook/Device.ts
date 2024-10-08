import * as Client from "@client";

export type Device = "laptop" | "tablet" | "mobile";

export function useDevice(): Device {
    let [device, setDevice] = Client.React.useState<Device>("laptop");

    Client.React.useEffect(() => {
        function resize(): void {
            let w: number = window.innerWidth;
            if (w >= 1024) setDevice("laptop");
            else if (w >= 768) setDevice("tablet");
            else setDevice("mobile");
            return;
        }

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return device;
}