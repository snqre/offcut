import * as Host from "@host";

(async () => {
    console.log("booting host ...");
    let p0: string = Host.Path.join(__dirname, "App.tsx");
    let p1: string = __dirname;
    let buffer: Buffer = Host.React.transpile(p0, p1);
    let db: Host.Db.Database = await Host.Db.Redis();
    let userLedger: Host.Misc.UserLedger = Host.Misc.UserLedger({_database: db, _databaseAddress: "users"});
    let host = Host.Express()
        .use(Host.Express.static(__dirname))
        .use(Host.Express.json())
        .use(Host.BodyParser.json())
        .get("/", async (request, response) => response.status(200).sendFile(Host.Path.join(__dirname, "App.html")))
        .post("/user/sign-up", async (request, response) => {
            try {
                let schema: Host.Joi.ObjectSchema =
                    Host.Joi.object({
                        username:
                            Host.Joi
                                .string()
                                .required(),
                        password:
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
                                .items(
                                    Host.Joi
                                        .string()
                                        .required()
                                )
                                .optional()
                    });
                Host.Validator.assert(!schema.validate(request.body).error, "INVALID_REQUEST_BODY");
                let user: Host.Misc.User = 
                    await Host.Misc.User({
                        _username: request.body.username,
                        _passwordLike: Host.Misc.Password(request.body.password),
                        _email: request.body.email,
                        _styleTags: request.body.styleTags
                    });
                await userLedger.signUp(user);
                return response.json({message: "SIGN_UP_SUCCESSFUL"});
            }
            catch (e: unknown) {
                return response.json({message: (e as Error).message});
            }
        })
        .post("/user/sign-in", async (request, response) => {
            
        })
        .listen(3000);
    console.log(buffer.toString("utf8"));
    console.log("boot complete");
    return;
})();