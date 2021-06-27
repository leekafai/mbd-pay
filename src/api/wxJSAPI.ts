import axios from "axios"
import isUrl from "is-url"
const url = 'https://api.mianbaoduo.com/release/wx/prepay'

interface wxPrepayParams {
  openid: string,
  app_id: string,
  description: string,
  amount_total: number,
  out_trade_no?: string,
  callback_url: string,
  sign: string
}

export interface response {
  appId?: string,
  timeStamp?: string,
  nonceStr?: string,
  package?: string,
  signType?: string,
  paySign?: string
  error?: string
}


const wxJSAPI = async (arg: wxPrepayParams) => {
  const { openid, app_id, description, amount_total, out_trade_no, callback_url, sign } = arg
  const response = await axios
    .post(
      url,
      {
        openid, app_id, description, amount_total, out_trade_no, callback_url, sign
      }
    )
  const data: response = response.data
  return data
}

export { wxJSAPI }