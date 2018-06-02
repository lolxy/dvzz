// pages/index/aborprice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Searchdata: '',
    tabs: [],
    currenttab: 0,
    currentid: '',
    datalist: [],
    num: 0,
    maxpage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '看工价',
    })
    this.getitemtype()
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
  //切换tabs
  TabsChange: function (e) {
    this.setData({
      currenttab: e.currentTarget.dataset.index,
      currentcode: e.currentTarget.dataset.fcode,
      num: 0
    })
    this.GetDataList()
  },
  /**
   * 页面相关事件处理函数--获取data列表
   */
  GetDataList: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl +'wx/shop/priceMatList.do', //url 不能出现端口号
      data: {
        fCode: that.data.currentcode,
        num: that.data.num
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {        
        if (that.data.num > 0) {
          let n = that.data.datalist.length
          for (let i = 0; i < res.data.data.length; i++) {
            let item = 'datalist[' + (i + n) + ']'
            that.setData({
              [item]: res.data.data[i],
              maxpage: res.data.totalPage
            })
          }
        } else {
          that.setData({
            datalist: res.data.data,
            maxpage: res.data.totalPage
          })
        }
      },
      method: 'GET'
    });
  },

  /**
   * 页面相关事件处理函数--获取类别
   */
  getitemtype: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + '/wx/shop/priceType.do', //url 不能出现端口号
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          tabs: res.data.data,
          currentcode: res.data.data[that.data.currenttab].fCode
        })
        that.GetDataList()
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--跳转到详情页
   */
  ToFindDetail: function (e) {
    wx.navigateTo({
      url: 'finddetail?fEmployID=' + e.currentTarget.dataset.feid,
      success: function (res) {
        //console.log(res.data);        
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.setData({
      num: 0
    })
    that.GetDataList() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.num == that.data.maxpage) {
      wx.showLoading({
        title: '已经到底了',
        mask: true
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      that.setData({
        num: that.data.num + 1
      })
      that.GetDataList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})