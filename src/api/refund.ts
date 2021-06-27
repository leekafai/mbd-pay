import axios from "axios"
import isUrl from "is-url"
const url = 'https://api.mianbaoduo.com/release/main/refund'

interface wxPrepayParams {
  order_id: string,
  app_id: string,
  sign: string
}

interface successRes {
  code?: string,
  info?: string,
  error?: string

}


const wxJSAPI = async (arg: wxPrepayParams) => {
  const { order_id, app_id, sign } = arg

  const response = await axios
    .post(
      url,
      {
        order_id, app_id, sign
      }
    )
  const data: successRes = response.data
  return data
}

export default wxJSAPI