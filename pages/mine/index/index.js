// pages/mine/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    topbg: '../../../image/mine/top-bg.png',
    //username: '吕女士',
    setimgurl: '../../../image/mine/seticon.png',
    itemlist: [],
    serviceicon: '../../../image/mine/lxkf.png',
    servicename: '客服中心',
    servicephone: '15805959782',
    menurightimg: "../../../image/jt1.png",
    loged:0,
    binded:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.GetData()
  },

  //跳转详情
  jumptodetail: function (e) {
    if (e.currentTarget.dataset.title=='客服中心'){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.ref //仅为示例，并非真实的电话号码
      })
    }else {
      if (app.globalData.userInfo && app.globalData.userInfo.fUserID) {
        wx.navigateTo({
          url: e.currentTarget.dataset.ref,
          success: function (res) {
          }
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '您还没有登录，请先登录，',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/mine/login/index'
              })
            } else if (res.cancel) {}
          }
        })
      }
    }
  },
  //获取列表data
  GetData: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/queryUserInfoCenter.do', //url 不能出现端口号
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.testlog()
  },

  testlog:function(){
    var that = this
    if (app.globalData.fOpenID != '') {
      if (app.globalData.userInfo){
        that.setData({
          userInfo: app.globalData.userInfo,
          loged: 1,
          binded: 1
        })
      }else{
        if (app.globalData.fBindStatus){
          that.setData({
            loged: 1,
            binded: 0
          })
        }else{
          that.setData({
            loged: 0
          })
        }
      }
    } else {
      that.setData({
        loged: 0
      })
    }
  },

  //未登录状态跳转登录
  tologin: function () {
    wx.navigateTo({
      url: '/pages/mine/login/index'
    })
  },

  dowm: function () {
    wx.navigateTo({
      url: '/pages/mine/bind/index'
    })
  },

  logout:function(){
    var that = this
    app.globalData.userInfo = null
    wx.clearStorage()
    app.globalData.fSelectMatID = ''
    app.globalData.fCustomerID = ''
    app.globalData.fCustomerName = ''
    app.globalData.fOpenID = ''
    app.globalData.fBindStatus = false
    that.setData({
      loged: 0
    })
    // wx.navigateTo({
    //   url: '../bind/index'
    // })
  }
})
