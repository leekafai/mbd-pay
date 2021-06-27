import axios from "axios"
import isUrl from "is-url"
const url = 'https://api.mianbaoduo.com/release/main/search_order'

interface wxPrepayParams {
  out_trade_no: string,
  app_id: string,
  sign: string
}

export interface response {
  order_id?: string,
  charge_id?: string,
  description?: string,
  share_id?: string,
  share_state?: number,
  amount?: number,
  state?: number,
  create_time?: number,
  payway?: number,
  refund_state?: number,
  refund_amount?: number,
  plusinfo?: { [key: string]: any }
  error?: string

}

/**
 * 
 * 查询订单
 */
const query = async (arg: wxPrepayParams) => {
  const { app_id, out_trade_no, sign } = arg

  const response = await axios
    .post(
      url,
      {
        app_id, out_trade_no, sign
      }
    )
  const data: response = response.data

  return data
}

export { query }