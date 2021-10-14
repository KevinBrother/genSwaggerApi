#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO  1. npm run sync 同步数据，写入到本地文件，以后就直接读取本地的
const prompt_1 = __importDefault(require("prompt"));
const genApi_1 = require("../genApi");
var schema = {
    properties: {
        path: {
            description: '来！输入你的路径吧！0.0.',
            pattern: /^[a-zA-Z\/\s\-]+$/,
            message: '有空格啥的用不了啊！',
            required: true
        },
    }
};
prompt_1.default.start();
//
// Get two properties from the user: email, password
//
prompt_1.default.get(schema, function (err, result) {
    let path = result.path;
    console.log(' path: ' + path);
    (0, genApi_1.getApi)(path).then(rst => {
        console.log('你要的api 拿去用吧！：', rst);
    });
});
// 1. 获取用户输入的path
// 2. 输出
