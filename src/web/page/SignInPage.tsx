import type {ReactNode} from "react";
import {ResponsiveAnchorPage} from "../components/ResponsiveAnchorPage";
import {TextInputField} from "../components/TextInputField";
import {FormButton} from "../components/FormButton";
import {SignInRequest} from "../common/SignInRequest";
import {useState} from "react";
import {useEffect} from "react";
import * as BoxShadow from "../constant/BoxShadow";
import * as ColorPalette from "../constant/ColorPalette";
import * as Server from "../core/Server";

export function SignInPage(): ReactNode {
    let [message, setMessage] = useState<string>("");
    let [success, setSuccess] = useState<boolean>(false);
    let [username, setUsername] = useState<string>("");
    let [password, setPassword] = useState<string>("");
    let incompleteFormMessage: string = "The form is incomplete.";

    useEffect(() => {

    }, [username, password])

    return <>
        <ResponsiveAnchorPage>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    boxShadow: BoxShadow.TAILWIND_0,
                    padding: 20,
                    gap: 40
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: 20
                    }}>
                    <TextInputField
                        label="Username"
                        placeholder="mr_offcut200"
                        setInput={setUsername}
                        validate={input => {
                            let success: boolean = true;
                            let errmsg: string = "Username is required.";
                            if (input.length === 0) success = false;
                            if (!success) setMessage(incompleteFormMessage);
                            return [success, errmsg];
                        }}/>
                    <TextInputField
                        label="Password"
                        placeholder="$off$cut123"
                        setInput={setPassword}
                        validate={input => {
                            let success: boolean = true;
                            let errmsg: string = "Password is required.";
                            if (input.length === 0) success = false;
                            if (!success) setMessage(incompleteFormMessage);
                            return [success, errmsg];
                        }}/>
                </div>
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
                    {message.length > 0 &&
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
                            color: success ? ColorPalette.LIGHT_SEA_GREEN : ColorPalette.JASPER,
                            flexGrow: 1
                        }}>
                        {message}
                    </div>}
                    <FormButton
                        label="Sign In"
                        onClick={async () => {
                            if (username.length === 0 || password.length === 0) {
                                setSuccess(false);
                                setMessage(incompleteFormMessage);
                                return;
                            }
                            try {
                                await Server.signIn(SignInRequest({
                                    username: username,
                                    password: password
                                }));
                                setSuccess(true);
                                setMessage("You are logged in!");
                                return;
                            }
                            catch (e) {
                                setSuccess(false);
                                setMessage((e as Error).message);
                                return;
                            }
                        }}/>
                </div>
            </div>
        </ResponsiveAnchorPage>
    </>;
}