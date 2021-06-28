interface mbdpayOptions {
    app_id: string;
    app_key: string;
}
interface wechatGetOpenidArgs {
    target_url: string;
}
interface wechatH5Args {
    description: string;
    amount_total: number;
    out_trade_no?: string;
}
interface alipayArgs {
    url: string;
    description: string;
    amount_total: number;
    out_trade_no?: string;
    callback_url?: string;
}
interface wechatJSAPIArgs {
    openid: string;
    description: string;
    amount_total: number;
    out_trade_no?: string;
    callback_url: string;
}
interface queryArgs {
    out_trade_no: string | number;
}
interface refundArgs {
    order_id: string;
}
declare class Mbdpay {
    #private;
    constructor(opts: mbdpayOptions);
    get app_id(): string;
    get app_key(): string;
    wechatGetOpenid(args: wechatGetOpenidArgs): Promise<string>;
    sign(data: {
        [key: string]: string | number | null | undefined;
    }): string;
    wechatH5(args: wechatH5Args): Promise<import("./api/wxH5").response>;
    alipay(args: alipayArgs): Promise<import("./api/alipay").response>;
    wechatJSAPI(args: wechatJSAPIArgs): Promise<import("./api/wxJSAPI").response>;
    query(args: queryArgs): Promise<import("./api/query").response>;
    refund(args: refundArgs): Promise<import("./api/refund").response>;
}
export = Mbdpay;
