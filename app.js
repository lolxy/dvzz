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
    location: '泉州',
    cityId:'ff8080815c3ad0d7015c3ad8a38d0000',
    area: '',
    fOpenID:'',
    fSelectMatID:'',
    fCustomerID:'',
    fCustomerName:'',
    fSelectMatType:'',
    posturl: 'https://api.dovzs.com/APPDWERP/',
    appid: 'wx5d6a6e22ab9f16fe',
    gaodekey: 'f25373107c102c9c02ff92c4596f3b52'
  }
})
