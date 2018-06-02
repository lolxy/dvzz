// pages/index/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      fType: '个人消息',
      fCode: 'A01',
    },{
      fType: '活动消息',
      fCode: 'A01',
    },{
      fType: '系统消息',
      fCode: 'A01',
    }],
    CurrentTab: 0,//默认显示个人消息
    msglist:[{
      msgcont:'中骏四季花城水电完工',
      msgdate: '2018-05-04',
      id: 0
    },{
      msgcont:'中骏四季花城水电完工',
      msgdate: '2018-05-04',
      id: 1
    },{
      msgcont:'中骏四季花城水电完工',
      msgdate: '2018-05-04',
      id: 2
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '消息中心',
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
   * 页面相关事件处理函数--切换tabs
   */
  ChangeTabs: function (e) {
    var that = this
    if (e.currentTarget.dataset.index === that.data.CurrentTab) {
      that.setData({ num: 0 })
    } else {
      that.setData({
        CurrentTab: e.currentTarget.dataset.index,
        CurrentCode: e.currentTarget.dataset.code,
        num: 0
      })
    }
    that.GetOrderInfo()
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