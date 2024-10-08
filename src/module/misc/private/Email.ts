import * as Host from "@host";

interface Email {
    toString(): string;
}

function Email(_item: string): Email {
    /***/ {
        Host.Validator.assert(!(
            Host.Joi
                .string()
                .email()
                .required()
        )
            .validate(_item)
            .error,
        "CORRUPTION");
    }

    /***/ return {toString};

    function toString(): string {
        return _item;
    }
}

export {Email};