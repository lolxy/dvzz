// pages/index/auxiliary/orderlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      TabsName: '工人开单',
      TabIcon: '../../../image/auxiliary/grkd.png',
      LinkUrl: 'grkd'
    },{
      TabsName: '辅材商城',
      TabIcon: '../../../image/auxiliary/fcsc.png',
      LinkUrl: '../../main/list/index'
    }],
    StatusList: [{
      StatusName: '未付款'
    }, {
      StatusName: '待收货'
    }, {
      StatusName: '待评价'
    }, {
      StatusName: '退货'
    }, {
      StatusName: '全部'
    }],
    OrderList: [],
    CurrentCode: 'F',//这里仅显示辅材订单
    Currentsum: 0,//默认显示装修建材
    flag: 0,//默认显示未付款
    num: 0,//默认显示第一页
    maxpage: 1, //最大页码(每个页面单独页码)
    menuimg: '../../../image/jt1.png',
    SelectAll: 0,
    totle: 0,
    IsVisible: false,
    Visibleicon: '../../../image/auxiliary/dd-del.png',
    OpenID: '',
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '辅材商城',
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
    wx.getStorage({
      key: 'OpenID',
      success: function (res) {
        that.setData({ OpenID: res.data })
        if (res.data != '') {
          if (app.globalData.userInfo) {
            that.setData({
              userInfo: app.globalData.userInfo
            })
            that.GetOrderInfo()
          } else {
            that.GetBindsta()
          }
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还没有登录，请先登录，',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../mine/login',
                })
              } else if (res.cancel) {

              }
            }
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '温馨提示',
          content: '您还没有登录，请先登录，',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../mine/login',
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    })
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
   * 页面相关事件处理函数--切换code状态
   */
  ChangeFlags: function (e) {
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
   * 数据请求处理函数---获取订单列表信息
   */
  GetOrderInfo: function (e) {
    var that = this
    var fcode
    if (that.data.flag == 4) {
      fcode = ''
    } else {
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
          that.setData({ IsVisible: false })          
        } else {
          if (res.data.data.length > 0){
            that.setData({ IsVisible: false})
          }else{
            that.setData({ IsVisible: true })
          }
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
  checkboxChange: function (e) {
    var that = this
    for (let i = 0; i < that.data.OrderList.length; i++) {
      let item = 'OrderList[' + i + '].Selected'
      that.setData({
        [item]: false
      })
    }
    for (let i = 0; i < e.detail.value.length; i++) {
      let n = e.detail.value[i]
      let item = 'OrderList[' + n + '].Selected'
      that.setData({
        [item]: true
      })
    }
    that.SumTotle()
  },
  //统计已选取的总金额
  SumTotle: function () {
    var that = this
    that.setData({ totle: 0 })
    for (let i = 0; i < that.data.OrderList.length; i++) {
      if (that.data.OrderList[i].Selected == true) {
        that.setData({
          totle: that.data.totle + parseFloat(that.data.OrderList[i].fAmount)
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
      for (let i = 0; i < that.data.OrderList.length; i++) {
        let item = 'OrderList[' + i + '].Selected'
        that.setData({
          [item]: true
        })
      }
    } else {
      for (let i = 0; i < that.data.OrderList.length; i++) {
        let item = 'OrderList[' + i + '].Selected'
        that.setData({
          [item]: false
        })
      }
    }
    that.SumTotle()
  },

  /**
   * 页面相关事件处理函数--跳转详情列表
   */
  ToList: function (e) {
    wx.navigateTo({
      url: '../../order/list?fSaleOrderID=' + e.currentTarget.dataset.fid + '&fTypeCategory=' + e.currentTarget.dataset.item,
      success: function (res) {     
      }
    })
  },
  /**
   * 页面相关事件处理函数--页面跳转 data-url无其他参数;
   */
  jumpurl:function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url+'?type=1',
      success: function (res) {  
      }
    })
  },
  //结算
  ToSettlement: function (e) {
    var that = this
    wx.navigateTo({
      url: '../mine/wdqb/info?fSaleOrderID=' + e.currentTarget.dataset.fid + '&TotleAccont=' + that.data.totle,
      success: function (res) {
      }
    })
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
          that.GetOrderInfo(that.data.userInfo)
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还没有绑定微信，请先绑定用户，',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../mine/bind',
                })
              } else if (res.cancel) {
              }
            }
          })
        }
      },
      method: 'GET'
    });
  }
})