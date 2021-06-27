"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wxH5 = void 0;
const axios_1 = __importDefault(require("axios"));
const url = 'https://api.mianbaoduo.com/release/wx/prepay';
const wxH5 = async (params) => {
    const { app_id, description, amount_total, out_trade_no, sign } = params;
    const response = await axios_1.default
        .post(url, {
        app_id, description, amount_total, out_trade_no, sign
    });
    const data = response.data;
    return data;
};
exports.wxH5 = wxH5;
