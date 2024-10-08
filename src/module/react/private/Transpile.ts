import * as Host from "@host";

function transpile(path: string, outdir: string): Buffer {
    let p0: string = path;
    let p1: string = outdir;
    let command: string = `bun build ${p0} --outdir ${p1}`;
    return Host.ChildProcess.execSync(command);
}

export {transpile};