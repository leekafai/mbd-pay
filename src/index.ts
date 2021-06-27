import stringFunc from "./util/string"
import { getOpenid } from "./api/openid"
import signCrypto from "./lib/crypto"
import { wxH5 } from "./api/wxH5"
import { aliPay } from "./api/alipay"
import isUrl from "is-url"
import { wxJSAPI } from "./api/wxJSAPI"
import { query } from "./api/query"
import { refund } from "./api/refund"
interface mbdpayOptions {
  app_id: string,
  app_key: string
}
interface wechatGetOpenidArgs {
  target_url: string
}
interface wechatH5Args {
  description: string,
  amount_total: number,
  out_trade_no?: string
}
interface alipayArgs {
  url: string,
  description: string,
  amount_total: number,
  out_trade_no?: string,
  callback_url?: string
}

interface wechatJSAPIArgs {
  openid: string,
  description: string,
  amount_total: number,
  out_trade_no?: string,
  callback_url: string
}
interface queryArgs {
  out_trade_no: string | number
}

interface refundArgs {
  order_id: string
}
class Mbdpay {
  #app_id: string = undefined
  #app_key: string = undefined
  constructor(opts: mbdpayOptions) {
    const { app_id, app_key } = opts
    if (!stringFunc.notEmpty(app_id)) {
      throw new Error('app_id invalid')
    }
    if (!stringFunc.notEmpty(app_key)) {
      throw new Error('app_key invalid')
    }
    this.#app_id = app_id
    this.#app_key = app_key
  }
  get app_id() {
    return this.#app_id
  }
  get app_key() {
    return this.#app_key
  }
  async wechatGetOpenid(args: wechatGetOpenidArgs) {

    const { target_url } = args
    if (!stringFunc.notEmpty(target_url)) {
      throw new Error('target_url 不能为空')
    }
    return getOpenid(target_url, this.#app_id)

  }
  sign(data: { [key: string]: string | number | null | undefined }) {
    try {
      let dataFiltered: { [key: string]: string | number } = {}
      let hasData = 0
      Object.keys(data).filter((key) => {
        return (data[key] !== null && data[key] !== undefined)
      }).forEach((key) => {
        dataFiltered[key] = data[key]
        hasData++
      })
      if (!hasData) {
        throw new Error('签名数据存在错误')
      }

      return signCrypto(dataFiltered, this.#app_key)
    } catch (err) {
      console.error(err)

    }

  }
  async wechatH5(args: wechatH5Args) {
    const { description, amount_total, out_trade_no } = args
    if (!stringFunc.notEmpty(description)) {
      throw new Error('description 不能为空')
    }
    const amount = +amount_total
    if (!Number.isInteger(amount) || amount < 1) {
      throw new Error('amount_total 单位为分，需为大于等于1的正整数')
    }

    let outTradeNo: string = (out_trade_no || '') + ''
    if (out_trade_no) {
      if (!stringFunc.notEmpty(out_trade_no)) {
        outTradeNo = undefined
      }
    }

    const data = {
      app_id: this.#app_id,
      description,
      amount_total: amount,
      out_trade_no: outTradeNo
    }

    const sign = this.sign(data)
    if (!sign) throw new Error('签名错误')
    return wxH5(Object.assign(data, { sign }))
  }
  async alipay(args: alipayArgs) {
    const { url: customUrl, description, amount_total, out_trade_no, callback_url } = args

    if (!isUrl(customUrl)) throw new Error('url is not a URL')

    if (callback_url && !isUrl(callback_url)) throw new Error('callback_url is not a URL')

    const amount = +amount_total
    if (!Number.isInteger(amount) || amount < 1) {
      throw new Error('amount_total 单位为分，需为大于等于1的正整数')
    }

    let outTradeNo: string = (out_trade_no || '') + ''
    if (out_trade_no) {
      if (!stringFunc.notEmpty(out_trade_no)) {
        outTradeNo = undefined
      }
    }

    if (!stringFunc.notEmpty(description)) {
      throw new Error('description 不能为空')
    }

    const data = {
      app_id: this.#app_id,
      url: customUrl,
      description,
      amount_total: amount,
      out_trade_no: outTradeNo,
      callback_url
    }
    const sign = this.sign(data)
    if (!sign) throw new Error('签名错误')
    return aliPay(Object.assign(data, { sign }))
  }

  async wechatJSAPI(args: wechatJSAPIArgs) {
    const { openid, description, amount_total, out_trade_no, callback_url } = args

    if (!isUrl(callback_url)) throw new Error('url is not a URL')


    if (!stringFunc.notEmpty(openid)) {
      throw new Error('openid 不能为空')
    }

    if (!stringFunc.notEmpty(description)) {
      throw new Error('description 不能为空')
    }

    let outTradeNo: string = (out_trade_no || '') + ''
    if (out_trade_no) {
      if (!stringFunc.notEmpty(out_trade_no)) {
        outTradeNo = undefined
      }
    }

    const amount = +amount_total
    if (!Number.isInteger(amount) || amount < 1) {
      throw new Error('amount_total 单位为分，需为大于等于1的正整数')
    }

    const data = {
      openid,
      app_id: this.#app_id,
      description,
      amount_total: amount,
      out_trade_no: outTradeNo,
      callback_url
    }

    const sign = this.sign(data)
    if (!sign) throw new Error('签名错误')
    return wxJSAPI(Object.assign(data, { sign }))

  }

  async query(args: queryArgs) {
    const { out_trade_no } = args

    let outTradeNo: string = (out_trade_no || '') + ''

    if (!stringFunc.notEmpty(out_trade_no)) {
      outTradeNo = undefined
    }

    if (!out_trade_no) {
      throw new Error('out_trade_no 不能为空')
    }
    const data = {
      app_id: this.#app_id,
      out_trade_no: outTradeNo
    }

    const sign = this.sign(data)
    if (!sign) throw new Error('签名错误')
    return query(Object.assign(data, { sign }))
  }

  async refund(args: refundArgs) {
    const { order_id } = args

    let orderId: string = (order_id || '') + ''

    if (!stringFunc.notEmpty(orderId)) {
      orderId = undefined
    }

    if (!orderId) {
      throw new Error('order_id 不能为空')
    }
    const data = {
      app_id: this.#app_id,
      order_id: orderId
    }

    const sign = this.sign(data)
    if (!sign) throw new Error('签名错误')
    return refund(Object.assign(data, { sign }))
  }
}

export = Mbdpay