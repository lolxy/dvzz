// pages/index/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: 0.0,
    lng: 0.0,
    markers: [{
      iconPath: '../../image/local.png',
      id: 0,
      latitude: 0.0,
      longitude: 0.0,
      width: 16,
      height: 20,
      title: '泉州东海香缤店'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lat: options.lat,
      lng: options.lng,
      'markers[0].latitude': options.lat,
      'markers[0].longitude': options.lng,
      'markers[0].title': options.add,
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
  markertap: function() {
    wx.openLocation({
      
    })
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