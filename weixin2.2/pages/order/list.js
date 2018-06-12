// pages/order/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fReceiptNo:'',
    fSaleOrderID: '',
    DelIcon: '../../image/order/del.png',
    defaltimg: '../../image/default-img.png',
    DataList:[],
    fAmount: 0,
    flag:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.fTypeCategory,
    })
    that.setData({
      fSaleOrderID: options.fSaleOrderID
    })
    that.GetInfoData()
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
     * 页面相关事件处理函数--getdata
     */
  GetInfoData: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/shopOrder/queryOrderDetail.do', //url 不能出现端口号
      data: {
        fSaleOrderID: that.data.fSaleOrderID,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          fReceiptNo: res.data.data.fReceiptNo,
          DataList: res.data.data.list,
          fAmount: res.data.data.fAmount,
          flag: res.data.data.flag
        })
      },
      method: 'GET'
    });
  },
  /**
  * 页面相关事件处理函数--跳转详情列表
  */
  ToEvaluate: function (e) {
    wx.navigateTo({
      url: 'evaluate?fSaleOrderID=' + e.currentTarget.dataset.fid,
      success: function (res) {
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

  }
})
