import type {AspectRatioLike} from "src__/public/Bundle";
import type {AspectRatio} from "src__/public/Bundle";

export interface AspectRatioAdaptor {
    get(): AspectRatio;
}

export function AspectRatioAdaptor(aspectRatioLike: AspectRatioLike): AspectRatioAdaptor {
    let _aspectRatio: AspectRatio;
    
    /***/ {
        if (Array.isArray(aspectRatioLike)) _aspectRatio = `${aspectRatioLike[0]}/${aspectRatioLike[1]}`;
        else _aspectRatio = aspectRatioLike;
        return {get};
    }

    function get(): AspectRatio {
        return _aspectRatio;
    }
}