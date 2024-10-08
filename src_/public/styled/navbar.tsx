import {Box} from "@mui/material";
import {Stack} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import Lev from "fast-levenshtein";
import * as Material from "@mui/material";
import * as ReactRouterDom from "react-router-dom";
import React from "react";

export function Navbar(): React.ReactNode {
    return <>
        <Material.Stack position="static" direction="column" gap={1} width="100%">
            
            <Material.Stack direction="row" alignItems="start">
                <Material.Button size="small" sx={{color: "black"}}><Material.Typography variant="button">Sign In</Material.Typography></Material.Button>
                <Material.Button size="small" sx={{color: "black"}}><Material.Typography variant="button">Sign Up</Material.Typography></Material.Button>

                <Stack direction="column">
                    <SearchBar/>
                </Stack>

            </Material.Stack>



            <Material.Box sx={{width: "100%", height: "1px", bgcolor: "gray"}}/>
            

            

            <Material.Stack position="static" direction="row">
                <Material.Box sx={{width: "200px", height: "50px", backgroundImage: "url(../img/logo.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}/>
                    <Material.Stack direction="row" gap={1}>
                        <ReactRouterDom.Link to="/" style={{all: "unset"}}><Material.Button variant="outlined" color="inherit">Home</Material.Button></ReactRouterDom.Link>
                        <ReactRouterDom.Link to="/products" style={{all: "unset"}}><Material.Button variant="outlined" color="inherit">Products</Material.Button></ReactRouterDom.Link>
                    </Material.Stack>
                    


                    <Material.Stack direction="row" gap={1}>
                        <Material.Box sx={{width: "25px", aspectRatio: "1/1", backgroundImage: "url(../img/icon/notification.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}/>
                        <Material.Box sx={{width: "25px", aspectRatio: "1/1", backgroundImage: "url(../img/icon/cart.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}/>
                        <Material.Box sx={{width: "25px", aspectRatio: "1/1", backgroundImage: "url(../img/icon/account.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}/>
                    </Material.Stack>

            </Material.Stack>
        </Material.Stack>
    </>;
}




function SearchBar() {
    let products = React.useRef(["apple", "orange"]);
    let [input, setInput] = React.useState<string>("");
    let [suggestions, setSuggestions] = React.useState<React.ReactNode[]>([]);
    
    function onInputChange(e: unknown): void {
        let typed: string = (e as any).target.value;
        setInput(typed);
        if (typed) {
            let suggestions = products.current
                .map((word) => ({
                    word,
                    distance: Lev.get(typed, word)
                }))
                .sort((a,b) => a.distance - b.distance)
                .map(item => item.word);
            
            let su: React.ReactNode[] = [];
            for (let i = 0; i < 6; i++) su.push(<S>{suggestions[i]}</S>);
            setSuggestions(su);
        }
        else {
            setSuggestions([]);
        }
    }
    return <>
        <input
        type="text"
        placeholder="Products"
        value={input}
        onChange={onInputChange}/>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start"
        }}>
            {suggestions}
        </div>
    </>;
}

function S({children}: {children?: React.ReactNode;}): React.ReactNode {
    return <>
        <Stack>
            <Stack>
                <Button>
                    <Typography>
                        {children}
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    </>;
}