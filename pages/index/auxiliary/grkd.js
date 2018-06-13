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
    CurrentCode: app.globalData.CurrentfID,
    CurrentfID: app.globalData.CurrentfID,
    ArrowRight: '../../../image/jt1.png',
    Isdefault: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工人开单',
    })
    this.setData ({
      Isdefault: options.type
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
    var that = this
    that.GetBillType()
    if (that.data.type==1){
      that.GetBillProject()
    }else {
      wx.getStorage({
        key: 'BrankData',
        success: function (res) {
          if (res.data) {
            that.setData({
              StatusList: res.data
            })
            that.showtabledata() 
          }
        },
        fail: function () {
          that.GetBillProject()
        }
      })
    }
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
        if (that.data.type == 1){
          that.setData({
            CurrentfID: res.data.data[0].fID, //初始化当前大类
            CurrentCode: res.data.data[0].fCode
          })
          app.globalData.CurrentfID = res.data.data[0].fID
          app.globalData.CurrentCode = res.data.data[0].fCode
        }else {
          that.setData({
            CurrentfID: app.globalData.CurrentfID,
            CurrentCode: app.globalData.CurrentCode
          })
        }
        console.log(res.data)
        console.log(app.globalData.CurrentfID)
        console.log(that.data.CurrentfID)
        console.log(app.globalData.CurrentCode)
        console.log(that.data.CurrentCode)
        that.setData({
          tabs: res.data.data
        })
        wx.getStorage({
          key: 'BrankData',
          success: function (res) {
            if (res.data.fUserID) {
              that.setData({
                StatusList: res.data
              })
            }
          },
          fail: function () {
            that.GetBillProject()
          }
        })
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
        that.setData({
          StatusList: res.data.data
        })
        that.showtabledata()   
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--切换大类tabs
   */
  TabChange: function (e) {
    var that = this
    if (e.currentTarget.dataset.CurrentfID === that.data.CurrentfID) {
    } else {
      that.setData({
        CurrentCode: e.currentTarget.dataset.tabcode,
        CurrentfID: e.currentTarget.dataset.fid,
        flag: 0,
        fMPDItemlist:[[]]
      })
      app.globalData.CurrentfID = e.currentTarget.dataset.fid,
      app.globalData.CurrentCode = e.currentTarget.dataset.tabcode,
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
      }
    })
  },
  ToShopCity: function(e) {
    var that = this
    wx.navigateTo({
      url: 'pages/main/list/index?fID=' + e.currentTarget.dataset.fid,
      success: function (res) {    
      }
    })
  },
  showtabledata: function (e) {
    var that = this    
    if (that.data.StatusList.length>0){
      var item = that.data.StatusList
      for (let i = 0; i < item.length;i++){
        if (item[i].list){
          var itemlist = item[i].list
          var nitemtype = 'fMPDItemlist[' + i + '].fType'
          that.setData({
            [nitemtype]: item[i].fType
          })
          var k=0
          for (let j = 0; j < itemlist.length;j++)  {
            if (j==0){
              var mitem = 'fMPDItemlist[' + i + '].list['+k+']'
              that.setData({
                [mitem]: item[i].list[j].fMPDItem
              })
              k++
            }else{
              if (item[i].list[j].fMPDItem != item[i].list[j-1].fMPDItem){
                var mitemfMPDItem = 'fMPDItemlist[' + i + '].list[' + k + ']'
                that.setData({
                  [mitemfMPDItem]: item[i].list[j].fMPDItem
                })
                k++
              }
            }
          } 
        } else{
        let nitem ='fMPDItemlist[' + i + ']'
          that.setData({
            [nitem]: []
          })
        }
      }
    }else {
      that.setData({
        fMPDItemlist: [[]]
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