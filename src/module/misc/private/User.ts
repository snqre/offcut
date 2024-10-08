import * as Host from "@host";

interface UserConstructorPayload {
    _username: Host.Misc.Username;
    _passwordLike: Host.Misc.Password | Host.Misc.HashedPassword;
    _email?: Host.Misc.Email;
    _styleTags?: Host.Misc.StyleTag[];
}

interface UserDat {
    username: string;
    hashedPassword: string;
    email: string | undefined;
    styleTags: string[];
}

interface User {
    username(): Host.Misc.Username;
    hashedPassword(): Host.Misc.HashedPassword;
    email(): Host.Misc.Email | undefined;
    styleTags(): Host.Misc.StyleTag[];
    pack(): UserDat;
}

async function User({
    _username,
    _passwordLike,
    _email,
    _styleTags
}: UserConstructorPayload): Promise<User> {
    let _hashedPassword: Host.Misc.HashedPassword;

    /***/ {
        if ("hash" in _passwordLike) _hashedPassword = await _passwordLike.hash();
        else _hashedPassword = _passwordLike;
    }

    /***/ return {username, hashedPassword, email, styleTags, pack};

    function username(): Host.Misc.Username {
        return _username;
    }

    function hashedPassword(): Host.Misc.HashedPassword {
        return _hashedPassword;
    }

    function email(): Host.Misc.Email | undefined {
        return _email;
    }

    function styleTags(): Host.Misc.StyleTag[] {
        return _styleTags ?? [];
    }

    function pack(): UserDat {
        return {
            username: _username.toString(),
            hashedPassword: _hashedPassword.toString(),
            email: _email?.toString(),
            styleTags: _styleTags?.map(tag => tag.toString()) ?? []
        };
    }
}

export type {UserConstructorPayload};
export type {UserDat};
export {User};