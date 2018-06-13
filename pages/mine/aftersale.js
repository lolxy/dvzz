// pages/mine/aftersale.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[{
      fValue: '瓷砖类',
      flag: 1,
      time: '2018年5月4日',
      timeEnd: '2022年5月4日'
    },{
      fValue: '木地板',
      flag: 0,
      time: '2016年5月24日',
      timeEnd: '2022年5月4日'
    },{
      fValue: '开关面板',
      flag: 0,
      time: '2016年5月24日',
      timeEnd: '2022年5月4日'
    }],
    num:0,
    maxpage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的售后',
    })
    this.GetData()
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
   * 页面相关事件处理函数--GetData
   */
  GetData: function () {
    var that = this
    var APPUserInfo = wx.getStorageSync('APPUserInfo') || {}
    wx.request({
      url: app.globalData.posturl + 'app/order/queryService.do', //url 不能出现端口号
      data: {
        fUserID: APPUserInfo.fCustomerID,
        num: that.data.num,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (that.data.num > 0) {
          let n = that.data.datalist.length
          for (let i = 0; i < res.data.data.length; i++) {
            let item = 'datalist[' + (i + n) + ']'
            that.setData({
              [item]: res.data.data[i],
              maxpage: res.data.totalPage
            })
          }
        } else {
          that.setData({
            datalist: res.data.data,
            maxpage: res.data.totalPage
          })
        }
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.setData({
      num: 0
    })
    that.GetDataList() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.num == that.data.maxpage) {
      wx.showLoading({
        title: '已经到底了',
        mask: true
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      that.setData({
        num: that.data.num + 1
      })
      that.GetDataList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})