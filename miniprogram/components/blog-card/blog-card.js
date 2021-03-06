// components/blog-card/blog-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog:Object
  },

  // 监听器
  observers:{
    ['blog.createTime'](time){
      this.setData({
        _createTime: time.split('T')[0]+' '+time.split('T')[1].split('.')[0]
      })
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(event) {
      const ds = event.target.dataset
      wx.previewImage({
        urls: ds.imgs,
        current: ds.imgsrc,
      })
    },
  }
})
