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
    area: '',
    CurrentCode:'',
    CurrentfID: '',
    fOpenID:'',
    fSelectMatID:'',
    fCustomerID:'',
    fCustomerName:'',
    posturl: 'https://www.dovzs.com/APPDWERP/',
    appid: 'wx5d6a6e22ab9f16fe',
    secret: '33f27321c7050ba838efd8817da17847',
    gaodekey: 'f25373107c102c9c02ff92c4596f3b52'
  }
})
