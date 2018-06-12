// pages/index/auxiliary/brand.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TableDataList:[],
    fID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择品牌',
    })
    this.setData({
      fID: options.fID
    })
    this.GetBrandList()
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
  formSubmit:  function(e) {
    var that = this
    //特殊处理提交列表型表单
    var postdata = {
      fID: that.data.fID,
      rels:[]
    }
    for (var i = 0; i < e.detail.value['categorynum']; i++) {
      
      //利用中间变量组成键值对
      var listdata = {}
      //fMatColor、fBrandName 为实际提交的list中各item对应的各项name
      //category、brand 为页面中‘固定名称’+‘索引’name
      listdata['fMatColor'] = e.detail.value['category' + i] 
      listdata['fBrandName'] = e.detail.value['brand' + i] //fBrandName 为实际提交name
      //将键值对拼接到数组中
      postdata.rels[i] = listdata
    }

    wx.request({
      url: app.globalData.posturl + 'wx/shop/confirmBrand.do', //url 不能出现端口号
      //url: 'http://dwzs.4kb.cn/APPDWERP/wx/shop/confirmBrand.do',
      data: postdata,
      header: {
        'content-type': 'application/json' // 默认值
      },
      complete: function (res) {
        wx.setStorage({
          key: "BrankData",
          data: res.data.data,
          success: function (res3) {
            wx.navigateBack({})
          }
        }) 
      },
      method: 'POST'
    });
  },
  
  /**
   * 页面相关事件处理函数--get品牌选择
   */
  GetBrandList: function () {
    var that = this
    wx.request({
      url: app.globalData.posturl + 'wx/shop/queryBrandList.do', //url 不能出现端口号
      data:{fID: that.data.fID},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          TableDataList: res.data.data
        })
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数----changeactive
   */
  changeindex: function (e) {
    var that = this
    for (let i = 0; i < that.data.TableDataList[e.currentTarget.dataset.idx].list.length;i++) {
      var mitem = 'TableDataList[' + e.currentTarget.dataset.idx + '].list[' + i + '].fIsDefault'
      that.setData({
        [mitem]: 0
      })
    }
    var nitem = 'TableDataList[' + e.currentTarget.dataset.idx + '].list[' + e.currentTarget.dataset.idy + '].fIsDefault'
    that.setData({
      [nitem]: 1
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