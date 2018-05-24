// pages/index/station.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StutPic: '../../image/default-img.png',
    ShopIcon: '../../image/shopicon.png',
    CallIcon: '../../image/callicon.png',
    NaviIcon: '../../image/navicon.png',
    AppraiseIcon: '../../image/AppraiseIcon.png',
    CurrentType: 0,
    downimgurl: '../../image/px2.png',
    upimgurl: '../../image/px3.png',
    unknownimgurl: '../../image/px1.png',
    isNormal: '0',
    distance: '0',
    page: 0,
    lat: 0,
    lng: 0,
    itemdetail:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '自装服务站',
    })
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        })
      }
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.getdata()
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
     * 监听点击事件--切换距离、综合
     */
  chgstat: function (e) {
    var that = this
    that.setData({
      isNormal: e.currentTarget.dataset.isnormal
    })
    if (e.currentTarget.dataset.isnormal == '2') {
      if (e.currentTarget.dataset.distance == 0) {
        that.setData({
          distance: '1'
        })
      } else {
        that.setData({
          distance: '0'
        })
      }
    }
  },
  /**
     * 获取data列表
     */
  getdata: function(){
    var that = this
    var APP = getApp()
    console.log(APP.globalData.location[1])
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/app/shop/shoplist.do', //仅为示例，并非真实的接口地址
      data: {
        page: that.data.page,
        lat: that.data.lat,
        lng: that.data.lng,
        flag: that.data.isNormal,
        distance: that.data.distance,
        casesite: that.data.distance,
        fCityName: APP.globalData.location[1]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          itemdetail: res.data.data
        })
        console.log(that.data.itemdetail)
      }
    })
  },
   /**
   * 拨打电话
   */
  TakePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
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