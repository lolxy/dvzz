// pages/main/budget/index/index.js
const app = getApp();
const api = require("../../../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCode:'',
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
    orderStatus:false,
    hiddenComfirmModal: true,
    modalContent: "",
    selectArr:[],
    checkAll:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentCode: options.code,
      currentMenu: options.subcode,
      toMenuView: `item${options.subcode}`
    }) 
    this.getBudgetCatList()
  },

  onShow: function () { 
    if (this.data.currentSubMenu){
      this.getBudgetGoodsList()
    }
  },

  // 获取二级类别
  getCurrentMenuData:function(e){
    this.setData({
      isComfirm: false,
      isManager: false,
      currentMenu:e.currentTarget.dataset.code,
      toMenuView:e.currentTarget.id
    })
    this.getBudgetByIdCatList()
  },

  // 获取三级类别
  getCurrentSubMenuData: function (e) {
    this.setData({
      isComfirm: false,
      isManager: false,
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
      isComfirm: true
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
      modalContent: "确定要自购吗？",
      comfirmType:"selfBuy"
    })
  },

  // 是否删除
  dellItem: function () {
    this.setData({
      hiddenComfirmModal: false,
      modalContent: "确定要删除吗？",
      comfirmType: "dell"
    })
  },
  // 执行提示框确认动作
  actionComfirm: function (e) {
    let arr = this.data.selectArr
    let comfirmType = this.data.comfirmType
    this.setData({
      hiddenComfirmModal: e.detail
    })
    if (!arr.length) {
      wx.showToast({
        title: '请选择您要操作的选材项',
        icon: 'none'
      })
      return false
    }
    if (comfirmType == 'selfBuy') {
      api.selfBuy({
        data: {
          ids: arr
        },
        method: 'post',
        success: (res) => {
          wx.showToast({
            title: '当前选择的选项自购成功！',
            icon: 'none'
          })
          this.getBudgetGoodsList()
        }
      })
    }
    if (comfirmType == 'dell') {
      api.dellSelectMat({
        data: {
          fSelectMatDetailID: arr.join(',')
        },
        success: (res) => {
          wx.showToast({
            title: '当前选择的选项删除成功！',
            icon: 'none'
          })
          this.getBudgetGoodsList()
        }
      })
    }
  },

  // 执行提示框取消动作
  actionClose: function (e) {
    this.setData({
      hiddenComfirmModal: e.detail
    })
  },

  // 取消管理
  canceManager: function () {
    this.setData({
      isManager: false
    })
    this.clearAllChecked()
  },

  // 获取预算分类列表
  getBudgetCatList: function () {
    api.getBudgetCatList({
      data: {
        fSelectMatID: app.globalData.fSelectMatID,
        fCode: this.data.currentCode
      },
      success: (res) => {
        let menuList = res.data.data
        let currentMenu = this.data.currentMenu
        this.setData({
          menuList: menuList,
          currentMenu: currentMenu ?currentMenu:menuList[0].fCode
        })
        if (this.data.currentMenu){
          this.getBudgetByIdCatList()
        }
      }
    })
  },

  // 获取当前二级分类下的三级分类列表
  getBudgetByIdCatList:function(){
    api.getBudgetByIdCatList({
      data:{
        fSelectMatID: app.globalData.fSelectMatID,
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
        fSelectMatID: app.globalData.fSelectMatID,
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
          item.checked = false
          if (item.fAmount){
            sumPrice = sumPrice + parseFloat(item.fAmount)
          } 
        })
        this.setData({
          checkAll:false,
          selectArr:[],
          managerGoodsList: goodsList,
          goodsList: newGoodsList,
          sumPrice: sumPrice
        })
      }
    })
  },

  // 跳转到当前选材明细页
  gotoSelectMatDetail:function(e){
    wx.navigateTo({
      url: `/pages/main/budget/detail/index?id=${e.currentTarget.dataset.selectid}&typeId=${this.data.currentSubMenuId}&title=${e.currentTarget.dataset.title}`
    })
  },

  // 跳转到选材商品列表页
  gotoGoodsList:function(e){
    wx.navigateTo({
      url: `/pages/main/list/index?code1=${this.data.currentCode}&&code2=${this.data.currentMenu}&code3=${this.data.currentSubMenu}&displayType=budget&catname=${this.data.currentSubMenuName}&selectid=${e.currentTarget.dataset.selectid}`
    })
  },

  // 单个选择元素
  selectItem:function(e){
    let value = e.currentTarget.dataset.checked
    let index = e.currentTarget.dataset.index
    let arr = this.data.selectArr
    let managerGoodsList = this.data.managerGoodsList
    let checked = managerGoodsList[index].checked
    managerGoodsList[index].checked = !checked
    if (checked){
      arr.splice(arr.findIndex(item => item === value), 1)
    }else{
      arr.push(value)
    }
    this.setData({
      managerGoodsList: managerGoodsList,
      checkAll: arr.length === managerGoodsList.length ? true:false,
      selectArr: arr
    })
  },
  // 全部选择元素
  selectAllItem:function(){
    let arr = this.data.managerGoodsList.map(item=>{
      return item.fSelectMatDetailID
    })
    let checkAll = !this.data.checkAll
    if(checkAll){
      this.data.managerGoodsList.forEach(item=>{
        item.checked = true
      })
    }else{
      this.data.managerGoodsList.forEach(item => {
        item.checked = false
      })
    }
    this.setData({
      managerGoodsList: this.data.managerGoodsList,
      checkAll: checkAll,
      selectArr: checkAll?arr:[]
    })
  },

  // 清空全部选择
  clearAllChecked:function(){
    this.data.managerGoodsList.forEach(item => {
      item.checked = false
    })
    this.setData({
      managerGoodsList: this.data.managerGoodsList,
      checkAll: false,
      selectArr:[]
    })
  },

  // 扫码选材
  scanCode: function (e) {
    let fSelectMatDetailID = e.currentTarget.dataset.selectid
    let amount = e.currentTarget.dataset.amount
    wx.scanCode({
      success: function (res) {
        if (res.result) {
          api.getScanCode({
            data: {
              fMatCode: res.result,
              fSelectMatDetailID: fSelectMatDetailID
            },
            success: (res) => {
              if (res.data.data.fMatID) {
                wx.navigateTo({
                  url: `/pages/main/detail/index?id=${res.data.data.fMatID}&displayType=budget&amount=${amount}&selectMatDetailId=${fSelectMatDetailID}`
                })
              } else {
                wx.showToast({
                  title: '扫码有误，请重新扫码！',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  },

  // 生成订单
  addSaleorder:function(){
    let arr = this.data.selectArr
    if (!arr.length) {
      wx.showToast({
        title: '请选择您要操作的选材项',
        icon: 'none'
      })
      return false
    }else{
      api.addSaleorder({
        data:{
          ids:arr,
          fSelectMatID: app.globalData.fSelectMatID,
          fID: this.data.currentSubMenuId
        },
        method:'post',
        success:(res)=>{
          wx.showToast({
            title: '订单生成成功！',
            icon: 'none'
          })
          // this.setData({
          //   orderStatus:true
          // })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})