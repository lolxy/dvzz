// pages/categories/categories.js
const app = getApp()
const api = require('../../../../utils/api.js');
const util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[]
  },

  // 获取分类列表
  getCategoryList: function () {
    api.getCategoryList({
      success: (res) => {
        this.setData({
          categoryList: res.data.data
        })
      }
    });
  },

  // 搜索商品列表
  onSearch:function(e){
    wx.navigateTo({
      url: `/pages/main/mall/list/index?keyword=${e.detail}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
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