// pages/main/budget/index/index.js
const app = getApp();
const api = require("../../../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    currentType:'',
    currentDetailId:'',
    currentCode:'',
    toMenuView: "item0",
    toMenuSubView: "subitem0",
    sumPrice:0,
    orderList:[],
    orderDetailList:[],
    formateOrderDetailList:[]
  },

  getCurrentType: function (e) {
    let currentIndex = e.currentTarget.dataset.index
    let orderList = this.data.orderList
    this.setData({
      currentIndex: currentIndex,
      toMenuSubView: "subitem0",
      currentCode: orderList[currentIndex].fCode
    })
    this.getConsumeType()
  },

  getcurrentCodeData: function (e) {
    this.setData({
      currentCode: e.currentTarget.dataset.code,
      currentDetailId: e.currentTarget.dataset.id,
      toMenuSubView: `subitem${e.currentTarget.dataset.index}`
    })
    this.getConsumeDetail()
  },

  // 获取我的消费分类
  getConsumeType:function(){
    api.getConsumeType({
      data:{
        fCustomerID: app.globalData.fCustomerID
      },
      success:(res)=>{
        let orderList = res.data.data || []
        let sumPrice = 0
        let currentType = ''
        orderList.forEach(item=>{
          sumPrice = sumPrice + parseFloat(item.fAmount)
        })
        if (orderList.length){
          currentType = orderList[0].fValue.indexOf('主材')>-1?'zhucai':'fucai'
        }
        this.setData({
          orderList: orderList,
          currentDetailId: orderList[0].list[0].fID,
          currentCode: orderList[0].list[0].fCode,
          sumPrice: sumPrice,
          currentType: currentType
        })
        this.getConsumeDetail()
      }
    })
  },

  // 获取我的消费明细
  getConsumeDetail: function () {
    api.getConsumeDetail({
      data: {
        fCustomerID: app.globalData.fCustomerID,
        fCode: this.data.currentCode
      },
      success: (res) => {
        let orderDetailList = res.data.data
        let formateOrderDetailList = []
        let nameArr = orderDetailList.map(item=>{
          return item.fMatName
        })
        nameArr = new Set(nameArr)
        nameArr.forEach(item=>{
          let children = orderDetailList.filter((elem) => elem.fMatName === item)
          let goodsJson = {
            'fMatName': item,
            'children': children
          }
          formateOrderDetailList.push(goodsJson)
        })
        this.setData({
          orderDetailList: res.data.data,
          formateOrderDetailList: formateOrderDetailList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getConsumeType()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})