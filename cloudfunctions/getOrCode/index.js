// 云函数入口文件
import { init, getWXContext, openapi, uploadFile } from 'wx-server-sdk'

init()

// 云函数入口函数
export async function main(event, context) {
  const wxContext = getWXContext()

  try {
    const result = await openapi.wxacode.getUnlimited({
        scene: wxContext.OPENID,
        // page:'pages/blog/blog'
        lineColor:{
          'r':211,
          'g':60,
          'b':57
        },
        isHyaline:true
      })
      const upload=await uploadFile({
        cloudPath:'qrcode/'+Date.now()+'-'+Math.random()+'.png',
        fileContent:result.buffer
      })
    return upload.fileID
  } catch (err) {
    return err
  }
}