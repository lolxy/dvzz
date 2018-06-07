// pages/main/budget/index/index.js
const api = require("../../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCode:"",
    currentMenu:"",
    rightIcon:'./image/right.png',
    mapIcon:'./image/map.png',
    sumPrice:0,
    menuList:[],
    xcList:[]
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
        this.getBudgetCatList()
      }
    })
  },

  // 获取预算分类列表
  getBudgetCatList: function () {
    api.getBudgetCatList({
      data:{
        fCustomerID:'',
        fCode:this.data.currentCode      
      },
      success: (res) => {
        this.setData({
          xcList: res.data.data
        })
      }
    })
  },

  getCurrentMenuData:function(e){
    this.setData({
      currentCode: e.currentTarget.dataset.code,
      currentMenu:e.currentTarget.dataset.name
    })
    this.getBudgetCatList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBudgetCate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let sum = 0
    this.data.xcList.forEach((item)=>{
       sum = sum + parseInt(item.price)
    })
    this.setData({
      sumPrice:sum
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