import axios from "axios"
import isUrl from "is-url"
const host = 'https://mbd.pub/openid'

type HTMLString = string

const getOpenid = async (target_url: string, app_id: string): Promise<HTMLString> => {
  if (
    typeof target_url !== "string" ||
    !isUrl(target_url)
  ) {
    throw new Error("target_url is not a URL")
  }
  if (typeof app_id !== 'string' || !app_id.length) {
    throw new Error("app_id invalid")
  }
  const response = await axios.get(host, {
    params: {
      target_url, app_id
    }
  })
  return response.data
}
export { getOpenid }