import { default as Hash } from "bcrypt";
import { UserData } from "@common";

export type Auth = {
    checkPermission<T extends string>(user: UserData<T>, password: string): boolean;
    hash(password: string): string;
};
export const Auth: Auth = (() => {
    /** @constructor */ {
        return { checkPermission, hash };
    }

    function checkPermission(...[user, password]: Parameters<Auth["checkPermission"]>): ReturnType<Auth["checkPermission"]> {
        return Hash.compareSync(password, user.hash);
    }

    function hash(...[password]: Parameters<Auth["hash"]>): ReturnType<Auth["hash"]> {
        return Hash.hashSync(password, 64);
    }
})();