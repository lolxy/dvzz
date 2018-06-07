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
              console.log(res2)
              wx.request({
                url: self.globalData.posturl +'wx/personalcenter/queryUserInfo.do',
                data: { openID: res2.data.openid },
                success: function (json) {
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
    location: ['福建省', '泉州市', '晋江市'],
    area: '',
    posturl: 'https://www.dovzs.com/APPDWERP/',
    appid: 'wxe25ed9f3e82519ef',
    secret: 'cb85a1be394fba94ceadaf02b87081b4',
    gaodekey: 'f25373107c102c9c02ff92c4596f3b52',
    qqmapkey:'NPQBZ-262KU-ZTIVY-BL6SQ-77IW7-YYF7Z'
  }
})
