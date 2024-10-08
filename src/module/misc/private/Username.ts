import * as Host from "@host";

interface Username {
    toString(): string;
}

function Username(_item: string): Username {
    /***/ {
        Host.Validator.assert(!(
            Host.Joi
                .string()
                .min(4)
                .max(32)
                .required())
            .validate(_item)
        .error,
        "CORRUPTION");
    }

    /***/ return {toString};

    function toString(): string {
        return _item;
    }
}

export {Username};