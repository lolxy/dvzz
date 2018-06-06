// pages/index/auxiliary/grkd.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    StatusList: [],
    fMPDItemlist:[[]],
    flag: 0,
    CurrentTab:0,
    CurrentfID: '',
    ArrowRight: '../../../image/jt1.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工人开单',
    })
    this.GetBillType()
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
   * 页面相关事件处理函数--get大类tabs
   */
  GetBillType: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/shop/openBillType.do', //url 不能出现端口号
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          tabs: res.data.data,
          CurrentfID: res.data.data[0].fID
        })
        that.GetBillProject()
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--get项目tabs
   */
  GetBillProject: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/shop/openBillProject.do', //url 不能出现端口号
      data: { fID: that.data.CurrentfID},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          StatusList: res.data.data
        })
        if (res.data.data.length > 0 && res.data.data[that.data.flag].list.length >0) {
          var hold = res.data.data[that.data.flag].list[0].fMPDItem
          let init = 'fMPDItemlist[' + that.data.flag + '][0]'
          that.setData({
            [init]: res.data.data[that.data.flag].list[0].fMPDItem
          })
          var n=1
          for (let i = 1; i < res.data.data[that.data.flag].list.length;i++) {
            if (res.data.data[that.data.flag].list[i].fMPDItem != hold) {
              hold = res.data.data[that.data.flag].list[i].fMPDItem
              let item = 'fMPDItemlist['+that.data.flag+'][' + n +']'
              that.setData({
                [item]: res.data.data[that.data.flag].list[i].fMPDItem
              })
              n++
            }
          }
          console.log(that.data.fMPDItemlist)
        }
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--切换大类tabs
   */
  TabChange: function (e) {
    var that = this
    if (e.currentTarget.dataset.index === that.data.CurrentTab) {
    } else {
      that.setData({
        CurrentTab: e.currentTarget.dataset.index,
        CurrentfID: e.currentTarget.dataset.fid,
        flag: 0,
        fMPDItemlist:[[]]
      })
      that.GetBillProject()
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
  * 页面相关事件处理函数--跳转详情
  */
  ToDetail: function (e) {
    var that = this
    wx.navigateTo({
      url: 'detail?fMatName=' + e.currentTarget.dataset.fmname + '&fNorms=' + e.currentTarget.dataset.fnorms + '&fPrice=' + e.currentTarget.dataset.fprice + '&fBrandName=' + e.currentTarget.dataset.fbname + '&fConf=' + e.currentTarget.dataset.fconf + '&fUrl=' + e.currentTarget.dataset.furl,
      success: function (res) {
        //console.log(res.data);       
      }
    })
  },
  
  /**
  * 页面相关事件处理函数--跳转详情
  */
  ToBranks: function(e) {
    var that = this
    wx.navigateTo({
      url: 'brand?fID=' + e.currentTarget.dataset.fid,
      success: function (res) {
        //console.log(res.data);       
      }
    })
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