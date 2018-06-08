// components/searchBox/searchBox.js
const api = require('../../utils/api.js');

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
    // 搜索功能
    search:function(e){
      this.triggerEvent("searchevent", this.data.searchdata)
    },
    // 扫码功能
    scanCode: function () {
      wx.scanCode({
        success: function (res) {
          if (res.result) {
            api.getScanCode({
              data: {
                fMatCode: res.result
              },
              success: (res) => {
                if (res.data.data.fMatID) {
                  wx.navigateTo({
                    url: '/pages/main/detail/index?fMatID=' + res.data.data.fMatID
                  })
                } else {
                  wx.showToast({
                    title: '扫码有误，请重新扫码！',
                    icon: 'none'
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})
