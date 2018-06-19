//self/index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    Citylist: [],
    CurrentCity: app.globalData.location,
    LocalImage: '../../../image/local.png',
    QRCode: '../../../image/qrimg.png',
    PhoneIcon: '../../../image/phone_icon.png',
    msgIcon: '../../../image/usr_icon.png',
    downIcon: "../../../image/downicon.png",
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
    StutImage:'../../../image/stat_img.png',
    ShopIcon:'../../../image/shopicon.png',
    CallIcon: '../../../image/callicon.png',
    NaviIcon: '../../../image/navicon.png',
    AppraiseIcon: '../../../image/AppraiseIcon.png',
    fCustomerID: ''
  },
  /*****  省市区选择   *****/
  CityChange: function (e) {
    app.globalData.location = this.data.Citylist[e.detail.value].fValue
    app.globalData.cityId = this.data.Citylist[e.detail.value].fID
    this.setData({
      CurrentCity: app.globalData.location
    })
    this.getshopinfo()
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
        that.setData({
          Citylist: res.data.data
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (app.globalData.userInfo) {
      that.setData({
        fCustomerID: app.globalData.userInfo.fCustomerID,
      })
      that.getorderinfo()
    }
    this.GetCityList()
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
      url: '../station/index',
      success: function (res) {
      }
    })
  },

  //banner跳转
  toOutLink: function (e) {
    wx.navigateTo({
      url: `/pages/outlink/index?url=${e.currentTarget.dataset.burl}`
    })
  },
  /**
    * 跳转到各详情页面
    */
  JumpTo: function (e) {
    wx.navigateTo({
      url: `../${e.currentTarget.dataset.url}/index`
    })
  },

  /**
    * 跳转到各详情页面
    */
  message: function(e) {
    wx.navigateTo({
      url: '../message/index'
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
                url: '/pages/main/detail/index?fMatID=' + res2.data.data.fMatID,//地址待修改
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
            fCityID: app.globalData.cityId
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
      url: '../map/index?lat=' + e.target.dataset.lat + '&lng=' + e.target.dataset.lng + '&add=' + e.target.dataset.add,
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

  chickbtn: function(e) {
    var that = this;
    if (e.currentTarget.dataset.targel == '确认支付') {
      wx.navigateTo({
        url: '/pages/order/settlement/index?TotleAccont=' + e.currentTarget.dataset.amount + '&OIDList=' + e.currentTarget.dataset.soid,
        success: function (res) {
        }
      })
    } else if (e.currentTarget.dataset.targel == '确认收货'){
      wx.showModal({
        title: '确认收货',
        content: '为避免不必要的损失，请在确认收到所货品之后点击确认收货',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.posturl + 'wx/shopOrder/updateSaleOrder.do', //url 不能出现端口号
              data: {
                fSaleOrderID: e.currentTarget.dataset.soid,
                fUserID: app.globalData.userInfo.fUserID
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {

              },
              method: 'GET'
            });
          } else if (res.cancel) {
          }
        }
      })
    }
  }
})