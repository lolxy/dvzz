// components/productItem/productItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    displayType:{
      type:String
    },
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadimg:'./image/loadimg.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoPage: function (e) {
      wx.navigateTo({
        url: `/pages/main/mall/detail/index?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
      })
    }
  }
})
