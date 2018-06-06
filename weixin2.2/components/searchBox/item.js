// components/searchBox/searchBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword:{
      type:String,
      observer: function (newVal, oldVal) {
        this.setData({
          searchdata: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchIcon: "./image/search.png",
    qrCodeIcon: "./image/saoyisao.png",
    searchdata: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取输入框的值
    searchInput:function(e){
      this.setData({
        searchdata:e.detail.value
      })
    },
    search:function(e){
      this.triggerEvent("searchevent", this.data.searchdata)
    }
  }
})
