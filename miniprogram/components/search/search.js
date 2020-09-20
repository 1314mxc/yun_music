// components/search/search.js
let keyword=''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:'请输入关键字(左边按钮为发布短文)'
    },
    button:{
      type:String,
      value:'false'
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
    onInput(event){
      keyword=event.detail.value
      this.triggerEvent('search',{
        keyword
      })
    },
  }
})
