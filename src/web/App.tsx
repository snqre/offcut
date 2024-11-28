import type {Maybe} from "@web/util/Maybe";
import type {State} from "./util/State";
import type {AppState} from "./state/State";
import {default as React} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {HomePage} from "./page/HomePage";
import {SignInPage} from "./page/SignInPage";
import {SignUpPage} from "./page/SignUpPage";
import {ProductsPage} from "./page/ProductsPage";
import {createRoot as Root} from "react-dom/client";
import * as Cart from "./page/Cart";
import * as Inspo from "./components/Inspo";
import * as Home from "./components/Home";

namespace App {

    export function App(): React.ReactNode {
        return (<>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home.Page/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/cart" element={<Cart.Page/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/inspo" element={<Inspo.Page/>}/>
                </Routes>
            </BrowserRouter>
        </>);
    }

    export function render(): null {
        let element: Maybe<HTMLElement> = document.getElementById("root");
        if (!element) throw "ERR_RENDER_TARGET_REQUIRED";
        Root(element).render(<App/>);
        return (null);
    }
}

App.render();