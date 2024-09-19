import {ReactNode} from "react";
import {Card} from "@mui/material";
import {Stack} from "@mui/material";
import {Button} from "@mui/material";

export function ImageCard(): ReactNode {
    return <>
        <Card elevation={1}>
            <Stack width="250px" height="200px" bgcolor="whitesmoke"></Stack>
            <Stack width="250px" height="50px" justifyContent="center" alignItems="center">
                <Button variant="contained" sx={{width: "90%", bgcolor: "black"}}>Find Out</Button>
            </Stack>
        </Card>
    </>;
}