- [x] wechat JSAPI
- [x] wechat H5
- [x] wechat openid
- [x] alipay
- [x] query
- [x] refund


install
```
npm i @leekafai/mbd-pay
```

usage
```javascript
const Mbdpay=require('Mbdpay')
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

```