#!/usr/bin/env node
import fs from "fs";

import { Command } from "commander";
import generateDir from "./src/bin/generateDir";
import getGitInfo from "./src/bin/getGitInfo";
import _package from "./package.json"; // @ts-ignore
import { baseOpt } from "./type";
import logWithFontColor from "./src/bin/chalk/fontColor";

let DEV = false;
// 获得.env文件中的NODE_ENV的值
if (fs.existsSync(".env")) {
  const environment = fs.readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)![1];
  DEV = environment === "development";
}

const program = new Command();
let baseOpts: baseOpt = {
  typescript: false
};
program.version(_package.version); // package.json 中的版本号

/**
 * @todoa add prompt and chalk
 */
program
  .command("init <name>")
  // .description("Initialize a new project")
  .option("-d, --default", "Skip prompts and use default preset", false)
  .option("-gi, --gitinit", "Initialize git repo", false)
  .option("-a, --author <author>", "Author username for git", false)
  .action((projectName: string, options: { author: string; default: boolean; gitinit: boolean }) => {
    const author = !options.author ? getGitInfo("author") : options.author;
    //输出黄色字体
    logWithFontColor("yellow", `Initializing Project ${projectName}`);

    if (DEV) {
      console.log(options);
      console.log(author);
    }

    // TODO 增加默认模板信息
    if (options.default) {
      console.log(`This is a default option`);
    }
    // opt添加到baseOpt
    baseOpts.projectName = projectName;
    baseOpts.author = author;
    baseOpts.gitinit = options.gitinit;
    baseOpts.default = options.default;
    if (DEV) {
      console.log(baseOpts);
    }
    generateDir(baseOpts);
  });

program.parse(process.argv);
export default program;
