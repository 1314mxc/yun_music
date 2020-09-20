Page({
  data: {
  },
  start:function(e) {
    this.startTime = e.timeStamp;
  },
  end:function(e) {
    this.endTime = e.timeStamp;
  },
  click:function(e) {
    if (this.endTime - this.startTime > 1250) {
      wx.switchTab({
        url: '/pages/playlist/playlist',
      })
    }else{
      wx.showToast({
        title: '未点亮哦，请长按',
        icon:'none',
        duration:900
      })
    }
  },
})