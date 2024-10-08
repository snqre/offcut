import {ReactNode} from "react";
import {Stack} from "@mui/material";
import {Typography} from "@mui/material";

export function Footer(): ReactNode {
    return <><Stack width="100%" direction="row" justifyContent="center"><Typography variant="subtitle2">Copyright © 2024 Offcut</Typography></Stack></>;
}