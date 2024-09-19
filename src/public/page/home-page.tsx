import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import {Page} from "../styled/page";
import {Button, Card, Stack} from "@mui/material";
import {Typography} from "@mui/material";
import {InfiniteScroll} from "../component/InfiniteScrollGallery";
import {ProductCard} from "../component/card/ProductCard";
import {useState} from "react";
import {useEffect} from "react";
import {RandomOutcomeUnit} from "../lib/util/random/RandomOutcomeUnit";
import React from "react";

export function HomePage(): React.ReactNode {
    let [scrollRound, setScrollRound] = useState<bigint>(0n);

    async function next(): Promise<ReactNode[]> {
        return new Promise(resolve => {
            return setTimeout((): void => {
                if (scrollRound === 0n) resolve([<HomePageInfiniteScrollItem><Typography>You can pick your styles</Typography></HomePageInfiniteScrollItem>]);
                scrollRound++;
                let randomOutcomeUnit: RandomOutcomeUnit = RandomOutcomeUnit();
                if (randomOutcomeUnit.success(5)) resolve([
                    <HomePageInfiniteScrollItem><Typography>You can pick your styles</Typography></HomePageInfiniteScrollItem>
                ]);
                resolve([
                    <HomePageInfiniteScrollItem>
                        <HomePageImageCard/>
                        <HomePageImageCard/>
                        <HomePageImageCard/>
                        <HomePageImageCard/>
                    </HomePageInfiniteScrollItem>
                ])
            }, 200);
        });
    }

    return <>
        <Page>
            <InfiniteScroll 
                direction="column" 
                justifyContent="center" 
                alignItems="center" 
                gap={2} 
                next={next}
                loader={<HomePageInfiniteScrollLoader/>}/>
        </Page>
    </>;
}


export function HomePageInfiniteScrollLoader(): ReactNode {
    return <>
        <div style={{width: "25px", aspectRatio: "1/1", backgroundImage: "url(../img/gear.svg)"}}/>
    </>;
}


export interface HomePageInfiniteScrollItemProps extends ComponentPropsWithRef<typeof Stack> {}

export function HomePageInfiniteScrollItem({children, ... more}: HomePageInfiniteScrollItemProps): ReactNode {
    return <><Stack width="100%" height="250px" direction="row" justifyContent="center" alignItems="center" gap={1} {... more}>{children}</Stack></>;
}




export function HomePageImageCard(): ReactNode {
    return <>
        <Card elevation={1}>
            <Stack width="250px" height="200px" bgcolor="whitesmoke"></Stack>
            <Stack width="250px" height="50px" justifyContent="center" alignItems="center">
                <Button variant="contained" sx={{width: "90%", bgcolor: "black"}}>Find Out</Button>
            </Stack>
        </Card>
    </>;
}

export function HomePageImageCardStack({children}: {children: ReactNode}): ReactNode {
    return <>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
            width="100%"
            height="auto">
            {children}
        </Stack>
    </>;
}