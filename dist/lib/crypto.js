"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("../util/md5"));
const string_1 = __importDefault(require("../util/string"));
const crypto = (data, app_key) => {
    if (!string_1.default.notEmpty(app_key)) {
        throw new Error('app_key invalid');
    }
    if (Object.prototype.toString.call(data) !== '[object Object]') {
        throw new Error('data is not an object');
    }
    const keys = Object.keys(data).sort();
    if (!keys.length)
        throw new Error('data is an empty object');
    const strTemp = keys.map((key) => {
        return `${key}=${data[key]}`;
    }).join('&') + `&key=${app_key}`;
    return md5_1.default(strTemp);
};
exports.default = crypto;
