// pages/index/auxiliary/grkd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs: [{
      TabsName: '基础辅材',
      TabIcon: '../../../image/default-img.png',
      LinkUrl: 'base'
    },{
      TabsName: '水电辅材',
      TabIcon: '../../../image/default-img.png',
      LinkUrl: ''
    },{
      TabsName: '泥土辅材',
      TabIcon: '../../../image/default-img.png',
      LinkUrl: ''
    },{
      TabsName: '木作辅材',
      TabIcon: '../../../image/default-img.png',
      LinkUrl: ''
    },{
      TabsName: '油漆辅材',
      TabIcon: '../../../image/default-img.png',
      LinkUrl: ''
    }],
    StatusList: [{
      StatusName: '电线类'
    }, {
      StatusName: '线管类'
    }, {
      StatusName: '给水管'
    }, {
      StatusName: '下水管类'
    }, {
      StatusName: '非常规水电'
    }],
    TableDataList:[{
      ItemName:'热水管',
      ItemNorms: '20*28（白）',
      ItemBrand: '日丰',
      ItemPrice: 25.5,
      ItemUnit: '捆',
      ItemID: '01'
    },{
      ItemName:'热水管',
      ItemNorms: '25*25*4',
      ItemBrand: '日丰',
      ItemPrice: 25,
      ItemUnit: '捆',
      ItemID: '02'
    }],
    flag: 0,
    CurrentTab:0,
    num:0,
    ArrowRight: '../../../image/jt1.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工人开单',
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
   * 页面相关事件处理函数--切换大类tabs
   */
  TabChange: function (e) {
    var that = this
    if (e.currentTarget.dataset.index === that.data.CurrentTab) {
      that.setData({ num: 0 })
    } else {
      that.setData({
        CurrentTab: e.currentTarget.dataset.index,
        num: 0
      })
    }
  },
  /**
   * 页面相关事件处理函数--切换大类flag
   */
  ChangeFlags: function (e) {
    var that = this
    if (e.currentTarget.dataset.flag === that.data.flag) {
      that.setData({ num: 0 })
    } else {
      that.setData({
        flag: e.currentTarget.dataset.flag,
        num: 0
      })
    }
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