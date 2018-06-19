// pages/mine/wdqb/bill.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BillList:[],
    url:'https://www.dovzs.com/APPDWERP/app/fi/stream.do',
    num:0,
    fUserID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title: '消费账单',
    })
    that.setData({
      fUserID: '?fUserID=' + options.fUserID,
      num: '&num=' + options.num,
    })
  },
  //获取余额
  GetData: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/stream.do', //url 不能出现端口号
      data: {
        fUserID: app.globalData.userInfo.fUserID,
        //fUserID: 'ff808081633a37d401633e7e34110270',
        num:0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          BillList: res.data.data
        })
      },
      method: 'GET'
    });
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
    this.GetData()
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