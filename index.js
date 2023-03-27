import glob from "glob";
import fs from "fs/promises";
import { build } from "esbuild";
// 1、获取到所有的测试脚本 *.spec.js   -> 依赖glob库
// 2、执行这些脚本
const files = glob.sync("*.spec.js");

for (let file of files) {
  const fileContent = await fs.readFile(file, "utf-8");
  runModule(fileContent);
}

async function runModule(fileContent) {
  const result = await build({
    stdin: {
      contents: fileContent,
      resolveDir: process.cwd(),
    },
    write: false,
    bundle: true,
    target: "esnext",
  });
  new Function(result.outputFiles[0].text)();
}
