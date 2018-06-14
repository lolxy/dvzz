// pages/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    StatusList:[{
      StatusName: '未付款'
    },{
      StatusName: '待收货'
    },{
      StatusName: '待评价'
    },{
      StatusName: '退货'
    },{
      StatusName: '全部'
    }],
    OrderList:[],
    CurrentCode: 'Z',//默认显示装修建材
    CurrentTab: 0,//默认显示装修建材
    flag: 0,//默认显示未付款
    num: 0,//默认显示第一页
    maxpage: 1, //最大页码(每个页面单独页码)
    menuimg: '../../image/jt1.png',
    SelectAll: 0,
    totle:0,
    userInfo:{},
    OpenID: '',
    OIDList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '订单管理',
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
    var that = this
    if (app.globalData.fOpenID=='')    {
      wx.showModal({
        title: '温馨提示',
        content: '您还没有登录，请先登录，',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../mine/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }else{
      if (app.globalData.userInfo.fCustomerID) {
        that.setData({
          userInfo: app.globalData.userInfo
        })
        that.GetOrderType()
      } else {
        that.GetBindsta()
      }
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
   * 页面相关事件处理函数--切换tabs
   */
  ChangeTabs: function (e) {
    var that = this
    if (e.currentTarget.dataset.index === that.data.CurrentTab) {
      that.setData({num:0})
    }else {
      that.setData({
        CurrentTab: e.currentTarget.dataset.index,
        CurrentCode: e.currentTarget.dataset.code,
        num:0
      })
    }
    that.GetOrderInfo()
  },

  /**
   * 页面相关事件处理函数--切换code状态
   */
  ChangeFlags: function(e) {
    var that = this

    if (e.currentTarget.dataset.flag === that.data.flag) {
      that.setData({ num: 0 })
    } else {
      that.setData({
        flag: e.currentTarget.dataset.flag,
        num: 0
      })
    }
    that.GetOrderInfo()
  },

  /**
   * 数据请求处理函数---获取订单类型列表
   */
  GetOrderType: function (e) {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/shopOrder/queryOrderType.do', //url 不能出现端口号
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          tabs: res.data.data,
          CurrentCode: res.data.data[that.data.CurrentTab].fCode
        })
        that.GetOrderInfo()
      },
      method: 'GET'
    });
  },

  /**
   * 数据请求处理函数---获取订单列表信息
   */
  GetOrderInfo: function (e) {
    var that = this
    var fcode
    if (that.data.flag == 4) {
      fcode=''
    }else {
      fcode = that.data.flag
    }
    wx.request({
      url: app.globalData.posturl + 'wx/shopOrder/queryOrderList.do', //url 不能出现端口号
      data: {
        fCustomerID: app.globalData.userInfo.fCustomerID,
        fType: that.data.CurrentCode,
        flag: that.data.flag,
        num: that.data.num
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (that.data.num > 0) {
          let n = that.data.OrderList.length
          for (let i = 0; i < res.data.data.length; i++) {
            let item = 'OrderList[' + (i + n) + ']'
            that.setData({
              [item]: res.data.data[i],
              maxpage: res.data.totalPage
            })
          }
        } else {
          that.setData({
            OrderList: res.data.data,
            maxpage: res.data.totalPage
          })
        }
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--切换checkbox点击切换
   */
  checkboxChange: function(e) {
    var that = this
    console.log(e.detail.value)
    for (let i = 0; i < that.data.OrderList.length; i++){
      let item = 'OrderList[' + i + '].Selected'
      that.setData({
        [item]: false
      })
    }
    that.setData({
      OIDList: []
    })
    for (let i = 0; i < e.detail.value.length;i++) {
      let n = e.detail.value[i]
      let item = 'OrderList[' + n +'].Selected'
      let itemb = 'OIDList[' + n + ']'
      that.setData({
        [item]: true,
        [itemb]: that.data.OrderList[n].fSaleOrderID
      })
    }
    that.SumTotle()
  },
  //统计已选取的总金额
  SumTotle: function(){
    var that = this
    that.setData({ totle:0})
    for (let i = 0; i < that.data.OrderList.length; i++) {
      if (that.data.OrderList[i].Selected == true && that.data.OrderList[i].fAmount){
        that.setData({
          totle: parseFloat(that.data.totle) + parseFloat(that.data.OrderList[i].fAmount)
        })
      }
    }
  },
  /**
  * 页面相关事件处理函数--切换checkbox点击切换
  */
  SelectAll: function (e) {
    var that = this
    if (e.detail.value.length > 0) {
      for (let i = 0; i < that.data.OrderList.length;i++) {
        let item = 'OrderList[' + i + '].Selected'
        that.setData({
          [item]:true
        })
      }
    }else {
      for (let i = 0; i < that.data.OrderList.length; i++) {
        let item = 'OrderList[' + i + '].Selected'
        that.setData({
          [item]: false,
        })
      }
    }
    that.SumTotle()
  },

  /**
   * 页面相关事件处理函数--跳转详情列表
   */
  ToList: function(e) {
    wx.navigateTo({
      url: 'list?fSaleOrderID=' + e.currentTarget.dataset.fid + '&fTypeCategory=' + e.currentTarget.dataset.item + '&fUserID=' + e.currentTarget.dataset.usr,
      success: function (res) {
      }
    })
  },
  
   /**
   * 页面相关事件处理函数--跳转详情列表
   */
  ToEvaluate: function(e) {
    wx.navigateTo({
      url: 'evaluate?fSaleOrderID=' + e.currentTarget.dataset.fid,
      success: function (res) {
      }
    })
  },
  //结算
  ToSettlement: function(e) {
    var that = this
    if (app.globalData.fOpenID == '') {
      wx.showModal({
        title: '温馨提示',
        content: '您必须先登录才能结算订单',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../mine/login',
            })
          } else if (res.cancel) {
            wx.navigateTo({
              url: '../mine/login',
            })
          }
        }
      })
    } else {
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo
        })
        wx.navigateTo({
          url: 'Settlement?TotleAccont=' + that.data.totle + '&OIDList=' + e.currentTarget.dataset.soid,
          success: function (res) {
          }
        })
      } else {
        that.GetBindsta()
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.setData({
      num: 0
    })
    that.GetDataList() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.num == that.data.maxpage) {
      wx.showLoading({
        title: '已经到底了',
        mask: true
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      that.setData({
        num: that.data.num + 1
      })
      that.GetOrderInfo()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    //请求绑定信息
  GetBindsta: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/queryUserInfo.do', //url 不能出现端口号
      data: { fOpenID: that.data.OpenID },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        app.globalData.userInfo = res.data.data
        if (res.data.code == 1) {          
          that.setData({
            userInfo: res.data.data,
          })
          that.GetOrderType()
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还没有绑定微信，请先绑定用户，',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../mine/bind',
                })
              } else if (res.cancel) {
              }
             }
          })
        }
      },
      method: 'GET'
    });
  },
})
