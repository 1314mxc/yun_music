// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const axios=require('axios')

const URL='https://apis.imooc.com/personalized?icode=99D31C3FA331AE8C'

const playlistCollection = db.collection('playlist')

const MAX_LIMIT = 100

// 云函数入口函数
export async function main(event, context) {
  // const list = await playlistCollection.get()
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  const plRes=await axios.get(URL)
  const playlist=plRes.data.result

  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }

  for (let i = 0, len = newData.length; i < len; i++) {
      await playlistCollection.add({
        data: {
          ...newData[i],
          createTime: db.serverDate(),
        }
      }).then((res) => {
        console.log('插入成功')
      }).catch((err) => {
        console.error('插入失败')
      })
    
  }

  return newData.length
}