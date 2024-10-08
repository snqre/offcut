import type {ReactNode} from "react";
import type {Root} from "react-dom/client";
import {HomePage} from "./component/page/HomePage";
import {SignInPage} from "./component/page/SignInPage";
import {SignUpPage} from "./component/page/SignUpPage";
import {StyleFormPage} from "./component/page/StyleFormPage";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {useState} from "react";
import React from "react";

((node: ReactNode): void => {
    let element: HTMLElement | null = document.getElementById("root");
    if (!element) return;
    let root: Root = createRoot(element);
    root.render(node);
    return;
})(<App/>);

function App(): ReactNode {    
    let [selectedImage, setSelectedImage] = useState<string | null>(null);
    let [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/style-form" element={<StyleFormPage/>}/>
                <Route path="/sign-in" element={<SignInPage/>}/>
                <Route path="/sign-up" element={<SignUpPage/>}/>
            </Routes>
        </BrowserRouter>
    </>;
}