class BizError extends Error {
    constructor(code, msg, meta) {
        super(msg);
        this.code = undefined;
        this.meta = undefined;
        this.name = "bizError"; // (2)
        this.code = code;
        this.meta = meta;
    }
}
const err = new BizError(1001, 'err message', { a: 1 });
console.log(err);
