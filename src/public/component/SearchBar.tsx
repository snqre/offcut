import {ReactNode} from "react";
import {ComponentPropsWithRef} from "react";
import {Sorter} from "../lib/util/sort/Sorter";
import {StringSorter} from "../lib/util/sort/StringSorter";
import {SortedItem} from "../lib/util/sort/SortedItem";
import {Box} from "@mui/material";
import {Stack} from "@mui/material";
import {Typography} from "@mui/material";
import {useState} from "react";

export type SearchBarProps = ComponentPropsWithRef<"input"> & {
    suggestions?: string[];
}

export function SearchBar(props: SearchBarProps): ReactNode {
    let {suggestions: suggestionsP, ... more} = props;
    let [input, setInput] = useState<string>("");
    let [suggestions, setSuggestions] = useState<ReactNode[]>([]);

    function onChange(e: unknown): void {
        let input_: string = (e as any).target.value;
        setInput(input_);
        if (!input_) return setSuggestions([]);
        let sorter: Sorter<string> = StringSorter();
        let sorted: SortedItem<string>[] = sorter.sort(input_, suggestionsP ?? []);
        let suggestions_: ReactNode[] =
            sorted
                .slice(0, 5)
                .map(item => item.item())
                .map(item => <Typography>{item}</Typography>);
        setSuggestions(suggestions_);
        return;
    }

    return <>
        <Box sx={{position: "relative"}}>
            <Stack>
                <input type="text" value={input} onChange={onChange} {... more}/>
                <Stack gap={1} direction="column" position="absolute" width="100%" top="100%" bgcolor="darkgrey">{suggestions}</Stack>
            </Stack>
        </Box>
    </>;
}