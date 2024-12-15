import type { MountDirectoryActionR } from "robus/fs";
import type { MountDirectoryActionE } from "robus/fs";
import type { BuildOutput } from "bun";
import type { CopyFileActionR } from "robus/fs";
import type { CopyFileActionE } from "robus/fs";
import type { CopyDirectoryActionR } from "robus/fs";
import type { CopyDirectoryActionE } from "robus/fs";
import type { RemoveFileActionR } from "robus/fs";
import type { RemoveFileActionE } from "robus/fs";
import { Result } from "ts-results";
import { Err } from "ts-results";
import { Ok } from "ts-results";
import { CopyFileActionConfig } from "robus/fs";
import { MountDirectoryActionConfig } from "robus/fs";
import { build as buildReactApp } from "bun";
import { build } from "tsup";
import { copyFile } from "robus/fs";
import { mountDirectory } from "robus/fs";
import { copyDirectory } from "robus/fs";
import { removeFile } from "robus/fs";

type BuildScript = {
    run(): Promise<
        | Ok<void>
        | Err<MountDirectoryActionE>
        | Err<CopyFileActionE>
        | Err<CopyDirectoryActionE>
        | Err<RemoveFileActionE>
        | Err<[unknown]>>;
};
function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(): ReturnType<BuildScript["run"]> {
        let mountDirectoryR: MountDirectoryActionR = await mountDirectory(MountDirectoryActionConfig({at: "target/node/web/public", recursive: true}));
        if (mountDirectoryR.err) return mountDirectoryR;
        let buildReactAppR: Result<BuildOutput, unknown> = await Result.wrapAsync(async () => await buildReactApp({
            entrypoints: ["src/web/App.tsx"],
            format: "esm",
            target: "browser",
            minify: false,
            outdir: "target/node/web"
        }));
        if (buildReactAppR.err) return Err<[unknown]>([buildReactAppR.val]);
        let copyFileR: CopyFileActionR = await copyFile(CopyFileActionConfig({
            from: "src/web/App.html",
            to: "target/node/web/App.html",
            encoding: "utf8",
            overwrite: true
        }));
        if (copyFileR.err) return copyFileR;
        let copyDirectoryR: CopyDirectoryActionR = await copyDirectory("src/web/public", "target/node/web/public");
        if (copyDirectoryR.err) return copyDirectoryR;
        let buildR: Result<void, unknown> = await Result.wrapAsync(async () => await build({
            entry: ["src/server/App.ts"],
            format: ["iife"],
            outDir: "target/node",
            minify: false,
            tsconfig: "tsconfig.json",
            platform: "node"
        }));
        if (buildR.err) return Err<[unknown]>([buildR.val]);
        let copyAppGlobalR: CopyFileActionR = await copyFile(CopyFileActionConfig({
            from: "target/node/App.global.js",
            to: "target/node/App.js",
            encoding: "utf8",
            overwrite: true
        }));
        if (copyAppGlobalR.err) return copyAppGlobalR;
        let removeAppGlobalR: RemoveFileActionR = await removeFile("target/node/App.global.js");
        if (removeAppGlobalR.err) return removeAppGlobalR;
        return Ok(undefined);
    }
}

(await BuildScript().run()).unwrap();