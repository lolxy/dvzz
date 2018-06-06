//app.js
App({
  systemInfo: null,
  onLaunch: function () {

    const self = this;
    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
      }
    });

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求微信授权
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: self.globalData.appid,
              secret: self.globalData.secret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            //请求服务器绑定信息
            success: function (res2) {
              console.log(res2.data);
              wx.request({
                url: self.globalData.posturl+'/app/hruser/queryUserInfo.do',
                data: { openID: res2.data.openid },
                success: function (json) {
                  console.log(json.data);
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

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 获取当前位置信息
  getLocationInfo: function () {
    const self = this;
    return new Promise(function(resolve,reject){
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          self.globalData.area = res
          resolve(res); 
        }
      });
    })
  },
  globalData: {
    userInfo: null,
    fCustomerID: '',
    location: ['福建省', '泉州市', '晋江市'],
    area: '',
    posturl: 'https://www.dovzs.com/APPDWERP/',
    appid: 'wxe25ed9f3e82519ef',
    // appid:'wxe9985e67fdf19328',//我的测试appID
    secret: 'cb85a1be394fba94ceadaf02b87081b4',
    gaodekey: '7dbfb8aa7eaa2349fc4c31e080ea94f9'
  }
})
