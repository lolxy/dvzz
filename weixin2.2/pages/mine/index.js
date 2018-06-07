// pages/mine/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    topbg: '../../image/mine/top-bg.png',
    //username: '吕女士',
    useraccount: 'LV252154541',
    setimgurl: '../../image/mine/seticon.png',
    itemlist: [],
    serviceicon: '../../image/mine/lxkf.png',
    servicename: '客服中心',
    servicephone: '15805959782',
    menurightimg: "../../image/jt1.png",
    showstat:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求微信授权
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: app.globalData.appid,
              secret: app.globalData.secret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            //请求服务器绑定信息
            success: function (res2) {
              wx.request({
                url: app.globalData.posturl + 'wx/personalcenter/queryUserInfo.do',
                data: { openID: res2.data.openid },
                success: function (json) {
                  console.log(json.data)
                  if (json.data.data.length > 0){
                    wx.setStorageSync('APPUserInfo', json.data.data)
                  }else {
                    that.setData({
                      showstat: 1
                    })
                  }
                }
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    //var uinfo = wx.getStorageSync('APPUserInfo') || {}
    this.setData({ userInfo: uinfo})  
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    this.GetData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  //跳转详情
  jumptodetail: function (e) {
    if (e.currentTarget.dataset.title=='客服中心'){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.ref //仅为示例，并非真实的电话号码
      })
    }else {
      wx.navigateTo({
        url: e.currentTarget.dataset.ref,
        success: function (res) {
          //console.log(res.data);        
        }
      })
    }
  },
  
  //获取列表data
  GetData: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/queryUserInfoCenter.do', //url 不能出现端口号
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          itemlist: res.data.data.list,
          topbg: res.data.data.topBgUrl
        })
      },
      method: 'GET'
    });
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