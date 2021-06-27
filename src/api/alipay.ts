import axios from "axios"
import isUrl from "is-url"
const url = 'https://api.mianbaoduo.com/release/alipay/pay'

export interface wxPrepayParams {
  url: string,
  app_id: string,
  description: string,
  amount_total: number,
  out_trade_no?: string,
  callback_url?: string,
  sign: string
}

export interface response {
  body?: string,
  error?: string

}


const aliPay = async (arg: wxPrepayParams) => {
  const { url: customUrl, app_id, description, amount_total, out_trade_no, sign, callback_url } = arg

  const response = await axios
    .post(
      url,
      {
        url: customUrl, app_id, description, amount_total, out_trade_no, sign, callback_url
      }
    )
  const data: response = response.data
  return data
}

export { aliPay }