import {ReactNode} from "react";
import {Page} from "./Page";
import {Card} from "@mui/material";
import {FormGroup} from "@mui/material";
import {Stack} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";

export function SignUpPage(): ReactNode {
    return <>
        <Page>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Card elevation={1} sx={{width: "256px", p: 1}}>
                    <FormGroup sx={{gap: 2}}>
                        <Stack gap={1}>
                            <TextField placeholder="email" size="small"/>
                            <TextField placeholder="password" size="small"/>
                            <TextField placeholder="confirm password" size="small"/>
                        </Stack>
                        <Button variant="contained" sx={{bgcolor: "#171717"}}>Sign Up</Button>
                    </FormGroup>
                </Card>
            </Stack>
        </Page>
    </>;
}