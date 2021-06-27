class BizError extends Error {
  code: number = undefined
  meta: any = undefined
  constructor(code: number, msg: string, meta: any) {
    super(msg)
    this.name = "bizError"; // (2)
    this.code = code
    this.meta = meta
  }
}

const err = new BizError(1001, 'err message', { a: 1 })
console.log(err)