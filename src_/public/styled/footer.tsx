import type {ReactNode} from "react";
import {Box} from "@mui/material";
import {Stack} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import React from "react";

export function Footer(): ReactNode {
    return <>
        <Stack alignItems="center">
            <Typography variant="subtitle2">Copyright © 2024 Offcut</Typography>
        </Stack>
    </>;
}