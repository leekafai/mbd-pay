interface wxPrepayParams {
    channel?: 'h5';
    app_id: string;
    description: string;
    amount_total: number;
    out_trade_no?: string;
    sign: string;
}
export interface response {
    h5_url?: string;
    error?: string;
}
declare const wxH5: (params: wxPrepayParams) => Promise<response>;
export { wxH5 };
