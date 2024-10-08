import * as Host from "@host";

interface Password {
    toString(): string;
    hash(): Promise<Host.Misc.HashedPassword>;
}

function Password(_item: string): Password {
    /***/ {
        Host.Validator.assert(!(
            Host.Joi
                .string()
                .min(4)
                .max(32)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "password")
                .required())
            .validate(_item)
            .error,
        "CORRUPTION");
    }

    /***/ return {toString, hash};

    function toString(): string {
        return _item;
    }

    async function hash(): Promise<Host.Misc.HashedPassword> {
        return await Host.Misc.HashedPassword(_item);
    }
}

export {Password};