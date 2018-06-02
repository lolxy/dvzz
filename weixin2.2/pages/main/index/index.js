//index.js
//获取应用实例
const app = getApp()
const api = require('../../../utils/api.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    region: app.globalData.location,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    localImage:"../../../image/local.png",
    qRCode: "../../../image/qrimg.png",
    phoneIcon: "../../../image/phone_icon.png",
    userIcon: "../../../image/usr_icon.png",
    downIcon:"../../../image/downicon.png",
    shopIcon:"../../../image/shopicon.png",
    imgUrls: [],
    menuList: [],
    lanmu:{
      "lanmu1":"../../../image/lanmu1.png",
      "lanmu2": "../../../image/lanmu2.png",
      "lanmu3": "../../../image/lanmu3.png"
    }
  },
  //事件处理函数
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    app.globalData.location = e.detail.value
  },
  goToPage: function (e) {
    wx.navigateTo({
      url: `/pages/main/mall/list/index?id=${e.currentTarget.dataset.id}`
    })
  },
  // 获取广告轮播图
  getMallBanner: function(){
    api.getMallBanner({
      data:{
        type:6
      },
      success: (res) => {
       this.setData({
         imgUrls:res.data.data
       })
      }
    });
  },
  // 获取菜单信息
  getMallMenu:function(){
    api.getMallMenu({
      data:{
        flag:2
      },
      success: (res) => {
        this.setData({
          menuList: res.data.data
        })
      }
    });
  },
  // 拨打联系电话
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '15759518702'
    })
  },
  // 跳转我的中心
  gotoMyHome:function(){
    wx.switchTab({
      url:'/pages/mine/index'
    })
  },
  // 扫码
  scanCode:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 获取当前位置信息
  getCurrentCity:function(){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  },
  // 页面渲染后 执行
  onLoad: function () {
    this.getMallBanner()
    this.getMallMenu()
    this.getCurrentCity()
  }
})
