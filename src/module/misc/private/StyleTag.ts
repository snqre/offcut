import * as Host from "@host";

interface StyleTag {
    toString(): string;
}

function StyleTag(_item: string): StyleTag {
    /***/ {
        Host.Validator.assert(!(
            Host.Joi
                .string()
                .min(1)
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

export {StyleTag};