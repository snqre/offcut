import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import * as FileSystem from "robus/fs";
import * as TypeScript from "tsup";
import * as Bun from "bun";

type BuildScript = {
    run():
        Promise<
            | Ok<void>
            | Err<FileSystem.MountDirectoryActionE>
            | Err<FileSystem.CopyFileActionE>
            | Err<FileSystem.CopyDirectoryActionE>
            | Err<FileSystem.RemoveFileActionE>
            | Err<[unknown]>
        >;
};
function BuildScript(): BuildScript {
    /***/ return { run };

    async function run(): ReturnType<BuildScript["run"]> {
        let mountDirectoryR = await FileSystem.mountDirectory(FileSystem.MountDirectoryActionConfig({ at: "target/node/web/public", recursive: true }));
        if (mountDirectoryR.err) return Err(mountDirectoryR.val);
        let buildReactAppR = await Result.wrapAsync(async () => await Bun.build({
            entrypoints: ["src/web/App.tsx"],
            format: "esm",
            target: "browser",
            minify: true,
            outdir: "target/node/web"
        }));
        if (buildReactAppR.err()) return Err<[unknown]>([buildReactAppR.val()]);
        let copyFileR = await FileSystem.copyFile(FileSystem.CopyFileActionConfig({
            from: "src/web/App.html",
            to: "target/node/web/App.html",
            encoding: "utf8",
            overwrite: true
        }));
        if (copyFileR.err) return Err(copyFileR.val);
        let copyDirectoryR = await FileSystem.copyDirectory("src/web/public", "target/node/web/public");
        if (copyDirectoryR.err) return Err(copyDirectoryR.val);
        let buildR = await Result.wrapAsync(async () => await TypeScript.build({
            entry: ["src/server/App.ts"],
            format: ["esm"],
            outDir: "target/node",
            minify: true,
            tsconfig: "tsconfig.json",
            platform: "node"
        }));
        if (buildR.err()) return Err<[unknown]>([buildR.val()]);
        return Ok(undefined);

    }
}

let script = BuildScript();
let runR = await script.run();
runR.unwrap();