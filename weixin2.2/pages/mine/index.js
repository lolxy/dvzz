// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    topbg: '../../image/mine/top-bg.png',
    //username: '吕女士',
    useraccount: 'LV252154541',
    setimgurl: '../../image/mine/seticon.png',
    itemlist: [{
      itemimg: '../../image/mine/qb.png',
      itemname: '我的钱包',
      itemhref: 'bbkh'
    },{
      itemimg: '../../image/mine/sh.png',
      itemname: '我的图纸',
      itemhref: 'wdrw/list'
    },{
      itemimg: '../../image/mine/sh.png',
      itemname: '水电验收',
      itemhref: 'wdrw/list'
    },{
      itemimg: '../../image/mine/sh.png',
      itemname: '我的售后',
      itemhref: 'wdrw/list'
    },{
      itemimg: '../../image/mine/lxkf.png',
      itemname: '客服中心',
      itemhref: 'wdrw/list'
    }],
    menurightimg: "../../image/jt1.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uinfo = wx.getStorageSync('APPUserInfo') || {}
    this.setData({ userInfo: uinfo})  
    console.log(this.data.userInfo)
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  jumptodetail: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.ref,
      success: function (res) {
        //console.log(res.data);        
      }
    })
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