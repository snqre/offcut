import type {SizeLike} from "src__/public/Bundle";
import type {CssValue} from "src__/public/Bundle";

export interface SizeAdaptor {
    cur(): CssValue | undefined;
    min(): CssValue | undefined;
    max(): CssValue | undefined;
}

export function SizeAdaptor(sizeLike: SizeLike): SizeAdaptor {
    let _cur: CssValue | undefined;
    let _min: CssValue | undefined;
    let _max: CssValue | undefined;

    /***/ {
        if (Array.isArray(sizeLike)) {
            _cur = sizeLike[0];
            _min = sizeLike[1];
            _max = sizeLike[2];
        }
        else if (typeof sizeLike === "object") {
            _cur = sizeLike.cur;
            _min = sizeLike.min;
            _max = sizeLike.max;
        }
        else _cur = sizeLike;

        return {cur, min, max};
    }

    function cur(): CssValue | undefined {
        return _cur;
    }

    function min(): CssValue | undefined {
        return _min;
    }

    function max(): CssValue | undefined {
        return _max;
    }
}