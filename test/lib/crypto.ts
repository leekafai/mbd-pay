import crypto from "../../src/lib/crypto"

const md5 = crypto(
  {
    app_id: 12345,
    amount_total: 1,
    out_trade_no: 123123123123
  },
  'testKey'
)
console.log(md5)