import {ReactNode} from "react";
import {Stack} from "@mui/material";
import {Button} from "@mui/material";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {SearchBar} from "./SearchBar";

export function Navbar(): ReactNode {
    return <>
        <Stack width="100%" gap={1}>
            <NavbarTop/>
            <NavbarDivider/>
            <NavbarBottom/>
        </Stack>
    </>;
}

export function NavbarTop(): ReactNode {
    return <>
        <Stack direction="row" justifyContent="start" alignItems="start">
            <Link to="/sign-in"><Button size="small" variant="text" sx={{color: "black"}}>Sign In</Button></Link>
            <Link to="/sign-up"><Button size="small" variant="text" sx={{color: "black"}}>Sign Up</Button></Link>
        </Stack>
    </>;
}

export function NavbarDivider(): ReactNode {
    return <><Box sx={{width: "100%", height: "1px", bgcolor: "darkgrey"}}/></>;
}

export function NavbarBottom(): ReactNode {
    return <>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
            <Box sx={{width: "200px", aspectRatio: "4/1", margin: 1, backgroundImage: "url(../img/brand/Logo.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}/>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Link to="/"><Button size="small" variant="text" sx={{color: "black"}}>Home</Button></Link>
                <Link to="/inspiration"><Button size="small" variant="text" sx={{color: "black"}}>Inspo</Button></Link>
                <Link to="/products"><Button size="small" variant="text" sx={{color: "black"}}>Products</Button></Link>
            </Stack>
            <SearchBar suggestions={["Cheese", "Water"]} style={{width: "500px", height: "25px"}}/>
        </Stack>
    </>;
}