import type {ReactNode} from "react";
import type {Dispatch} from "react";
import type {SetStateAction} from "react";
import {useState} from "react";
import * as ColorPalette from "../constant/ColorPalette";

export type TextInputFieldValidateAction = (input: string) => [success: boolean, errmsg: string];

export function TextInputField({
    label,
    setInput,
    placeholder,
    validate}: {
        label: string;
        setInput: Dispatch<SetStateAction<string>>;
        placeholder?: string;
        validate?: TextInputFieldValidateAction;
    }): ReactNode {
    let [errmsg, setErrMsg] = useState<string>("");

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "100%",
                flexGrow: 1,
                gap: 10
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    fontWeight: "normal",
                    fontFamily: "suisse-intl-regular",
                    fontSize: "0.75em",
                    color: ColorPalette.OBSIDIAN,
                    flexGrow: 1
                }}>
                {label}
            </div>
            <input
                onChange={e => {
                    let input: string = e.target.value;
                    if (!validate) {
                        setErrMsg("");
                        setInput(input);
                        return;
                    }
                    let [success, errmsg] = validate(input);
                    if (!success) {
                        setErrMsg(errmsg);
                        setInput("");
                        return;
                    }
                    setErrMsg("");
                    setInput(input);
                    return;
                }}
                type="text"
                placeholder={placeholder}
                style={{
                    all: "unset",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1,
                    fontSize: "1em",
                    fontWeight: "normal",
                    fontFamily: "suisse-intl-regular",
                    color: ColorPalette.OBSIDIAN
                }}/>
            {errmsg.length > 0 && 
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    fontWeight: "normal",
                    fontFamily: "suisse-intl-regular",
                    fontSize: "0.50em",
                    color: ColorPalette.JASPER,
                    flexGrow: 1
                }}>
                {errmsg}
            </div>}
        </div>
    </>;
}