// pages/mine/wdqb/recharge.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fAmount: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '充值',
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
   * 支付接口
   */
  ToPay: function(options) {
    var that = this
    var openid = app.globalData.fOpenID
    wx.request({
      url: app.globalData.posturl + 'zzsc/wxPay.do', //url 不能出现端口号
      data:{
        fAmount: that.data.fAmount,
        fCustomerID: app.globalData.userInfo.fCustomerID,
        fUserID: app.globalData.userInfo.fUserID,
        openId: app.globalData.fOpenID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.requestPayment(
          {
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.noncestr,
            'package': 'prepay_id=' + res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            'success': function (res2) { 
              console.log(res.data)
              wx.request({
                url: app.globalData.posturl + 'app/home/pay/success.do', //url 不能出现端口号
                data:{

                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  that.setData({
                    itemlist: res.data.data.list,
                    topbg: res.data.data.topBgUrl
                  })
                },
                method: 'GET'
              });
            },
            'fail': function (res2) {
              console.log(res2.data)
            },
            'complete': function (res2) { }
          })
      },
      method: 'GET'
    });
    
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
  
  }, 
  InputChange: function (e) {
    this.setData({
      fAmount:e.detail.value
    })
    console.log(this.data.fAmount)
  }

})