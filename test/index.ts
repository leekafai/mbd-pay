import "./dotenv"
import Mbdpay from "../src"

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
const query = async () => {
  const r = await mbdPay.query({
    out_trade_no: 'xxx'
  })
  console.log(r, 'query')
}

const wechatH5 = async () => {
  const r = await mbdPay.wechatH5({
    description: "test", amount_total: 1
  })
  console.log(r, 'query')
}

const wechatJSAPI = async () => {
  const r = await mbdPay.wechatJSAPI({
    openid: "xxx",
    callback_url: "https://somewhere.com",
    description: "test", amount_total: 1
  })
  console.log(r, 'query')
}
const run = async () => {
  // const r = await mbdPay.wechatGetOpenid({
  //   target_url: 'https://baidu.com'
  // })
  // console.log(r, 'r')

  // const x = await aliPay()
  // setInterval(async () => {
  //   const y = await query()
  // }, 1e4)
  // const x1 = await wechatH5()
  const x2 = await wechatJSAPI()
}
run()