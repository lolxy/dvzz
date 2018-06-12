// pages/mine/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logopic: '../../image/mine/logopic.png',
    phone: '',
    OpenID: '',
    loged: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',
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
    var that=this
    if (that.data.loged==1){
      that.GetBindsta()
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
  //点击登录
  WXLogin: function() {
    var that = this

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
            success: function (res2) {
              app.globalData.fOpenID = res2.data.openid
              wx.setStorage({
                key: "OpenID",
                data: res2.data.openid,
                success:function(){
                  that.setData({
                    OpenID: res2.data.openid,
                    loged: 1
                  })
                  that.GetBindsta()
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
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
  
  },
  //请求绑定信息 （只有登录之后才能获取绑定状态所以能调用时openID一定存在）
  GetBindsta: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/queryUserInfo.do', //url 不能出现端口号
      data: { fOpenID: that.data.OpenID },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 1) {
          app.globalData.userInfo = res.data.data
          // wx.switchTab({
          //   url: 'index',
          // })
          wx.navigateBack({})      
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '暂未查询到您的绑定信息，‘确定’将为您跳转到绑定页面，暂不绑定请点击取消',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: 'bind',
                })
              } else if (res.cancel) {
                wx.navigateBack({})
              }
            }
          })
                  
        }
      },
      method: 'GET'
    });
  },
})