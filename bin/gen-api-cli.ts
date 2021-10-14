#!/usr/bin/env node
// TODO  1. npm run sync 同步数据，写入到本地文件，以后就直接读取本地的
import prompt from 'prompt';
import {getApi} from '../genApi';


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

  prompt.start();

  //
  // Get two properties from the user: email, password
  //
  prompt.get(schema, function (err, result) {
    let path = result.path;
    console.log(' path: ' + path);


    getApi(path).then(rst => {
        console.log('你要的api 拿去用吧！：', rst);
    })
  });
// 1. 获取用户输入的path

// 2. 输出