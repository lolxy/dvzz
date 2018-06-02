// pages/index/auxiliary/brand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TableDataList:[{
      ItemName: '电线类',
      branlist: [{
        brandName: '太阳',
        brandcode: 'a01'
      },{
        brandName: '飞雕',
        brandcode: 'a02'
      }],
      currentbrand: '0',
      id:0
    },{
      ItemName: '线管类',
      branlist: [{
        brandName: '集友',
        brandcode: 'b01'
      },{
        brandName: '伟星',
        brandcode: 'b02'
      },{
        brandName: '亚通',
        brandcode: 'b03'
      }],
      currentbrand: '0',
      id: 1
    },{
      ItemName: '给水管',
      branlist: [{
        brandName: '日丰',
        brandcode: 'c01'
      },{
        brandName: '伟星',
        brandcode: 'c02'
      }],
      currentbrand: '0',
      id: 2
    }]
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
  formSubmit:  function(e) {
    var that = this
    //console.log(e.detail.value)
    var postdata = {}
    //var APPUserInfo = wx.getStorageSync('APPUserInfo') || {}
    //console.log(APPUserInfo)
    postdata.rateList = new Array()
    postdata.fUserID = '0CB59692C4FE4143A174F2699F6FA911'
    postdata.fSaleOrderID = that.data.fSaleOrderID
    postdata.fRateContent = e.detail.value.fRateContent
    for (var i = 0; i < e.detail.value.rateListlength; i++) {
      //拼接key
      var listkey = e.detail.value['rateListkey' + i]
      //拼接value
      var listvalue = e.detail.value['rateListvalue' + i]
      //利用中间变量组成键值对
      let listdata = {}
      listdata['fEvaluateRateItemID'] = listkey
      listdata['fEvaluateRateScoreID'] = listvalue
      //将键值对拼接到数组中
      postdata.rateList[i] = listdata
    }
    //console.log(postdata)
    wx.request({
      url: app.globalData.posturl + 'wx/shopCity/addEvaluate.do', //url 不能出现端口号
      data: postdata,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
      },
      method: 'POST'
    });
  },
  
  /**
   * 页面相关事件处理函数----是否匿名提交
   */
  radioChange: function(e) {
    var that = this
    var n = e.target.dataset.idx 
    console.log(n)
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