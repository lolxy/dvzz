//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    CityItem: [],
    CurrentCity:'',
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
  CityChange: function (e) {
    app.globalData.location= this.data.Citylist[e.detail.value].fValue
    this.setData({
      CurrentCity: this.data.Citylist[e.detail.value].fValue
    })
  },
  //获取城市列表
  GetCityList: function(){
    var that=this
    //请求banner列表
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/queryCityList.do', //url 不能出现端口号
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Citylist: res.data.data,
          CurrentCity: app.globalData.location
        })
        app.globalData.CityList = res.data.data
      },
      method: 'GET'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取系统信息 
    this.GetCityList()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    }); 
    wx.showLoading({
      title: '加载中',
    }) 
    //请求banner列表
    wx.request({
      url: app.globalData.posturl + 'app/picture/loadBanner.do', //url 不能出现端口号
      data: { type: 5 },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
               
        that.setData({
          imgUrls: res.data.data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      },
      method: 'GET'
    });
    wx.showLoading({
      title: '加载中',
    }) 
    that.getmenudata()
    wx.showLoading({
      title: '加载中',
    }) 
    that.getorderinfo()
    wx.showLoading({
      title: '加载中',
    }) 
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
    var that = this
    if (app.globalData.userInfo) {
      that.setData({
        fCustomerID: app.globalData.userInfo.fCustomerID,
      })
    }
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
      }
    })
  },
  //banner跳转
  tourl: function (e) {
    wx.navigateTo({
      url: e.target.dataset.bUrl,
      success: function (res) {  
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
      }
    })
  },
  // 扫码功能
  ScanCode: function () {
    wx.scanCode({
      success: function (res){
        if (res.result){
          wx.request({
            url: app.globalData.posturl + 'app/selectmat/scanCode.do', //url 不能出现端口号
            data: { fMatCode: res.result },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res2) {
              wx.navigateTo({
                url: '../main/detail/index?fMatID=' + res2.data.data.fMatID,//地址待修改
                success: function (res) {        
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
        that.setData({
          LinkList: res.data.data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
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
        that.setData({
          StutList: res.data.data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
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
            fCityName: app.globalData.location
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (json) {
            that.setData({
              ShopList: json.data.data
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
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
  //图片点击放大
  showimg: function (e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.target.dataset.url] // 需要预览的图片http链接列表
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
