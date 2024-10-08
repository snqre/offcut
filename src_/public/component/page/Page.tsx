import {ReactNode} from "react";
import {Navbar} from "../Navbar";
import {Footer} from "../Footer";
import {Container} from "@mui/material";

export function Page({children}: {children?: ReactNode}): ReactNode {
    return <>
        <Container>
            <Navbar/>
            {children}
            <Footer/>
        </Container>
    </>;
}