// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll:true,
    scrollTop:0,
    currentType:"goods",
    filterIcon:"./image/filter.png",
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3', 'item4']
  },

  menuClick:function(e){
    this.setData({
      currentType: e.target.dataset.type
    })
  },

  onUpdateScrollStatus:function(e){
    this.setData({
      isScroll: !this.data.isScroll,
      scrollTop:0
    })
  },

  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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