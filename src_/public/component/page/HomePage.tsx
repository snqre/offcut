import type {ReactNode} from "react";
import type {Dispatch} from "react";
import type {SetStateAction} from "react";
import {Page} from "./Page";
import {InfiniteScroll} from "../InfiniteScroll";
import {ImageCard} from "../ImageCard";
import {Stack} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@component/Button";
import { SineWaveHover } from "@component/layout/SineWaveHover";
import { DualTearDropShape } from "@component/layout/DualTearDropShape";

export type HomePageProps = {}

export function HomePage(props: HomePageProps): ReactNode {
    return <>
        <Page>
            <SineWaveHover duration={5000}>
                <DualTearDropShape style={{width: "100px", height: "100px", background: "#171717"}}/>
            </SineWaveHover>
        </Page>
    </>;
}