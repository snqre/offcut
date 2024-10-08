import type {ReactNode} from "src__/public/Bundle";
import {BrowserRouter} from "src__/public/Bundle";
import {Routes} from "src__/public/Bundle";
import {Route} from "src__/public/Bundle";
import {HomePage} from "src__/public/Bundle";

export function App(): (ReactNode) {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>    
            </Routes>
        </BrowserRouter>
    </>;
}