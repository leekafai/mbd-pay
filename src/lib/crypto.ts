import makeMD5 from "../util/md5";
import strFunc from "../util/string"
interface data {
  [key: string]: string | number | undefined | null
}
const crypto = (data: data, app_key: string) => {
  if (!strFunc.notEmpty(app_key)) {
    throw new Error('app_key invalid')
  }
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    throw new Error('data is not an object')
  }
  const keys = Object.keys(data).sort()
  if (!keys.length) throw new Error('data is an empty object')
  const strTemp = keys.map((key) => {
    return `${key}=${data[key]}`
  }).join('&') + `&key=${app_key}`
  return makeMD5(strTemp)
}

export default crypto