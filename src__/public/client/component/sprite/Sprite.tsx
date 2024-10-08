import type {ReactNode} from "src__/public/Bundle";
import type {Css} from "src__/public/Bundle";
import type {CssValue} from "src__/public/Bundle";
import type {SizeProps} from "src__/public/Bundle";
import {Base} from "src__/public/Bundle";

export interface SpriteProps extends SizeProps {
    path: string;
}

export function Sprite({w, h, aspectRatio, path}: SpriteProps): ReactNode {
    let css: Css = {
        width: w?.cur(),
        minWidth: w?.min(),
        maxWidth: w?.max(),
        height: h?.cur(),
        minHeight: h?.min(),
        maxHeight: h?.max(),
        aspectRatio: aspectRatio?.get(),
        backgroundImage: `url(${path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center"
    };
    
    return <>
        <Base style={css}/>
    </>;
}