// 云函数入口文件
import { init } from 'wx-server-sdk'

import TcbRouter from 'tcb-router'

init()

// 云函数入口函数
export async function main(event, context) {
  const app=new TcbRouter({event})

  app.use(async(ctx,next)=>{
    ctx.data={}
    ctx.data.openId=event.userInfo.openId
    await next()
  })

  app.router('music', async(ctx, next) => {
    // console.log('进入音乐名称中间件')
    ctx.data.musicName = '数鸭子'
    await next()
    // console.log('退出音乐名称中间件')
  }, async(ctx, next) => {
    // console.log('进入音乐类型中间件')
    ctx.data.musicType = '儿歌'
    ctx.body = {
      data: ctx.data
    }
    // console.log('退出音乐类型中间件')
  })

  app.router('movie', async(ctx, next) => {
    // console.log('进入电影名称中间件')
    ctx.data.movieName = '千与千寻'
    await next()
    // console.log('退出电影名称中间件')
  }, async(ctx, next) => {
    // console.log('进入电影类型中间件')
    ctx.data.movieType = '日本动画片'
    ctx.body = {
      data: ctx.data
    }
    // console.log('退出电影类型中间件')
  })

  return app.serve()
}