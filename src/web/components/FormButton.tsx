import type {ReactNode} from "react";
import type {MouseEventHandler} from "react";
import * as BoxShadow from "../constant/BoxShadow";
import * as ColorPalette from "../constant/ColorPalette";

export function FormButton({
    label,
    onClick}: {
        label: string;
        onClick?: MouseEventHandler<HTMLButtonElement>;
    }): ReactNode {
    return <>
        <button
            onClick={onClick}
            style={{
                all: "unset",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: BoxShadow.TAILWIND_0,
                color: ColorPalette.SNOW,
                background: ColorPalette.OBSIDIAN,
                borderRadius: 5,
                padding: 5,
                fontSize: "0.75em",
                fontWeight: "normal",
                fontFamily: "suisse-intl-regular",
                width: "100%",
                flexGrow: 1,
                pointerEvents: "auto",
                cursor: "pointer"
            }}>
            {label}
        </button>
    </>;
}