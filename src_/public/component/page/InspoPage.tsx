import type {ReactNode} from "react";
import type {Dispatch} from "react";
import type {SetStateAction} from "react";
import {Stack} from "@mui/material";
import {ImageCard} from "../ImageCard";
import {Page} from "./Page";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {InfiniteScroll} from "../InfiniteScroll";

export type InspoPageProps = {
    setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

export function InspoPage(props: InspoPageProps): ReactNode {
    let {setSelectedImage} = props;

    async function load(): Promise<ReactNode[]> {
        return [<>
            <Stack width="100%" height="512px" direction="row" justifyContent="center" alignItems="center" gap={1}>
                <ImageCard/>
                <ImageCard/>
            </Stack>
        </>];
    }

    return <>
        <Page>
            <Stack width="100%" height="250px" p={1} m={2} justifyContent="center" alignItems="center">
                <Typography variant="h1">Choose a Style</Typography>
                <Button variant="contained">Pick Your Style</Button>
            </Stack>
            <InfiniteScroll load={load} gap={2}/>
        </Page>
    </>;
}