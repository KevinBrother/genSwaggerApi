"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = exports.StructureStringEnum = exports.BasePathEnum = void 0;
var BasePathEnum;
(function (BasePathEnum) {
    BasePathEnum["task"] = "/bizTask";
    BasePathEnum["bbs"] = "/bbs";
    BasePathEnum["user"] = "/user";
    BasePathEnum["comm"] = "/comm";
})(BasePathEnum = exports.BasePathEnum || (exports.BasePathEnum = {}));
var StructureStringEnum;
(function (StructureStringEnum) {
    StructureStringEnum["int64"] = "long";
    StructureStringEnum["integer"] = "integer";
    StructureStringEnum["number"] = "number";
    StructureStringEnum["array"] = "array";
    StructureStringEnum["string"] = "string";
    StructureStringEnum["object"] = "object";
})(StructureStringEnum = exports.StructureStringEnum || (exports.StructureStringEnum = {}));
var Method;
(function (Method) {
    Method["POST"] = "post";
    Method["GET"] = "get";
})(Method = exports.Method || (exports.Method = {}));
