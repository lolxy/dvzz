// pages/main/budget/index/index.js
const api = require("../../../../utils/api.js");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCode:"",
    currentMenu:"",
    selectMatType:'',
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
        app.globalData.fSelectMatID = res.data.data.fSelectMatID
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
        fSelectMatID: app.globalData.fSelectMatID,
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
      url: `/pages/main/budget/xuancai/index?code=${this.data.currentCode}&subcode=${currentSubCat}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectMatType: options.type
    })
  },

  // 判断是否已登录以及获取对应的选材数据
  getSelectMat:function(){
    if (this.data.selectMatType === 'virtual') {
      this.getTouristExpInfo()
    } else {
      let APPUserInfo = wx.getStorageSync('APPUserInfo') || {}
      if (!APPUserInfo.fSelectMatID) {
        wx.redirectTo({
          url: '/pages/mine/login',
        })
      } else {
        app.globalData.fSelectMatID = APPUserInfo.fSelectMatID
      }
    }
  },

  onShow: function () {
    this.getBudgetCate()
    this.getSelectMat()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})