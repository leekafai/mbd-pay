"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Mbdpay_app_id, _Mbdpay_app_key;
const string_1 = __importDefault(require("./util/string"));
const openid_1 = require("./api/openid");
const crypto_1 = __importDefault(require("./lib/crypto"));
const wxH5_1 = require("./api/wxH5");
const alipay_1 = require("./api/alipay");
const is_url_1 = __importDefault(require("is-url"));
const wxJSAPI_1 = require("./api/wxJSAPI");
const query_1 = require("./api/query");
const refund_1 = require("./api/refund");
class Mbdpay {
    constructor(opts) {
        _Mbdpay_app_id.set(this, undefined);
        _Mbdpay_app_key.set(this, undefined);
        const { app_id, app_key } = opts;
        if (!string_1.default.notEmpty(app_id)) {
            throw new Error('app_id invalid');
        }
        if (!string_1.default.notEmpty(app_key)) {
            throw new Error('app_key invalid');
        }
        __classPrivateFieldSet(this, _Mbdpay_app_id, app_id, "f");
        __classPrivateFieldSet(this, _Mbdpay_app_key, app_key, "f");
    }
    get app_id() {
        return __classPrivateFieldGet(this, _Mbdpay_app_id, "f");
    }
    get app_key() {
        return __classPrivateFieldGet(this, _Mbdpay_app_key, "f");
    }
    async wechatGetOpenid(args) {
        const { target_url } = args;
        if (!string_1.default.notEmpty(target_url)) {
            throw new Error('target_url 不能为空');
        }
        return openid_1.getOpenid(target_url, __classPrivateFieldGet(this, _Mbdpay_app_id, "f"));
    }
    sign(data) {
        try {
            let dataFiltered = {};
            let hasData = 0;
            Object.keys(data).filter((key) => {
                return (data[key] !== null && data[key] !== undefined);
            }).forEach((key) => {
                dataFiltered[key] = data[key];
                hasData++;
            });
            if (!hasData) {
                throw new Error('签名数据存在错误');
            }
            return crypto_1.default(dataFiltered, __classPrivateFieldGet(this, _Mbdpay_app_key, "f"));
        }
        catch (err) {
            console.error(err);
        }
    }
    async wechatH5(args) {
        const { description, amount_total, out_trade_no } = args;
        if (!string_1.default.notEmpty(description)) {
            throw new Error('description 不能为空');
        }
        const amount = +amount_total;
        if (!Number.isInteger(amount) || amount < 1) {
            throw new Error('amount_total 单位为分，需为大于等于1的正整数');
        }
        let outTradeNo = (out_trade_no || '') + '';
        if (out_trade_no) {
            if (!string_1.default.notEmpty(out_trade_no)) {
                outTradeNo = undefined;
            }
        }
        const data = {
            app_id: __classPrivateFieldGet(this, _Mbdpay_app_id, "f"),
            description,
            amount_total: amount,
            out_trade_no: outTradeNo
        };
        const sign = this.sign(data);
        if (!sign)
            throw new Error('签名错误');
        return wxH5_1.wxH5(Object.assign(data, { sign }));
    }
    async alipay(args) {
        const { url: customUrl, description, amount_total, out_trade_no, callback_url } = args;
        if (!is_url_1.default(customUrl))
            throw new Error('url is not a URL');
        if (callback_url && !is_url_1.default(callback_url))
            throw new Error('callback_url is not a URL');
        const amount = +amount_total;
        if (!Number.isInteger(amount) || amount < 1) {
            throw new Error('amount_total 单位为分，需为大于等于1的正整数');
        }
        let outTradeNo = (out_trade_no || '') + '';
        if (out_trade_no) {
            if (!string_1.default.notEmpty(out_trade_no)) {
                outTradeNo = undefined;
            }
        }
        if (!string_1.default.notEmpty(description)) {
            throw new Error('description 不能为空');
        }
        const data = {
            app_id: __classPrivateFieldGet(this, _Mbdpay_app_id, "f"),
            url: customUrl,
            description,
            amount_total: amount,
            out_trade_no: outTradeNo,
            callback_url
        };
        const sign = this.sign(data);
        if (!sign)
            throw new Error('签名错误');
        return alipay_1.aliPay(Object.assign(data, { sign }));
    }
    async wechatJSAPI(args) {
        const { openid, description, amount_total, out_trade_no, callback_url } = args;
        if (!is_url_1.default(callback_url))
            throw new Error('url is not a URL');
        if (!string_1.default.notEmpty(openid)) {
            throw new Error('openid 不能为空');
        }
        if (!string_1.default.notEmpty(description)) {
            throw new Error('description 不能为空');
        }
        let outTradeNo = (out_trade_no || '') + '';
        if (out_trade_no) {
            if (!string_1.default.notEmpty(out_trade_no)) {
                outTradeNo = undefined;
            }
        }
        const amount = +amount_total;
        if (!Number.isInteger(amount) || amount < 1) {
            throw new Error('amount_total 单位为分，需为大于等于1的正整数');
        }
        const data = {
            openid,
            app_id: __classPrivateFieldGet(this, _Mbdpay_app_id, "f"),
            description,
            amount_total: amount,
            out_trade_no: outTradeNo,
            callback_url
        };
        const sign = this.sign(data);
        if (!sign)
            throw new Error('签名错误');
        return wxJSAPI_1.wxJSAPI(Object.assign(data, { sign }));
    }
    async query(args) {
        const { out_trade_no } = args;
        let outTradeNo = (out_trade_no || '') + '';
        if (!string_1.default.notEmpty(out_trade_no)) {
            outTradeNo = undefined;
        }
        if (!out_trade_no) {
            throw new Error('out_trade_no 不能为空');
        }
        const data = {
            app_id: __classPrivateFieldGet(this, _Mbdpay_app_id, "f"),
            out_trade_no: outTradeNo
        };
        const sign = this.sign(data);
        if (!sign)
            throw new Error('签名错误');
        return query_1.query(Object.assign(data, { sign }));
    }
    async refund(args) {
        const { order_id } = args;
        let orderId = (order_id || '') + '';
        if (!string_1.default.notEmpty(orderId)) {
            orderId = undefined;
        }
        if (!orderId) {
            throw new Error('order_id 不能为空');
        }
        const data = {
            app_id: __classPrivateFieldGet(this, _Mbdpay_app_id, "f"),
            order_id: orderId
        };
        const sign = this.sign(data);
        if (!sign)
            throw new Error('签名错误');
        return refund_1.refund(Object.assign(data, { sign }));
    }
}
_Mbdpay_app_id = new WeakMap(), _Mbdpay_app_key = new WeakMap();
module.exports = Mbdpay;
