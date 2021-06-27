"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wxJSAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const url = 'https://api.mianbaoduo.com/release/wx/prepay';
const wxJSAPI = async (arg) => {
    const { openid, app_id, description, amount_total, out_trade_no, callback_url, sign } = arg;
    const response = await axios_1.default
        .post(url, {
        openid, app_id, description, amount_total, out_trade_no, callback_url, sign
    });
    const data = response.data;
    return data;
};
exports.wxJSAPI = wxJSAPI;
