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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
// const url = 'http://192.168.1.13:8083/task/v2/api-docs';
const url = 'http://192.168.1.11:8000/test/api-docs.json';
const basePath = types_1.BasePathEnum.task;
// ts环境可以简化的生成 (params:{"pageNum":"","pageSize":""})
// js的只能是 ({"pageNum":"","pageSize":""})
const isTypeScript = false;
function getApi(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, status } = yield axios_1.default.get(url);
        if (status !== 200) {
            throw new Error("error: " + status);
        }
        // console.log(data);
        return genApiString(path, data);
    });
}
exports.getApi = getApi;
// 1. 拿到想要生成的字段
function genApiString(path, swagger) {
    // TODO 每次生成都需要请求的可以去优化一下
    const { paths, definitions } = swagger;
    // 2. 找到path的对象
    let pathObject = getPath(path, paths);
    path = pathObject.path;
    const { pathModel, name } = pathObject;
    // 3. 更具path对象的parameters是否为dto对象
    const { params, method, summary } = getParams(pathModel, definitions);
    //  如果不是dto就直接替换模板
    // 如果是dto就去dto对象中再处理
    // 4. 返回字符串
    let temp = {
        basePath,
        summary,
        name,
        request: 'request',
        url: path,
        method,
        params
    };
    return getTemp(temp);
}
/**
 * 根据输入的path我去对应该的接口配置信息对象
 * @param path
 * @param paths
 * @returns
 */
function getPath(path, paths) {
    console.log('getPath 中的 path: ', path);
    let newPaths = Object.keys(paths).filter(item => item.includes(path));
    if (!newPaths.length) {
        throw new Error("没有你要找的path: " + path);
    }
    if (newPaths.length > 1) {
        // TODO  只给一个方法名字，却有多个匹配的，需要处理
        throw new Error("你要找的path有好几个呢。。。: " + newPaths);
    }
    path = newPaths[0];
    let name = path.slice(path.lastIndexOf('/') + 1);
    return {
        name,
        path,
        pathModel: paths[path]
    };
}
// 3. 更具path对象的parameters是否为dto对象
//  如果不是dto就直接替换模板
// 如果是dto就去dto对象中再处理
// 4. 返回字符串
/**
 *
 * @param params 生成字符串
 * @returns
 */
function getTemp(template) {
    /*     let template:Template = {
            basePath: '/task',
            name: 'reqLogin',
            params: {username: 1},
            request: 'request',
            url: '/index/getNewsListMini',
            method: Method.POST,
            option: {username: 1}
        };
     */
    // reqUpdateTrainNumberPosition = (abc = { lat: '', lon: '', taskId: '' }) => request.get('/bizTask/tms/trainNumber/updateTrainNumberPosition', abc);
    // reqGetNewsList = ({pageNum=1,pageSize=10}) => request.get('/bizTask/index/getNewsListMini',{pageNum,pageSize})
    // listByPage = ({pageNum= "", pageSize = ""}) => request.get('/bizTask/vessel/listByPage', { pageNum, pageSize})
    let { basePath, name, params, request, url, method, summary } = template;
    // 首字母大写，并拼接req字符串
    name = 'req' + name.charAt(0).toUpperCase() + name.slice(1);
    /*     if(!isTypeScript) {
            let str = '';
            let keys = '';
            Object.keys(params).forEach(item => {
                let value = params[item];
                
                if(value === '') {
                    value = "\'\'";
                }
                // str += `${item} = ${params[item] },`
                
                str += `${item} = ${value},`
                
                keys += `${item}, `
            })
        }
     */
    /**
 *
 * @param formData
 * @return {Promise<any>}
 */
    return `
            /**
             * ${summary} 
             * @param any
             */
             ${name} = (params = ${JSON.stringify(params)}) => ${request}.${method}('${basePath}${url}', params)`;
}
/**
 * 获取求出的参数，配置，和请求的方法
 * @param pathModel
 * @param definitions
 * @returns
 */
function getParams(pathModel, definitions) {
    var _a;
    let params = {};
    let method = Object.keys(pathModel)[0];
    let { parameters, summary } = pathModel[method];
    let paramsLen = parameters.length;
    if (paramsLen === 0) {
        return {
            params,
            method,
            summary
        };
    }
    if (pathModel.get) {
        // get请求有多个参数，应该都不是dto类型的，直接批量处理后返回
        params = getFormatParams(parameters);
        /*         if(paramsLen === 1) {
                    params = parameters[0].name;
                }else {
                    return getFormatParams(parameters, method);
                } */
    }
    else if (pathModel.post) {
        // 处理dto类型的参数
        if (paramsLen === 1 && parameters[0].schema) {
            const { name, required, schema } = parameters[0];
            let dto = (_a = schema === null || schema === void 0 ? void 0 : schema.originalRef) !== null && _a !== void 0 ? _a : schema.items.originalRef;
            const { properties } = definitions[dto];
            // console.log(properties);
            Object.keys(properties).forEach(item => {
                const { description, type, format } = properties[item];
                params[item] = transformType(type);
            });
        }
        else {
            // Post请求有多个参数，且都不是dto类型的，直接批量处理后返回
            params = getFormatParams(parameters);
        }
    }
    return {
        params,
        method,
        summary
    };
}
/**
 * 批量设置参数，并格式化返回，
 * @param parameters
 * @returns
 */
function getFormatParams(parameters) {
    let params = {};
    parameters.forEach(element => {
        // TODO required的精确度需要后端的配合
        const { name, required, type } = element;
        params[name] = transformType(type);
    });
    return params;
}
/**
 * 更具类型自动设置默认值  大部分的都设置为 空字符串
 * @param type
 * @returns
 */
function transformType(type) {
    const { int64, integer, string, number, object } = types_1.StructureStringEnum;
    let stringFormatArr = [int64, integer, string, number];
    if (stringFormatArr.includes(type)) {
        return '';
    }
}
