"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url = 'https://api.mianbaoduo.com/release/main/refund';
const wxJSAPI = async (arg) => {
    const { order_id, app_id, sign } = arg;
    const response = await axios_1.default
        .post(url, {
        order_id, app_id, sign
    });
    const data = response.data;
    return data;
};
exports.default = wxJSAPI;
