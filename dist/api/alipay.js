"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliPay = void 0;
const axios_1 = __importDefault(require("axios"));
const url = 'https://api.mianbaoduo.com/release/alipay/pay';
const aliPay = async (arg) => {
    const { url: customUrl, app_id, description, amount_total, out_trade_no, sign, callback_url } = arg;
    const response = await axios_1.default
        .post(url, {
        url: customUrl, app_id, description, amount_total, out_trade_no, sign, callback_url
    });
    const data = response.data;
    return data;
};
exports.aliPay = aliPay;
