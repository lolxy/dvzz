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
    CurrentCode: '',//默认显示装修建材
    CurrentTab: 0,//默认显示装修建材
    flag: 0,//默认显示未付款
    num: 0,//默认显示第一页
    maxpage: 1, //最大页码(每个页面单独页码)
    menuimg: '../../image/jt1.png',
    SelectAll: 0,
    totle:0,
    userInfo:{},
    OpenID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '订单管理',
    })
    that.GetOrderType()
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
          } else {
            that.GetBindsta()
          }
        }else {
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
        }
      },
      fail: function (res) {
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
    var uinfo = wx.getStorageSync('APPUserInfo') || {}
    wx.request({
      url: app.globalData.posturl + 'wx/shopOrder/queryOrderList.do', //url 不能出现端口号
      data: {
        fCustomerID: that.data.userInfo.fCustomerID,
        fType: that.data.CurrentCode,
        flag: that.data.flag,
        num: that.data.num
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
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
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    for (let i = 0; i < that.data.OrderList.length; i++){
      let item = 'OrderList[' + i + '].Selected'
      that.setData({
        [item]: false
      })
    }
    for (let i = 0; i < e.detail.value.length;i++) {
      let n = e.detail.value[i]
      let item = 'OrderList[' + n +'].Selected'
      that.setData({
        [item]: true
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
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
          [item]: false
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
      url: 'list?fSaleOrderID=' + e.currentTarget.dataset.fid + '&fTypeCategory=' + e.currentTarget.dataset.item,
      success: function (res) {
        //console.log(res.data);
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
        //console.log(res.data);
      }
    })
  },
  //结算
  ToSettlement: function(e) {
    var that = this
    wx.navigateTo({
      url: '../mine/wdqb/info?fSaleOrderID=' + e.currentTarget.dataset.fid + '&TotleAccont=' + that.data.totle,
      success: function (res) {
        //console.log(res.data);       
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
