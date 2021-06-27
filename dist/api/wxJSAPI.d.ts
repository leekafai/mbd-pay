interface wxPrepayParams {
    openid: string;
    app_id: string;
    description: string;
    amount_total: number;
    out_trade_no?: string;
    callback_url: string;
    sign: string;
}
export interface response {
    appId?: string;
    timeStamp?: string;
    nonceStr?: string;
    package?: string;
    signType?: string;
    paySign?: string;
    error?: string;
}
declare const wxJSAPI: (arg: wxPrepayParams) => Promise<response>;
export { wxJSAPI };
