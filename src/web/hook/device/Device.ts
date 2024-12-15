import { useState } from "react";
import { useEffect } from "react";

export type Device = 
    | "LAPTOP"
    | "TABLET"
    | "MOBILE";

export function useDevice(): Device {
    let [device, setDevice] = useState<Device>("LAPTOP");

    useEffect(() => {
        function resize(): void {
            if (window.innerWidth >= 1024) setDevice("LAPTOP");
            else if (window.innerWidth >= 768) setDevice("TABLET");
            else if (window.innerWidth >= 320) setDevice("MOBILE");
            else return;
        }

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return device;
}