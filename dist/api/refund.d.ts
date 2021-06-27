interface wxPrepayParams {
    order_id: string;
    app_id: string;
    sign: string;
}
interface successRes {
    code?: string;
    info?: string;
    error?: string;
}
declare const wxJSAPI: (arg: wxPrepayParams) => Promise<successRes>;
export default wxJSAPI;
