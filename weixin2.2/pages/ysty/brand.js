// pages/ysty/brand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downimgurl: '../../image/px2.png',
    upimgurl: '../../image/px3.png',
    unknownimgurl: '../../image/px1.png',
    isNormal: '0',
    distance: '0',
    page: 0,
    lat: 0,
    lng: 0,
    itemdetail: [{
      fBrandName: "1",
      fMaxPrice: "1",
      fMinPrice: "0",
      distance: "1km",
      fImageUrl: "https://www.dovzs.com/upload/pic/15179846833534608.jpg"
    }],
    fType3Code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //console.log(res)
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
    if (e.currentTarget.dataset.isnormal == '1') {
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
    console.log('综合' + that.data.isNormal + '最近' + that.data.distance)
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/app/mat/queryBrandList.do', //仅为示例，并非真实的接口地址
      data: {
        fType3Code: that.data.fType3Code,
        page: that.data.page,
        lat: that.data.lat,
        lng: that.data.lng,
        isNormal: that.data.isNormal,
        distance: that.data.distance
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