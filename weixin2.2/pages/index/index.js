//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region:['福建省','泉州市','晋江市'],
    LocalImage: '../../image/local.png',
    QRCode: '../../image/qrimg.png',
    PhoneIcon: '../../image/phone_icon.png',
    UserIcon: '../../image/usr_icon.png',
    indicatorDots: false,
    autoplay: true, //banner  是否自动播放
    interval: 5000,//banner1 切换间隔
    interval2: 3000,//banner2  切换间隔
    duration: 500,//切换动画持续时间
    imgUrls: [],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    currentTab2: 0,
    LinkList:[],
    StutList:[],
    ShopList: [],
    StutImage:'../../image/stat_img.png',
    ShopIcon:'../../image/shopicon.png',
    CallIcon: '../../image/callicon.png',
    NaviIcon: '../../image/navicon.png',
    AppraiseIcon: '../../image/AppraiseIcon.png'
  },
  /*****  省市区选择   *****/
  bindRegionChange: function (e) {
    var APP=getApp()
    this.setData({
      region: e.detail.value
    })
    APP.globalData.location = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    }); 
    //请求banner列表
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/app/picture/loadBanner.do', //url 不能出现端口号
      data: { type: 5 },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          imgUrls: res.data.data
        })
      },
      method: 'GET'
    });
    that.getmenudata()
    that.getorderinfo()
    that.getshopinfo()
    
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
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab2: e.detail.current })
  },
  /** 
    * 跳转到自装服务站
    */
  ToStationList: function () {
    wx.navigateTo({
      url: 'station',
      success: function (res) {
        //console.log(res.data);        
      }
    })
  },
  /** 
    * 跳转到各详情页面
    */
  JumpTo: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: function (res) {
        //console.log(res.data);        
      }
    })
  },
  //请求菜单项
  getmenudata: function (e) {
    var that = this
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/wx/shop/indexMenu.do', //url 不能出现端口号
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          LinkList: res.data.data
        })
      },
      method: 'GET'
    });
  },
  //请求订单列表轮播
  getorderinfo: function (e) {
    var that = this
    //请求订单列表
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/wx/shop/quereyOrder.do', //url 不能出现端口号
      data:{
        num:0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          StutList: res.data.data
        })
      },
      method: 'GET'
    });
  },
  getcustomerifo: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: app.globalData.appid,
              secret: app.globalData.secret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            //请求服务器绑定信息
            success: function (res) {
              wx.request({
                url: 'https://www.dovzs.com/APPDWERP/app/hruser/queryUserInfo.do',
                data: { openID: res.data.openid },
                success: function (json) {
                  wx.setStorageSync('APPUserInfo', json.data.data)
                }
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //请求订单列表轮播
  getshopinfo: function () {
    var that = this
    //请求订单列表

    //获取位置信息
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.request({
          url: 'https://www.dovzs.com/APPDWERP/wx/shop/list.do', //url 不能出现端口号
          data: {
            page: 0,
            lat: res.latitude,
            lng: res.longitude,
            flag: 0,
            distance: 0,
            fCityName: that.data.region[1]
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (json) {
            that.setData({
              ShopList: json.data.data
            })
          },
          method: 'GET'
        });
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
