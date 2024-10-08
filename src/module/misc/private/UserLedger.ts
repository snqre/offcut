import * as Host from "@host";

interface UserLedgerConstructorPayload {
    _database: Host.Db.Database;
    _databaseAddress: string;
}

interface UserLedger {
    signUp(user: Host.Misc.User): Promise<void>;
    signIn(username: Host.Misc.Username, password: Host.Misc.Password): Promise<Host.Misc.User>;
}

function UserLedger({
    _database,
    _databaseAddress
}: UserLedgerConstructorPayload): UserLedger {
    /***/ return {signUp, signIn};

    async function signUp(user: Host.Misc.User): Promise<void> {
        let item: unknown = await _database.get(_databaseAddress);
        let styleTagSchema: Host.Joi.StringSchema =
            Host.Joi
                .string()
                .required();
        let userSchema: Host.Joi.ObjectSchema =
            Host.Joi.object({
                username:
                    Host.Joi
                        .string()
                        .required(),
                hashedPassword:
                    Host.Joi
                        .string()
                        .required(),
                email:
                    Host.Joi
                        .string()
                        .email()
                        .optional(),
                styleTags:
                    Host.Joi
                        .array()
                        .items(styleTagSchema)
                        .required()
            });
        Host.Validator.assert(!(
            Host.Joi
                .array()
                .items(userSchema))
            .validate(item)
            .error,
        "DATA_CORRUPTION");
        let users: Host.Misc.UserDat[] = (item as Host.Misc.UserDat[]);
        let storedUser: Host.Misc.UserDat | undefined = users.find(storedUser => storedUser.username === user.username());
        Host.Validator.assert(!storedUser, "USERNAME_ALREADY_TAKEN");
        users.push(user.pack());
        await _database.set(_databaseAddress, users);
        return;
    }

    async function signIn(username: Host.Misc.Username, password: Host.Misc.Password): Promise<Host.Misc.User> {
        let item: unknown = await _database.get(_databaseAddress);
        let styleTagSchema: Host.Joi.StringSchema =
            Host.Joi
                .string()
                .required();
        let userSchema: Host.Joi.ObjectSchema =
            Host.Joi.object({
                username:
                    Host.Joi
                        .string()
                        .required(),
                hashedPassword:
                    Host.Joi
                        .string()
                        .required(),
                email:
                    Host.Joi
                        .string()
                        .email()
                        .optional(),
                styleTags:
                    Host.Joi
                        .array()
                        .items(styleTagSchema)
                        .required()
            });
        Host.Validator.assert(!(
            Host.Joi
                .array()
                .items(userSchema))
            .validate(item)
            .error,
        "DATA_CORRUPTION");
        let users: Host.Misc.UserDat[] = (item as Host.Misc.UserDat[]);
        let user: Host.Misc.UserDat | undefined = users.find(storedUser => storedUser.username === username.toString());
        Host.Validator.assert(!!user, "INVALID_USERNAME_OR_PASSWORD");
        let success: boolean = await Host.BCryptJs.compare(password.toString(), user!.hashedPassword);
        Host.Validator.assert(success, "INVALID_USERNAME_OR_PASSWORD");
        return Host.Misc.User({
            _username: user!.username,
            _passwordLike: await Host.Misc.HashedPassword(user!.hashedPassword, true),
            _email: user!.email,
            _styleTags: user!.styleTags
        });
    }
}

export type {UserLedgerConstructorPayload};
export {UserLedger};