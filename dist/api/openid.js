"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenid = void 0;
const axios_1 = __importDefault(require("axios"));
const is_url_1 = __importDefault(require("is-url"));
const host = 'https://mbd.pub/openid';
const getOpenid = async (target_url, app_id) => {
    if (typeof target_url !== "string" ||
        !is_url_1.default(target_url)) {
        throw new Error("target_url is not a URL");
    }
    if (typeof app_id !== 'string' || !app_id.length) {
        throw new Error("app_id invalid");
    }
    const response = await axios_1.default.get(host, {
        params: {
            target_url, app_id
        }
    });
    return response.data;
};
exports.getOpenid = getOpenid;
