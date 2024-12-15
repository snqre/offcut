// @ts-ignore
import Logo from "../../public/img/Logo.png";
import { NavCallToActionButton } from "@web/components";
import { NavButton } from "@web/components";
import { NavDropDownButton } from "@web/components";
import { NavDropDownItem } from "@web/components";
import * as React from "react";

export type NavProps = {
    categories: Array<React.ReactNode>;
};
export function Nav(props: NavProps): React.ReactNode {
    let { categories } = props;
    let containerProps: React.ComponentPropsWithoutRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: 30,
            paddingBottom: 30,
            gap: 40
        }
    };
    let logoProps: React.ComponentPropsWithoutRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${ Logo })`,
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
            width: 150,
            aspectRatio: 2 / 1
        }
    };

    return <>
        <div { ... containerProps }>
            <div { ... logoProps }/>
            <NavCallToActionButton>For You</NavCallToActionButton>
            <NavDropDownButton>
                <>Materials</>
                { categories.map(category => <NavDropDownItem>{ category }</NavDropDownItem>)}
            </NavDropDownButton>


            <NavButton>Basket</NavButton>

        </div>
    </>;
}