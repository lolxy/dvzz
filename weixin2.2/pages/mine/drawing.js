// pages/mine/drawing.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgList: ['../../image/default-img.png', '../../image/jzal.png','../../image/qwdz.png'],
    curretimg:0,
    totleimage: 3,
    TouchOrigin: 0,
    TouchMove: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的图纸',
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  /**
   * 页面相关事件处理函数--StartF
   */
  StartF: function (e) {
    var that = this
    that.setData({
      TouchOrigin: e.touches[0].pageX,
    })
  },
  /**
   * 页面相关事件处理函数--EndF
   */
  EndF: function (e) {
    var that = this
    that.setData({
      TouchMove: e.changedTouches[0].pageX,
    })
    if (that.data.TouchOrigin - that.data.TouchMove <= -40 && that.data.curretimg > 0 ) {
      that.setData({
        curretimg: that.data.curretimg - 1
      })
    } else if (that.data.TouchOrigin - that.data.TouchMove > 40 && that.data.curretimg < that.data.ImgList.length -1){
      that.setData({
        curretimg: that.data.curretimg + 1
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})