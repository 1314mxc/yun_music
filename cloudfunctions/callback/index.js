import { init, DYNAMIC_CURRENT_ENV, getWXContext, openapi } from 'wx-server-sdk'

init({
  // API 调用都保持和云函数当前所在环境一致
  env: DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
export async function main(event, context) {

  console.log(event)

  const { OPENID } = getWXContext()

  const result = await openapi.customerServiceMessage.send({
    touser: OPENID,
    msgtype: 'text',
    text: {
      content: '收到：' + event.Content,
    }
  })

  console.log(result)

  return result
}
