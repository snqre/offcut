export type RandomOutcomeUnit = {
    success(percentage: number): boolean;
    failure(percentage: number): boolean;
}

export function RandomOutcomeUnit(): RandomOutcomeUnit {

    /***/ {
        return {success, failure};
    }

    function success(percentage: number): boolean {
        if (percentage > 100) throw Error("success can only be achieved at most 100% of the time");
        return Math.random() * 100 < percentage;
    }

    function failure(percentage: number): boolean {
        if (percentage > 100) throw Error("failure can only be achieved at most 100% of the time");
        return !success(percentage);
    }
}