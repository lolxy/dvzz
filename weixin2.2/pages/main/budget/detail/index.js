// pages/detail/detail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenComfirmModal: true,
    modalContent: "",
    hiddenModal: true,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight - 10,
    dellIcon:'./image/dell.png',
    copyIcon: './image/copy.png',
    buyIcon:'./image/buy.png',
    imgUrls: [],
    collectList:[
      {
        "id":1,
        "title":"多层黑色立柜",
        "price":"2330",
        "imgurl":"./image/fav.png"
      },
      {
        "id": 1,
        "title": "多层黑色立柜",
        "price": "2330",
        "imgurl": "./image/fav.png"
      },
      {
        "id": 1,
        "title": "多层黑色立柜",
        "price": "2330",
        "imgurl": "./image/fav.png"
      },
      {
        "id": 1,
        "title": "多层黑色立柜",
        "price": "2330",
        "imgurl": "./image/fav.png"
      },
      {
        "id": 1,
        "title": "多层黑色立柜",
        "price": "2330",
        "imgurl": "./image/fav.png"
      },
      {
        "id": 1,
        "title": "多层黑色立柜",
        "price": "2330",
        "imgurl": "./image/fav.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: `当前页面Id${options.id}`
    })
  },

  // 打开复制弹窗
  openCopyModal:function() {
    this.setData({
      hiddenModal: false
    })
  },

  // 执行弹窗的状态切换
  actionModal: function (e) {
    this.setData({
      hiddenModal: e.detail
    })
  },

  // 跳到选材页面
  gotoXuancai:function(){
    wx.navigateTo({
      url: '/pages/main/budget/productList/index'
    })
  },

  // 是否删除
  dellItem: function () {
    this.setData({
      hiddenComfirmModal: false,
      modalContent: "确定要删除吗？"
    })
  },

  // 执行提示框确认动作
  actionComfirmModal: function (e) {
    this.setData({
      hiddenComfirmModal: e.detail
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