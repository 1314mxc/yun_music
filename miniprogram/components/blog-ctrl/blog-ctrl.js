// components/blog-ctrl/blog-ctrl.js
let userInfo={}
const db=wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object
  },
  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],

  /**
   * 组件的初始数据
   */
  data: {
    loginShow:false,
    modalShow:false,
    content:'',
    req:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(){
      wx.getSetting({
        complete: (res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              complete: (res) => {
                userInfo=res.userInfo
                this.setData({
                  modalShow:true
                })
              },
            })
          }else{
            this.setData({
              loginShow:true
            })
          }
        },
      })
    },
    onLoginsuccess(event){
      userInfo=event.detail
      this.setData({
        loginShow:false
      },()=>{
        this.setData({
          modalShow:true
        })
      })
    },
    onLoginfail(){
      wx.showModal({
        title:'授权用户才能进行评价',
        content:''
      })
    },
    onSend(event){
      if(!this.data.req){
        var that=this
        wx.requestSubscribeMessage({
          tmplIds: ['1JuWBK6zRdN8rJm5T6hPQqCDKwoGxhj13Scbf57Jbq0'],
          success(res) {
            that.setData({
              req:true
            })
          },
          fail(err) { console.log(err)}
        })
      }else{
        let formId=event.detail.formId
      let content=event.detail.value.content
      if(content.trim()==''){
        wx.showModal({
          title:'评论内容不能为空',
          content:''
        })
        return
      }
      wx.showLoading({
        title: '评价中...',
        mask:true
      })
      db.collection('blog-comment').add({
        data:{
          content,
          createTime:db.serverDate(),
          blogId:this.properties.blogId,
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl
        }
      }).then((res)=>{

        
        
            wx.cloud.callFunction({
              name:'sendMessage',
              data:{
                content,
                blogId:this.properties.blogId
              }
            }).then((res)=>{
              console.log(res)
            })

        wx.hideLoading()
        wx.showToast({
          title: '评论成功！',
        })
        this.setData({
          modalShow:false,
          content:''
        })

        // 父元素刷新评论
        this.triggerEvent('refreshCommentList')
      })
      }


      


    },
  }
})
