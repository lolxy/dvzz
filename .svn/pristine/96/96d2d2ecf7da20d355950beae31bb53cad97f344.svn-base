// pages/ysty/zxjc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menulist:[{
      fType1Name: "一级分类名称",
      fType1Code: "01",
      fImageUrl: "../../image/top-icon1.png",
      data2:[{
        fType2Name: "二级分类名称",
        fAmount: "金额",
        fType2Code: "二级分类编码",
        fSelectMatID: "选材ID0",
        fCustomerID: "客户ID",
        fProjectID: "工地ID",
        data4: [{
          fType3Name: "三级分类名称",
          fType3Code: "三级分类编码0",
          fType2Code: "二级分类编码",
				  fSelectMatID: "选材ID1-1",
          fType2Name: "二级分类名称"
        }] 
      }] 
    }],
    current1: 1,
    current2: 0,
    current3: 0,
    currentfsmid: 'ff80808162bec37b0162c1bf25000002',
    currentft3c: '',
    currentft3cn:'',
    currentType1Code:'01',
    fAmount: 0,
    itemlist:[{      
      fSpace:'客餐厅',
      fProjectID:'',
      fPosition:'地面',
      fSelectMatDetailID:'',
      fAmount: 0
    }],
    qricon:'../../image/qrcode-icon.png',
    righticon: '../../image/jt1.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.data.current1 + '二级' + that.data.current2 + '三级' + that.data.current3)
    //that.setData({
    //  currentfsmid: that.data.menulist[that.data.current1].data2[that.data.current2].fSelectMatID,
    //  currentft3c: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Code,
    //  currentft3cn: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Name
    //})
    this.getdata1()
    
    
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
  * 页面相关事件处理函数--顶部一级菜单点击切换
  */
  getdata1: function (e) {
    var that = this
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/app/selectmat/queryBudgetType.do', //url 不能出现端口号
      data: { fSelectMatID: that.data.currentfsmid},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({ menulist: res.data.data })
        if (that.data.current1 > 0 && that.data.current1 < 4 && that.data.menulist[that.data.current1].data2.length > 0) {
           that.setData({
              currentft3c: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Code
            })
        }
        that.getdata2()
      },
      method: 'GET'
    });
  },
  getdata2: function (e) {
    var that = this
    wx.request({
      url: 'https://www.dovzs.com/APPDWERP/app/selectmat/queryType3.do', //url 不能出现端口号
      data: { 
        fSelectMatID: that.data.currentfsmid,
        fType3Code: that.data.currentft3c
        },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ 
          fAmount: res.data.data.fAmount,
          itemlist: res.data.data.list
        })
      },
      method: 'GET'
    });
  },
  /**
   * 页面相关事件处理函数--顶部一级菜单点击切换
   */
  changedata: function (e) {
    var that = this
    //切换active类
    if (that.data.current1 == e.currentTarget.dataset.current) {
      return false;
    }else {
      that.setData({
        current1: e.currentTarget.dataset.current,
        current2: 0,
        current3: 0,
      })
    }
    if (that.data.current1 > 0 && that.data.current1 < 4){
    //切换二级分类和一级分类时 三个参数均有变化
      if (that.data.menulist[that.data.current1].data2.length > 0 && that.data.menulist[that.data.current1].data2[that.data.current2].data4.length > 0){
        that.setData({
        currentfsmid: that.data.menulist[that.data.current1].data2[that.data.current2].fSelectMatID,
        currentft3c: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Code,
        currentft3cn: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Name
      })
      }
    }
    that.getdata2()
    //console.log(that.data.currentfsmid + '小类id' + that.data.currentft3c)
  },
  /**
   * 页面相关事件处理函数--顶部二级菜单点击切换
   */
  changedata2: function (e) {
    var that = this
    //切换active类
    if (that.data.current2 == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        current2: e.currentTarget.dataset.current,
        current3: 0,
      })
    }
    
    //切换二级分类和一级分类时 三个参数均有变化
    that.setData({
      currentfsmid: that.data.menulist[that.data.current1].data2[that.data.current2].fSelectMatID,
      currentft3c: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Code,
      currentft3cn: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Name
    })
    that.getdata2()    
  },
  /**
   * 页面相关事件处理函数--顶部三级菜单点击切换
   */
  changedata3: function (e) {
    var that = this
    //切换active类
    if (that.data.current3 == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        current3: e.currentTarget.dataset.current
      })
    }
    //切换三级分类时选材ID不变
    that.setData({
      //currentfsmid: that.data.menulist[that.data.current1].data2[that.data.current2].fSelectMatID,
      currentft3c: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Code,
      currentft3cn: that.data.menulist[that.data.current1].data2[that.data.current2].data4[that.data.current3].fType3Name
    })
    that.getdata2()    
  },
  /**
   * 页面相关事件处理函数--顶部三级菜单点击切换
   */
  jumpsmol: function (e) {
    wx.navigateTo({
      url: 'detail?fSeriesCode=' + e.currentTarget.dataset.fseriescode + '&fSelectMatDetailID=' + e.currentTarget.dataset.fsmdid,
      success: function (res) {
        //console.log(res.data);        
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