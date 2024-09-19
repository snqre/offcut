import {Page} from "../styled/page";
import * as Material from "@mui/material";
import * as ReactRouterDom from "react-router-dom";
import React from "react";

export function CreateAccountPage() {
    return <>
        <Page>
            <Material.Card elevation={1} sx={{width: "256px", padding: 1}}>
                <Material.FormGroup sx={{gap: 2}}>
                    <Material.Stack direction="column" gap={1}>
                        <Material.TextField placeholder="Email" size="small"/>
                        <Material.TextField placeholder="Password" size="small"/>
                        <Material.TextField placeholder="Confirm Password" size="small"/>
                    </Material.Stack>
                    <Material.Button variant="contained" sx={{bgcolor: "#171717"}}>Create Account</Material.Button>
                </Material.FormGroup>
            </Material.Card>
        </Page>
    </>;
}