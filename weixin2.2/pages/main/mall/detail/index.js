// pages/detail/detail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    isCollect:true,
    hiddenModal:true,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight - 10,
    imgUrls: ["../../../image/banner.png", "../../../image/banner.png", "../../../image/banner.png"],
    favicon:"./image/favicon.png",
    faviconed:"./image/faviconed.png",
    photo: "./image/photo.png",
    paramsList:[
      {
        "id":1,
        "title":"品牌",
        "value":"马可波罗"
      },
      {
        "id": 2,
        "title": "材质",
        "value": "抛光砖"
      },
      {
        "id": 3,
        "title": "品名",
        "value": "LD8913聚晶"
      },
      {
        "id": 4,
        "title": "颜色",
        "value": "黄色"
      },
      {
        "id": 5,
        "title": "规格",
        "value": "800*800"
      },
      {
        "id": 6,
        "title": "编码",
        "value": "ZA010092"
      }
    ]
  },

  // 滚动切换标签样式
  switchTabs: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 切换收藏
  toggleCollect:function(e){
    this.setData({
      isCollect: !this.data.isCollect
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: `当前页面Id${options.id}`
    })
  },

  // 加入预算
  join:function(){
    this.setData({
      hiddenModal:false
    })
  },

  // 关闭提示弹窗
  closeModal:function(){
    this.setData({
      hiddenModal: true
    })
  },

  comfirm:function(){
    this.setData({
      hiddenModal: true
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