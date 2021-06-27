import "./dotenv"
import { getOpenid } from "../../src/api/openid"

const run = async () => {
  const data = await getOpenid("https://www.mbd.pub/dev", process.env['app_id'])
  console.log(data)
}
run()