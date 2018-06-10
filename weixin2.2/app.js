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
    fSelectMatID:'',
    posturl: 'https://www.dovzs.com/APPDWERP/',
    appid: 'wxe25ed9f3e82519ef',
    secret: 'cb85a1be394fba94ceadaf02b87081b4',
    gaodekey: 'f25373107c102c9c02ff92c4596f3b52'
  }
})
