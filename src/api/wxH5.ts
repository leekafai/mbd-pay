import axios from "axios"
const url = 'https://api.mianbaoduo.com/release/wx/prepay'

interface wxPrepayParams {
  channel?: 'h5',
  app_id: string,
  description: string,
  amount_total: number,
  out_trade_no?: string,
  sign: string
}

export interface response {
  h5_url?: string,
  error?: string


}


const wxH5 = async (params: wxPrepayParams) => {
  const { app_id, description, amount_total, out_trade_no, sign } = params
  const response = await axios
    .post(
      url,
      {
        app_id, description, amount_total, out_trade_no, sign
      }
    )
  const data: response = response.data
  return data
}

export { wxH5 }