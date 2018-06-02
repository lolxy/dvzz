// pages/mine/suite.js
//const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SuiteList: [{
      ItemName: '新天城市广场1#2306',
      IsDefault: true,
      DetailAdrass: '福建省泉州市鲤城区笋江路嘉龙尚城(笋江花园城东100米)'
    },{
      ItemName: '霞福村东区-36号楼',
      IsDefault: false,
      DetailAdrass: '福建省泉州市晋江市霞福村东区33号楼(古塔路南)'
    },{
      ItemName: '恒达利商务大厦',
      IsDefault: false,
      DetailAdrass: '泉州市晋江市泉安北路912'
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的套房',
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