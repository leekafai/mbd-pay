"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const axios_1 = __importDefault(require("axios"));
const url = 'https://api.mianbaoduo.com/release/main/search_order';
/**
 *
 * 查询订单
 */
const query = async (arg) => {
    const { app_id, out_trade_no, sign } = arg;
    const response = await axios_1.default
        .post(url, {
        app_id, out_trade_no, sign
    });
    const data = response.data;
    return data;
};
exports.query = query;
