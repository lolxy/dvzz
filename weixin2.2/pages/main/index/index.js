//index.js
//获取应用实例
const app = getApp()
const api = require('../../../utils/api.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    indicatorDots: false,
    autoplay: true, //banner  是否自动播放
    interval: 5000,//banner1 切换间隔
    duration: 500,//切换动画持续时间
    circular: true,//是否采用衔接滑动
    region: app.globalData.location,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    localImage:"../../../image/local.png",
    qRCode: "../../../image/qrimg.png",
    phoneIcon: "../../../image/phone_icon.png",
    userIcon: "../../../image/usr_icon.png",
    downIcon:"../../../image/downicon.png",
    shopIcon:"../../../image/shopicon.png",
    banner: [],
    menuList: [],
    recommonList:[],
    latitude: app.globalData.area.latitude,
    longitude: app.globalData.area.longitude,
    lanmu:{
      "lanmu1":"../../../image/lanmu1.png",
      "lanmu2": "../../../image/lanmu2.png",
      "lanmu3": "../../../image/lanmu3.png"
    }
  },

  //选择地区城市
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    app.globalData.location = e.detail.value
  },

  // 跳转分类页面
  goToPage: function(e) {
    wx.navigateTo({
      url: `/pages/main/mall/list/index?code1=${e.currentTarget.dataset.furl}`
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
         banner:res.data.data
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

  // 获取首页推荐商品
  getHomeRecommonList: function () {
    api.getHomeRecommonList({
      data: {
        lat: this.data.latitude,
        lng: this.data.longitude,
        num: 0
      },
      success: (res) => {
        this.setData({
          recommonList: res.data.data
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
  gotoMessage:function(){
    wx.navigateTo({
      url:'/pages/index/message'
    })
  },

  // 扫码功能
  scanCode:function(){
    wx.scanCode({
      success: (res) => {
       
      }
    })
  },

  // 初始化数据
  init(){
    this.getMallBanner()
    this.getMallMenu()
    if (this.data.latitude && this.data.longitude){
      this.getHomeRecommonList()
    }else{
      app.getLocationInfo().then(res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        this.getHomeRecommonList()
      });
    }
  },

  // 页面渲染后 执行
  onLoad: function () {
    this.init()
  }
})
