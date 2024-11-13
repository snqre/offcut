import type {Maybe} from "@web/util/Maybe";
import {default as React} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {HomePage} from "./page/HomePage";
import {SignInPage} from "./page/SignInPage";
import {SignUpPage} from "./page/SignUpPage";
import {CartPage} from "./page/CartPage";
import {ProductsPage} from "./page/ProductsPage";
import {createRoot as Root} from "react-dom/client";

namespace App {
    export function App(): React.ReactNode {
        return (<>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage/>}/>
                    <Route
                        path="/sign-in"
                        element={<SignInPage/>}/>
                    <Route
                        path="/sign-up"
                        element={<SignUpPage/>}/>
                    <Route
                        path="/cart"
                        element={<CartPage/>}/>
                    <Route
                        path="/products"
                        element={<ProductsPage/>}/>
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