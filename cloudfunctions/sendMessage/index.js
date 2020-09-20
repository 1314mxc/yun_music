// 云函数入口文件
import { init, getWXContext, openapi } from 'wx-server-sdk'

init()

// 云函数入口函数
export async function main(event, context) {
  const {OPENID}=getWXContext()
  const result = await openapi.subscribeMessage.send({
    touser: OPENID,
    page:`/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
    data: {
      thing3: {
        value: event.content
      },
      name2: {
        value: '你'
      }
    },
    templateId: '1JuWBK6zRdN8rJm5T6hPQqCDKwoGxhj13Scbf57Jbq0'
  })
  return result
}