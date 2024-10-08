import * as Client from "@client";

function User() {
    let _signedIn: boolean;
    let _username: string | null;
    let _password: string | null;

    /***/ {
        _signedIn = false;
        _username = null;
        _password = null;
    }

    function SignInForm(): Client.React.ReactNode {
        let [usernameInput, setUsernameInput] = Client.React.useState<string>("");
        let [passwordInput, setPasswordInput] = Client.React.useState<string>("");

        return <>
            <Client.Spring.animated.div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start"
                }}>
                
            </Client.Spring.animated.div>
        </>;
    }

    async function connected(): Promise<boolean> {
        try {
            let response =
                await Client.Axios.post("/post/-sign-in", {
                    username: _username,
                    password: _password
                });
            return response.data.message === "SIGN_IN_SUCCESSFUL";
        }
        catch {
            return false;
        }
    }

    async function signIn(email: string, password: string) {
        try {
            let response =
                await Client.Axios.post("/post/sign-in", {
                    username: email,
                    password: password
                });
            if (response.data.message === "SIGN_IN_SUCCESSFUL") return true;
        }
        catch {

        }
    }
}

let _isSignedIn: boolean = false;



function SignUpForm(): Client.React.ReactNode {
    return <>

    </>;
}

function isSignedIn(): boolean {
    return _isSignedIn;
}



async function signUp() {

}