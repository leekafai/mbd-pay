declare class BizError extends Error {
    code: number;
    meta: any;
    constructor(code: number, msg: string, meta: any);
}
declare const err: BizError;
