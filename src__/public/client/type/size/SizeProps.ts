import type {SizeAdaptor} from "src__/public/Bundle";
import type {AspectRatioAdaptor} from "src__/public/Bundle";

export interface SizeProps {
    w?: SizeAdaptor;
    h?: SizeAdaptor;
    aspectRatio?: AspectRatioAdaptor;
}