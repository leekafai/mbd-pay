import crypto from "crypto"
import strFunc from "./string"
const makeMD5 = (str: string) => {
  if (!strFunc.notEmpty(str)) {
    throw new Error('string invalid')
  }
  return crypto.createHash('MD5').update(str).digest('hex')
}

export default makeMD5