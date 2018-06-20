// pages/mine/wdqb/bill/index.js
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
  }
})