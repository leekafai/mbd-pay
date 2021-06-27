interface wxPrepayParams {
    out_trade_no: string;
    app_id: string;
    sign: string;
}
export interface response {
    order_id?: string;
    charge_id?: string;
    description?: string;
    share_id?: string;
    share_state?: number;
    amount?: number;
    state?: number;
    create_time?: number;
    payway?: number;
    refund_state?: number;
    refund_amount?: number;
    plusinfo?: {
        [key: string]: any;
    };
    error?: string;
}
/**
 *
 * 查询订单
 */
declare const query: (arg: wxPrepayParams) => Promise<response>;
export { query };
