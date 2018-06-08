// pages/main/budget/index/index.js
const app = getApp();
const api = require("../../../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCode:'',
    fSelectMatID:'',
    currentMenu:'',
    currentSubMenu:'',
    currentSubMenuId:'',
    currentSubMenuName:'',
    switchType:1,
    toMenuView: "",
    toMenuSubView: "",
    addIcon: './image/add.png',
    sysIcon: './image/qrimg.png',
    managerIcon: './image/manager.png',
    rightIcon: './image/right.png',
    mapIcon: './image/map.png',
    cartIcon: './image/cart.png',
    dellIcon: './image/dell.png',
    windowWidth: app.systemInfo.windowWidth,
    sumPrice:0,
    hiddenModal:true,
    menuList:[],
    subMenuList:[],
    managerGoodsList:[],
    goodsList: [],
    isManager: false,
    isComfirm:false,
    hiddenComfirmModal: true,
    modalContent: ""
  },

  getCurrentMenuData:function(e){
    this.setData({
      currentMenu:e.currentTarget.dataset.code,
      toMenuView:e.currentTarget.id
    })
    this.getBudgetByIdCatList()
  },

  getCurrentSubMenuData: function (e) {
    this.setData({
      currentSubMenu: e.currentTarget.dataset.code,
      currentSubMenuId: e.currentTarget.dataset.id,
      currentSubMenuName: e.currentTarget.dataset.fvalue,
      toMenuSubView:e.currentTarget.id
    })
    this.getBudgetGoodsList()
  },

  // 切换选材类型
  getSwitchType:function(e){
    this.setData({
      switchType: e.currentTarget.dataset.type
    })
  },

  // 打开新增元素弹窗
  addItem:function(){
    this.setData({
      hiddenModal: false
    })
  },

  // 执行弹窗的状态切换
  actionModal:function(e){
    this.setData({
      hiddenModal: e.detail
    })
  },

  onUpdateList:function(e){
    this.getBudgetGoodsList()
  },

  // 确认是否生成订单
  comfirmOrder:function(){
    this.setData({
      isComfirm: !this.data.isComfirm
    })
  },

  //点击管理执行结果
  openManager: function () {
    this.setData({
      isManager: true
    })
  },

  // 是否自购确认
  goToselfBuy: function () {
    this.setData({
      hiddenComfirmModal: false,
      modalContent: "确定要自购吗？"
    })
  },

  // 是否删除
  dellItem: function () {
    this.setData({
      hiddenComfirmModal: false,
      modalContent: "确定要删除吗？"
    })
  },

  // 执行提示框确认动作
  actionComfirmModal: function (e) {
    this.setData({
      hiddenComfirmModal: e.detail
    })
  },

  // 取消管理
  canceManager: function () {
    this.setData({
      isManager: false
    })
    if (this.data.isBack) {
      wx.navigateBack()
    }
  },

  // 获取预算分类列表
  getBudgetCatList: function () {
    api.getBudgetCatList({
      data: {
        fSelectMatID: this.data.fSelectMatID,
        fCode: this.data.currentCode
      },
      success: (res) => {
        let menuList = res.data.data
        let currentMenu = this.data.currentMenu
        this.setData({
          menuList: menuList,
          currentMenu: currentMenu ?currentMenu:menuList[0].fCode
        })
        this.getBudgetByIdCatList()
      }
    })
  },

  // 获取当前二级分类下的三级分类列表
  getBudgetByIdCatList:function(){
    api.getBudgetByIdCatList({
      data:{
        fSelectMatID: this.data.fSelectMatID,
        fCode: this.data.currentMenu
      },
      success:(res)=>{
        let subMenuList = res.data.data
        this.setData({
          subMenuList: subMenuList,
          currentSubMenu:subMenuList[0].fCode,
          currentSubMenuId: subMenuList[0].fID,
          currentSubMenuName: subMenuList[0].fValue
        })
        this.getBudgetGoodsList()
      }
    })
  },

  // 获取主材预算产品列表
  getBudgetGoodsList:function(){
    api.getBudgetGoodsList({
      data:{
        fSelectMatID: this.data.fSelectMatID,
        fCode:this.data.currentSubMenu
      },
      success:(res)=>{
        let goodsList = res.data.data
        let newGoodsList = []
        let keyNameArr = goodsList.map(item => {
          return item.fSpace
        })
        let keyNameArrUniq = new Set(keyNameArr)
        keyNameArrUniq.forEach((item,index) => {
          let children = goodsList.filter((elem) => elem.fSpace === item)
          let goodsJson = {
            'spaceName': item,
            'children': children
          }
          newGoodsList.push(goodsJson)
        })
        let sumPrice = 0
        goodsList.forEach(item=>{
          if (item.fAmount){
            sumPrice = sumPrice + parseFloat(item.fAmount)
          } 
        })
        this.setData({
          managerGoodsList: goodsList,
          goodsList: newGoodsList,
          sumPrice: sumPrice
        })
      }
    })
  },

  // 跳转到当前选材明细页
  gotoSelectMatDetail:function(){
    wx.navigateTo({
      url: '/pages/main/budget/detail2/index'
    })
  },

  // 跳转到选材商品列表页
  gotoCatList:function(){
    wx.navigateTo({
      url: `/pages/main/list/index?code1=${this.data.currentCode}&&code2=${this.data.currentMenu}&code3=${this.data.currentSubMenu}&displayType=budget&catname=${this.data.currentSubMenuName}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentCode: options.code,
      currentMenu: options.subcode,
      fSelectMatID: options.fSelectMatID,
      toMenuView: `item${options.subcode}`
    })
    this.getBudgetCatList()
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