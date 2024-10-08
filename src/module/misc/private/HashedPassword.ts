import * as Host from "@host";

interface HashedPassword {
    toString(): string;
    compare(password: Host.Misc.Password): Promise<boolean>;
}

async function HashedPassword(_item: string, isHashed?: boolean): Promise<HashedPassword> {
    /***/ {
        if (!isHashed) _item = await Host.BCryptJs.hash(_item, 32);
    }

    /***/ return {toString, compare};

    function toString(): string {
        return _item;
    }

    async function compare(password: Host.Misc.Password): Promise<boolean> {
        return await Host.BCryptJs.compare(password.toString(), toString());
    }
}

export {HashedPassword};