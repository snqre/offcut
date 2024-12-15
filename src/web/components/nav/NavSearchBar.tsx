import { default as React } from "react";
import { NavSearchBarDropDown } from "@web/components";

export function NavSearchBar(): React.ReactNode {
    let [toggled, setToggled] = React.useState<boolean>(false);
    let containerProps: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10
        }
    };
    
    return <>
        <div { ... containerProps }>
            { toggled ? <NavSearchBarDropDown></NavSearchBarDropDown> : undefined }
        </div>
    </>;
}



function _SearchBar(): ReactNode {
    let container$: ComponentPropsWithoutRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            boxShadow: BoxShadow.TAILWIND_0,
            borderRadius: 5,
            position: "relative"
        }
    };
    let icon$: ComponentPropsWithoutRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url(../../public/icon/Search.png)",
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
            width: 10,
            aspectRatio: 1 / 1
        }
    };
    let input$: ComponentPropsWithoutRef<"input"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 10,
            flexGrow: 1,
            color: ColorPalette.OBSIDIAN,
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: "suisse-intl-regular"
        }
    };

    return <>
        <div { ... container$ }>
            <div { ... icon$ }/>
            <input { ... input$ }/>
        </div>
    </>;
}