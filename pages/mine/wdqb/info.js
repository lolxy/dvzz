// pages/mine/wdqb/info.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fAmount:0,
    Cash_Icon:'../../../image/mine/default-img.png',
    nocash:1,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的钱包',
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
  //获取余额
  GetData: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/wallet.do', //url 不能出现端口号
      data: {
        fUserID: app.globalData.userInfo.fUserID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.fAmount){
          that.setData({
            fAmount: res.data.data.fAmount, //待修改
            nocash: 1
          })
        }else {
          that.setData({
            nocash:0 //待修改
          })
        }
      },
      method: 'GET'
    });
  },
  /**
   * 充值跳转
   */
  ToRecharge: function (e) {
    wx.navigateTo({
      url: 'recharge',
      success: function (res) {      
      }
    })
  },

  /**
   * 消费账单跳转
   */
  ToBill: function (e) {
    var that=this
    wx.navigateTo({
      url: 'bill?fUserID=' + app.globalData.userInfo.fUserID +'&num='+0,
      success: function (res) {    
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.GetData()
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