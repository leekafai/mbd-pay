export interface wxPrepayParams {
    url: string;
    app_id: string;
    description: string;
    amount_total: number;
    out_trade_no?: string;
    callback_url?: string;
    sign: string;
}
export interface response {
    body?: string;
    error?: string;
}
declare const aliPay: (arg: wxPrepayParams) => Promise<response>;
export { aliPay };
