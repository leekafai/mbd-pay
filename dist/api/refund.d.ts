interface wxPrepayParams {
    order_id: string;
    app_id: string;
    sign: string;
}
export interface response {
    code?: string;
    info?: string;
    error?: string;
}
declare const refund: (arg: wxPrepayParams) => Promise<response>;
export { refund };
