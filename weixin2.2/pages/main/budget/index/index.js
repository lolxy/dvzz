// pages/main/budget/index/index.js
const api = require("../../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCode:"",
    currentMenu:"",
    fSelectMatID:"",
    fCustomerId:"",
    rightIcon:'./image/right.png',
    mapIcon:'./image/map.png',
    sumPrice:0,
    menuList:[],
    xcList:[]
  },

  // 获取游客信息
  getTouristExpInfo:function(){
    const self = this
    api.getTouristExpInfo({
      data:{
        fOpenID:4546545646
      },
      success:(res)=>{
        self.setData({
          fSelectMatID: res.data.data.fSelectMatID,
          fCustomerId: res.data.data.fCustomerID
        })
        self.getBudgetCate()
      }
    })
  },

  // 获取预算分类
  getBudgetCate:function(){
    const self = this
    api.getBudgetCate({
      success:(res)=>{
        let currentCode = res.data.data[0].fCode
        let currentMenu = res.data.data[0].fValue
        self.setData({
          menuList:res.data.data,
          currentCode: currentCode,
          currentMenu: currentMenu
        })
        self.getBudgetCatList()
      }
    })
  },

  // 获取预算分类列表
  getBudgetCatList: function () {
    api.getBudgetCatList({
      data:{
        fSelectMatID: this.data.fSelectMatID,
        fCode:this.data.currentCode      
      },
      success: (res) => {
        let xcList = res.data.data
        let sumPrice = 0
        xcList.forEach(item => {
          sumPrice = sumPrice + parseInt(item.fAmount)
        })
        this.setData({
          xcList: xcList,
          sumPrice: sumPrice
        })
      }
    })
  },

  getCurrentMenuData:function(e){
    this.setData({
      currentCode: e.currentTarget.dataset.code,
      currentMenu: e.currentTarget.dataset.fvalue
    })
    this.getBudgetCatList()
  },

  // 跳转对应分类的选材页面
  gotoPage:function(e){
    let currentSubCat = e.currentTarget.dataset.subcode
    wx.navigateTo({
      url: `/pages/main/budget/xuancai/index?code=${this.data.currentCode}&subcode=${currentSubCat}&fSelectMatID=${this.data.fSelectMatID}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === 'virtual'){
      this.getTouristExpInfo()
    }else{
      this.setData({
        fSelectMatID:'ff8080815ea21732015ebd497dce192f'
      })
      this.getBudgetCate()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})