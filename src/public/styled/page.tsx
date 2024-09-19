import {Navbar} from "./navbar";
import {Footer} from "./footer";
import * as Material from "@mui/material";
import React from "react";

export function Page({children}: {children?: React.ReactNode;}): React.ReactNode {
    return <>
        <Material.Container>
            <Navbar/>
            {children}
            <Footer/>
        </Material.Container>
    </>;
}