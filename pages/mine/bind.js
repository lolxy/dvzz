// pages/mine/bind.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identifyicon: '',
    IsShow:0,
    IsNeed: 0,
    phone: '',
    fCaptcha: '',
    requestimg: '',
    OpenID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定手机号',
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
    wx.getStorage({
      key: 'OpenID',
      success: function (res) {
        if (res.data != '') {
          that.setData({
            OpenID: res.data
          })      
        }
      },
      fail: function () {
        wx.navigateTo({
          url: 'login',
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
  getcheckimg: function () {
    var that = this
    var item = 'https://www.dovzs.com/APPDWERP/wx/captcha/getCaptcha.do?fPhoneNo=' + that.data.phone + '&fOpenID=' + that.data.OpenID + '&' + Math.random()
    that.setData({
      requestimg: item,
      IsNeed: 1
    })
  },
  toback: function () {
    wx.navigateBack()
  },
  checkimg: function (e) {
    var that = this
    if (e.detail.value.length == 4) {
      wx.showToast({
        title: '已提交验证，请稍后查看短信验证码',
        icon: 'none',
        duration: 1000
      })
      wx.request({
        url: app.globalData.posturl + 'wx/personalcenter/checkCode.do', //url 不能出现端口号
        data: {
          fPhoneNo: that.data.phone,
          fCaptcha: e.detail.value,
          fOpenID: that.data.OpenID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete: function (res) {
          wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
          })
        },
        method: 'GET'
      });
    }else {
      wx.showToast({
        title: '请输入4位的图片验证码',
        icon: 'none',
        duration: 1000
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/personalcenter/bindAccount.do', //url 不能出现端口号
      data: {
        fPhoneNo: e.detail.value.fPhoneNo,
        fCaptcha: e.detail.value.fVerifyCode,
        fOpenID: that.data.OpenID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res2) {
        that.GetBindsta()        
      },
      method: 'GET'
    });
  },
  //点击完成
  phonein: function (e) {
    var that=this
    that.setData({
      phone: e.detail.value
    })
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length != 11 || e.detail.value == ''){
      wx.showToast({
        title: '请输入完整的手机号',
        icon: 'none',
        duration: 1000
      })
      that.setData({ IsShow: 0 })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确的手机号（13、14、18、17开头的11位数字）',
        icon: 'none',
        duration: 1000
      })
      that.setData({ IsShow: 0 })
    }else {
      that.setData({ IsShow:1})
    }
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
        if (res.data.code == 1 ) {
          app.globalData.userInfo = res.data.data
          app.globalData.fSelectMatID = res.data.data.fSelectMatID
          app.globalData.fCustomerID = res.data.data.fCustomerID
          wx.showModal({
            title: '提示',
            content: '绑定成功',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: 'index',
                })
              } else if (res.cancel) {

              }
            }
          })      
        }else {
          wx.showModal({
            title: '提示',
            content: '绑定失败,请退出登录后重试绑定',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: 'index',
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