//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region: app.globalData.location,
    LocalImage: '../../image/local.png',
    QRCode: '../../image/qrimg.png',
    PhoneIcon: '../../image/phone_icon.png',
    msgIcon: '../../image/usr_icon.png',
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
    AppraiseIcon: '../../image/AppraiseIcon.png',
    fCustomerID:''
  },
  /*****  省市区选择   *****/
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    app.globalData.location = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取系统信息 
    var APPUserInfo = wx.getStorageSync('APPUserInfo') || {}
    that.setData({
      fCustomerID: APPUserInfo.fCustomerID
    })
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
      url: app.globalData.posturl + 'app/picture/loadBanner.do', //url 不能出现端口号
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
  
  /** 
    * 跳转到各详情页面
    */
  message: function(e) {
    wx.navigateTo({
      url: 'message',
      success: function (res) {
        //console.log(res.data);        
      }
    })
  },
  // 扫码功能
  ScanCode: function () {
    wx.scanCode({
      success: function (res){
        console.log(res.result)
        if (res.result){
          wx.request({
            url: app.globalData.posturl + 'app/selectmat/scanCode.do', //url 不能出现端口号
            data: { fMatCode: res.result },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res2) {
              console.log(res2.data.data.fMatID);
              wx.navigateTo({
                url: '../main/budget/detail/index?fMatID=' + res2.data.data.fMatID,//地址待修改ggggggggggggggggggggggggg
                success: function (res) {
                  console.log('成功');        
                },
                fail: function (res) {
                  console.log('跳转失败');
                }
              })
            },
            method: 'GET'
          });
         
        }
      }
    })
  },
  //请求菜单项
  getmenudata: function (e) {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/shop/indexMenu.do', //url 不能出现端口号
      data: {flag: 1},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
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
      url: app.globalData.posturl + 'wx/shop/quereyOrder.do', //url 不能出现端口号
      data:{
        fCustomerID: that.data.fCustomerID,
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
  //请求服务站列表
  getshopinfo: function () {
    var that = this
    //获取位置信息----服务站列表
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.request({
          url: app.globalData.posturl + 'wx/shop/list.do', //url 不能出现端口号
          data: {
            page: 0,
            lat: res.latitude,
            lng: res.longitude,
            flag: 0,
            distance: 0,
            fCityName: that.data.region[1].replace(/市/g,'')
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (json) {
            console.log(json.data)
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
  phonecall:function(){
    wx.makePhoneCall({
      phoneNumber: '0595-85865088' //固定服务电话
    })
  },
  //拨打服务店联系电话
  CallMobile:function(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  tomap: function (e) {
    wx.navigateTo({
      url: 'map?lat=' + e.target.dataset.lat + '&lng=' + e.target.dataset.lng + '&add=' + e.target.dataset.add,
      success: function (res) {
        //console.log(res.data);        
      }
    })
  },
  //评价----开发中…………
  toeva: function(e) {
    wx.showModal({
      title: '温馨提示',
      content: '服务站评价功能开发中，敬请期待',
      success: function (res) {
        
      }
    })
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
