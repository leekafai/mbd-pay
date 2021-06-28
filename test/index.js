require('./dotenv')
const Mbdpay = require('../dist')
const mbdPay = new Mbdpay({
  app_id: process.env['app_id'],
  app_key: process.env['app_key']
})
console.log(mbdPay.app_id)
console.log(mbdPay.app_key)

const aliPay = async () => {
  const r = await mbdPay.alipay({
    url: 'http://somewhere.com', description: 'test', amount_total: 1
  })
  console.log(r, 'alipay')
}
const query = async (out_trade_no) => {
  const r = await mbdPay.query({
    out_trade_no
  })
  console.log(r, 'query')
}

const wechatH5 = async () => {
  const r = await mbdPay.wechatH5({
    description: "test", amount_total: 1
  })
  console.log(r, 'wechatH5')
}

const wechatJSAPI = async () => {
  const r = await mbdPay.wechatJSAPI({
    openid: "xxx",
    callback_url: "https://somewhere.com",
    description: "test", amount_total: 1
  })
  console.log(r, 'wechatJSAPI')
}

const refund = async (order_id) => {
  const r = await mbdPay.refund({
    order_id
  })
  console.log(r, 'refund')
}
const run = async () => {
  // await aliPay()
  await query('11a095036cc0da383031bce8bed8b023')
  // await refund('11a095036cc0da383031bce8bed8b023')
}
run()