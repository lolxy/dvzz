//index.js
//获取应用实例
const app = getApp()
const api = require('../../../utils/api.js');

Page({
  data: {
    indicatorDots: false,
    autoplay: true, //banner  是否自动播放
    interval: 5000,//banner1 切换间隔
    duration: 500,//切换动画持续时间
    circular: true,//是否采用衔接滑动
    region:[],
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
    cityList:[],
    latitude: app.globalData.area.latitude,
    longitude: app.globalData.area.longitude,
    lanmu:{
      "lanmu1":"../../../image/lanmu1.png",
      "lanmu2": "../../../image/lanmu2.png",
      "lanmu3": "../../../image/lanmu3.png"
    }
  },

  // 获取城市列表
  getCurrentCityInfo:function(){
    api.getCurrentCityInfo({
      data:{
        key: app.globalData.qqmapkey,
        location: `${this.data.latitude},${this.data.longitude}`
      },
      success: (res) => {
        let addInfo = res.data.result.ad_info
        let province = addInfo.province
        let city = addInfo.city
        let district = addInfo.district
        this.setData({
          region: Array.of(province, city, district)
        })
      }
    });
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
    if (e.currentTarget.dataset.index == 3){
      wx.navigateTo({
        url: `/pages/main/list/index?code1=${e.currentTarget.dataset.furl}&fShopCityID=ff8080816165d3c6016168d1502f0236&catname=${e.currentTarget.dataset.title}`
      })
    }else{
      wx.navigateTo({
        url: `/pages/main/list/index?code1=${e.currentTarget.dataset.furl}&catname=${e.currentTarget.dataset.title}`
      })
    }
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
      phoneNumber: '0595-85865088'
    })
  },

  // 跳转我的消息
  gotoMessage:function(){
    wx.navigateTo({
      url:'/pages/index/message'
    })
  },

  // 扫码功能
  scanCode: function () {
    wx.scanCode({
      success: function (res) {
        if (res.result) {
          api.getScanCode({
            data:{
              fMatCode: res.result
            },
            success:(res)=>{
              if (res.data.data.fMatID){
                wx.navigateTo({
                  url: `/pages/main/detail/index?id=${res.data.data.fMatID}`
                })
              }else{
                wx.showToast({
                  title: '扫码有误，请重新扫码！',
                  icon:'none'
                })
              }
            }
          })
        }
      }
    })
  },

  // 初始化数据
  init(){
    this.getMallBanner()
    this.getMallMenu()
    if (this.data.latitude && this.data.longitude){
      this.getHomeRecommonList()
      this.getCurrentCityInfo()
    }else{
      app.getLocationInfo().then(res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        this.getHomeRecommonList()
        this.getCurrentCityInfo()
      });
    }
  },

  // 页面渲染后 执行
  onLoad: function () {
    this.init()
  }
})
