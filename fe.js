#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var commander_1 = require("commander");
var inquirer_1 = __importDefault(require("inquirer"));
var generateDir_1 = __importDefault(require("./src/bin/generateDir"));
var getGitInfo_1 = __importDefault(require("./src/bin/getGitInfo"));
var package_json_1 = __importDefault(require("./package.json")); // @ts-ignore
var index_1 = require("./src/bin/chalk/index");
// import { font } from "./src/bin/chalk";
var DEV = false;
// 获得.env文件中的NODE_ENV的值
if (fs_1["default"].existsSync(".env")) {
    var environment = fs_1["default"].readFileSync(".env", "utf-8").match(/NODE_ENV=(.*)/)[1];
    DEV = environment === "development";
}
var program = new commander_1.Command();
var projectInfo = function (projectName, author) {
    return [
        {
            type: "input",
            name: "projectName",
            message: "Project name",
            "default": projectName
        },
        {
            type: "input",
            name: "description",
            message: "Project description",
            "default": "''"
        },
        {
            type: "input",
            name: "author",
            message: "Author",
            "default": author
        },
        {
            type: "input",
            name: "version",
            message: "Version",
            "default": "1.0.0"
        },
        {
            type: "list",
            name: "license",
            message: "License",
            choices: Lisence
        }
    ];
};
var Lisence = [
    {
        name: "MIT",
        value: "MIT"
    },
    {
        name: "Apache",
        value: "Apache"
    },
    {
        name: "GPL",
        value: "GPL"
    },
    {
        name: "BSD",
        value: "BSD"
    },
    {
        name: "ISC",
        value: "ISC"
    },
    {
        name: "skip",
        value: ""
    }
];
var dependenciesInfo = function (_a) {
    var typescript = _a.typescript, eslint = _a.eslint;
    return [
        {
            type: "checkbox",
            name: "dependencies",
            message: "Which dependencies do you want to add?",
            choices: [
                {
                    name: "TypeScript",
                    value: "typescript",
                    checked: typescript
                },
                {
                    name: "ESLint",
                    value: "eslint",
                    checked: eslint
                }
            ]
        }
    ];
};
var baseOpts = {
    projectName: "",
    description: "",
    author: "",
    version: "",
    license: "",
    gitinit: false,
    typescript: false,
    eslint: false
};
program.version(package_json_1["default"].version); // package.json 中的版本号
/**
 * @todoa add prompt and chalk
 */
program
    .command("init <name>")
    // .description("Initialize a new project")
    .option("-d, --default", "Skip prompts and use default preset", false)
    .option("-gi, --gitinit", "Initialize git repo", false)
    .option("-a, --author <author>", "Author username for git", false)
    .action(function (projectName, options) { return __awaiter(void 0, void 0, void 0, function () {
    var author, info, _i, _a, key, dependencies, dependenciesArr;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                author = (options.author ? options.author : (0, getGitInfo_1["default"])("author")) || "";
                if (options["default"]) {
                    index_1.font.blue("You are using the default preset.");
                    baseOpts.author = author;
                    baseOpts.projectName = projectName;
                    baseOpts.gitinit = options.gitinit;
                    (0, generateDir_1["default"])(baseOpts);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, inquirer_1["default"].prompt(projectInfo(projectName, author))];
            case 1:
                info = _b.sent();
                // console.log(info);
                for (_i = 0, _a = Object.keys(info); _i < _a.length; _i++) {
                    key = _a[_i];
                    // @ts-ignore
                    baseOpts[key] = info[key];
                }
                return [4 /*yield*/, inquirer_1["default"].prompt(dependenciesInfo({
                        typescript: baseOpts.typescript,
                        eslint: baseOpts.eslint
                    }))];
            case 2:
                dependencies = _b.sent();
                dependenciesArr = dependencies.dependencies;
                baseOpts.typescript = dependenciesArr.includes("typescript");
                baseOpts.eslint = dependenciesArr.includes("eslint");
                (0, generateDir_1["default"])(baseOpts);
                return [2 /*return*/];
        }
    });
}); });
program.parse(process.argv);
exports["default"] = program;