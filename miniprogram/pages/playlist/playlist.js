const MAX_LIMIT=15
Page({
  data: {
    view_list:[['耿耿于怀，','只能让别人扰乱了你的心，','阻挡你的脚步，','而让你停滞在愤怒或者不安中，','惴惴不安地生活。','也许，','我们对这些不屑一顾。','但是，','生活，','就是让自己快乐。'],['你必须很努力，','才能看上去毫不费力。','所以，','放下你的浮躁，','放下你的懒惰，','放下你的三分钟热度，','放空你禁不住诱惑的大脑，','放开你容易被任何事物吸引的眼睛，','静下心来好好做你该做的事，','该好好努力了！'],['如今很多人都很羡慕那些一夜爆红，','一举成名，','那些所谓的成功人士。','其实这个世界上从来没有一蹴而就的成功，','如果没有踏实的努力，','没有点滴的积累，','再好的运气降落到你头上时，','你也没有接住它的实力。','早安！','与您共勉。'],['人生这几十载，','也就在这经历磨难与折磨之间，','才能完成历练和成长，','成就生命的厚重，','完成和烦恼的较量，','有个词叫做化茧成蝶，','只有在苦难中突围，','而不是让自己的固执把自己憋死在茧里。','用一种宽阔的信念指引生活，','让它完成对生命的改变。']],
    view_lists:[],
    swiperImgUrls:[],
    playlist:[],
    tabs:'read',
    current:0
  },
  onShow: function () {
    this._getPlaylist()
    
    let view_lists=this.data.view_list[Math.floor(Math.random()*this.data.view_list.length)]
      this.setData({
        view_lists
      })
    setInterval(()=>{
      let view_lists=this.data.view_list[Math.floor(Math.random()*this.data.view_list.length)]
      this.setData({
        view_lists
      })
    },3000)
  },
  onPullDownRefresh: function () {
    if(this.data.tabs == "listen"){
      this.setData({
        playlist:[]
      })
      this._getPlaylist()
    }else{
      return;
    }
  },
  onReachBottom: function () {
    if(this.data.tabs == "listen"){
      this._getPlaylist()
    }else{
      return;
    }
  },
  _getPlaylist(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        $url:'swiperlist'
      }
    }).then((res)=>{
      this.setData({
        swiperImgUrls:res.result.data
      })
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url:'playlist'
      }
    }).then((res) => {
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
  read:function(){
    this.setData({
      tabs:'read',
      current:0
    })
  },
  listen:function(){
    this.setData({
      tabs:'listen',
      current:1
    })
  },
  swiper_change:function(e){
    let _this = this;
    if(e.detail.current == 0){
      _this.setData({
        tabs:'read'
      })
    }
    if(e.detail.current == 1){
      _this.setData({
        tabs:'listen'
      })
    }
  }
})