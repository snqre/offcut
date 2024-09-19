import {ReactNode} from "react";
import {Dispatch} from "react";
import {SetStateAction} from "react";
import {Page} from "./Page";
import {InfiniteScroll} from "../InfiniteScroll";
import {ImageCard} from "../ImageCard";
import {Stack} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";

export type HomePageProps = {
    setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

export function HomePage(props: HomePageProps): ReactNode {
    let {setSelectedImage} = props;

    async function load(): Promise<ReactNode[]> {
        return [<>
            <Stack width="100%" height="250px" direction="row" justifyContent="center" alignItems="center" gap={1}>
                <ImageCard/>
                <ImageCard/>
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