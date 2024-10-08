import {execSync} from "src__/public/Bundle";

export interface Transpiler {
    transpile(path: string, outDirectory: string): Buffer;
}

export function Transpiler(): (Transpiler) {
    /***/ return {transpile};

    function transpile(path: string, outDirectory: string): Buffer {
        let path0: string = path;
        let path1: string = outDirectory;
        let command: string = `bun build ${path0} --outdir ${path1}`;
        return execSync(command);
    }
}