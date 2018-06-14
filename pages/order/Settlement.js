// pages/order/Settlement.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fAmount: 0,
    nocash: 1,
    userInfo: {},
    cash: 0,
    orderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      fAmount: options.TotleAccont,
      orderlist: options.OIDList
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
    this.GetCashData()
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
  
  },
  GetCashData:function(){
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/wallet.do', //url 不能出现端口号
      data: { 
        fCustomerID: app.globalData.fCustomerID,
        fUserID: app.globalData.userInfo.fUserID, 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          cash: res.data.data.fAmount ? res.data.data.fAmount : 500   //500为测试数据
        })
      },
      method: 'GET'
    });
  },
  TocashiPay: function () {
    var that= this
    if (that.data.fAmount > that.data.cash) {
      wx.showModal({
        content: '对不起，您的零钱不足，请先充值，或选择其他支付方式',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../mine/wdqb/recharge',
              success: function (res) {
              }
            })
          } else if (res.cancel) {
            
          }
        }
      })
    }else {
      console.log(that.data.orderlist + "啊" + that.data.fAmount + '水电费' + app.globalData.userInfo.fUserID)
      wx.request({
        url: app.globalData.posturl + 'app/home/pay/success.do', //url 不能出现端口号
        data: {
          fSaleOrderID: that.data.orderlist,
          fAmount: that.data.fAmount,
          flag: 0,
          fUserID: app.globalData.userInfo.fUserID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
        },
        method: 'GET'
      });
    }
  },
  TowxPay: function(){
    var openid = app.globalData.fOpenID
    var that = this
    wx.request({
      url: app.globalData.posturl + 'zzsc/wxPay.do', //url 不能出现端口号
      //url: 'http://dwzs.4kb.cn/APPDWERP/zzsc/wxPay.do', //url 不能出现端口号
      data: {
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
            'appId': app.globalData.appid,
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            'success': function (res2) {
              console.log(res.data)
              wx.request({
                url: app.globalData.posturl + 'app/home/pay/success.do', //url 不能出现端口号
                data: {
                  fAmount: that.data.fAmount,
                  flag: 1,
                  fUserID: app.globalData.userInfo.fUserID
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 1000
                  })
                  wx.navigateBack({})
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
  }
})