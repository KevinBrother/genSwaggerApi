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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var types_1 = require("./types");
var url = 'http://192.168.1.13:8083/task/v2/api-docs';
var basePath = types_1.BasePathEnum.task;
// ts??????????????????????????? (params:{"pageNum":"","pageSize":""})
// js???????????? ({"pageNum":"","pageSize":""})
var isTypeScript = false;
function getApi(path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, status;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    _a = _b.sent(), data = _a.data, status = _a.status;
                    if (status !== 200) {
                        throw new Error("error: " + status);
                    }
                    // console.log(data);
                    return [2 /*return*/, genApiString(path, data)];
            }
        });
    });
}
// 1. ???????????????????????????
function genApiString(path, swagger) {
    // TODO ???????????????????????????????????????????????????
    var paths = swagger.paths, definitions = swagger.definitions;
    // 2. ??????path?????????
    var pathObject = getPath(path, paths);
    path = pathObject.path;
    var pathModel = pathObject.pathModel, name = pathObject.name;
    // 3. ??????path?????????parameters?????????dto??????
    var _a = getParams(pathModel, definitions), params = _a.params, method = _a.method;
    //  ????????????dto?????????????????????
    // ?????????dto??????dto??????????????????
    // 4. ???????????????
    var temp = {
        basePath: basePath,
        name: name,
        request: 'request',
        url: path,
        method: method,
        params: params
    };
    return getTemp(temp);
}
/**
 * ???????????????path??????????????????????????????????????????
 * @param path
 * @param paths
 * @returns
 */
function getPath(path, paths) {
    console.log('getPath ?????? path: ', path);
    var newPaths = Object.keys(paths).filter(function (item) { return item.includes(path); });
    if (!newPaths.length) {
        throw new Error("??????????????????path: " + path);
    }
    if (newPaths.length > 1) {
        // TODO  ???????????????????????????????????????????????????????????????
        throw new Error("????????????path????????????????????????: " + newPaths);
    }
    path = newPaths[0];
    var name = path.slice(path.lastIndexOf('/') + 1);
    return {
        name: name,
        path: path,
        pathModel: paths[path]
    };
}
// 3. ??????path?????????parameters?????????dto??????
//  ????????????dto?????????????????????
// ?????????dto??????dto??????????????????
// 4. ???????????????
/**
 *
 * @param params ???????????????
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
    var basePath = template.basePath, name = template.name, params = template.params, request = template.request, url = template.url, method = template.method;
    // ???????????????????????????req?????????
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
    return name + " = (params = " + JSON.stringify(params) + ") => " + request + "." + method + "('" + basePath + url + "', params)";
}
/**
 * ???????????????????????????????????????????????????
 * @param pathModel
 * @param definitions
 * @returns
 */
function getParams(pathModel, definitions) {
    var _a;
    var params = {};
    var method = Object.keys(pathModel)[0];
    var pathObject = pathModel[method];
    var parameters = pathObject.parameters;
    var paramsLen = parameters.length;
    if (paramsLen === 0) {
        return {
            params: params,
            method: method
        };
    }
    if (pathModel.get) {
        // get???????????????????????????????????????dto???????????????????????????????????????
        params = getFormatParams(parameters);
        /*         if(paramsLen === 1) {
                    params = parameters[0].name;
                }else {
                    return getFormatParams(parameters, method);
                } */
    }
    else if (pathModel.post) {
        // ??????dto???????????????
        if (paramsLen === 1 && parameters[0].schema) {
            var _b = parameters[0], name_1 = _b.name, required = _b.required, schema = _b.schema;
            var dto = (_a = schema === null || schema === void 0 ? void 0 : schema.originalRef) !== null && _a !== void 0 ? _a : schema.items.originalRef;
            var properties_1 = definitions[dto].properties;
            // console.log(properties);
            Object.keys(properties_1).forEach(function (item) {
                var _a = properties_1[item], description = _a.description, type = _a.type, format = _a.format;
                params[item] = transformType(type);
            });
        }
        else {
            // Post????????????????????????????????????dto???????????????????????????????????????
            params = getFormatParams(parameters);
        }
    }
    return {
        params: params,
        method: method
    };
}
/**
 * ??????????????????????????????????????????
 * @param parameters
 * @returns
 */
function getFormatParams(parameters) {
    var params = {};
    parameters.forEach(function (element) {
        // TODO required?????????????????????????????????
        var _a = element, name = _a.name, required = _a.required, type = _a.type;
        params[name] = transformType(type);
    });
    return params;
}
/**
 * ?????????????????????????????????  ???????????????????????? ????????????
 * @param type
 * @returns
 */
function transformType(type) {
    var int64 = types_1.StructureStringEnum.int64, integer = types_1.StructureStringEnum.integer, string = types_1.StructureStringEnum.string, number = types_1.StructureStringEnum.number, object = types_1.StructureStringEnum.object;
    var stringFormatArr = [int64, integer, string, number];
    if (stringFormatArr.includes(type)) {
        return '';
    }
}
getApi('mber/updateTrainNumberPosition')
    // getApi('photo/insertTrainNumberPhoto')
    // getApi('/photo/listPlPhoto')
    // getApi('/vessel/listByPage')
    .then(function (rst) {
    console.log('-----------------------------', rst);
});
