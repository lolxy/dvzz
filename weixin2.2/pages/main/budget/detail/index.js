// pages/detail/detail.js
//获取应用实例
const api = require("../../../../utils/api.js");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenComfirmModal: true,
    currentId:'',
    modalContent: "",
    hiddenModal: true,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight - 10,
    dellIcon:'./image/dell.png',
    copyIcon: './image/copy.png',
    buyIcon:'./image/buy.png',
    detail:{},
    currentCollectid:'',
    collectList:[],
    copyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentId: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getSelectMatDetail()
    this.getCollectList()
  },

  // 获取选材详情信息
  getSelectMatDetail:function(){
    api.getSelectMatDetail({
      data:{
        fSelectMatDetailID: this.data.currentId
      },
      success: (res) => {
        this.setData({
          detail:res.data.data
        })
        this.getCopyList()
      }
    })
  },

  // 获取当前选材的收藏列表
  getCollectList:function(){
    api.getCollectList({
      data:{
        fSelectMatDetailID: this.data.currentId
      },
      success: (res) => {
        this.setData({
          collectList: res.data.data
        })
      }
    })
  },

  // 查看大图
  viewBigPic:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: [e.currentTarget.dataset.url]
    })
  },

  // 跳转到选材商品列表页
  gotoGoodsList: function () {
    wx.navigateTo({
      url: `/pages/main/list/index?code3=${this.data.detail.fTypeCode}&displayType=budget&catname=${this.data.detail.fSeriesName}&selectid=${this.data.currentId}`
    })
  },

  // 打开复制弹窗
  openCopyModal:function() {
    if (this.data.copyList.length) {
      this.setData({
        hiddenModal: false
      })
    } else {
      wx.showToast({
        title: '当前没有可以复制的位置',
        icon: 'none'
      })
    }
  },

  // 执行弹窗的状态切换
  actionModal: function (e) {
    this.setData({
      hiddenModal: e.detail
    })
  },

  // 是否删除收藏
  dellItem: function (e) {
    this.setData({
      hiddenComfirmModal: false,
      modalContent: "确定要删除吗？",
      currentCollectid: e.currentTarget.dataset.collectid
    })
  },

  // 执行提示框确认动作
  actionComfirm: function (e) {
    let fSelectMatCollectID = this.data.currentCollectid
    this.setData({
      hiddenComfirmModal: e.detail
    })
    api.dellCollect({
      data: {
        fSelectMatCollectID: fSelectMatCollectID
      },
      success: (res) => {
        wx.showToast({
          title: '当前收藏删除成功！',
          icon: 'none'
        })
        let collectList = this.data.collectList.filter(item => item.fSelectMatCollectID != fSelectMatCollectID)
        this.setData({
          collectList: collectList
        })
      }
    })
  },

  // 执行提示框取消动作
  actionClose: function (e) {
    this.setData({
      hiddenComfirmModal: e.detail
    })
  },

  // 取得当前可复制的列表
  getCopyList: function () {
    let fSelectMatID = app.globalData.fSelectMatID
    if (fSelectMatID){
      api.getCopyList({
        data: {
          fSelectMatID: fSelectMatID,
          fSelectMatDetailID: this.data.currentId,
          fSeriesID: this.data.detail.fTypeCode,
          fPosition: this.data.detail.fPosition
        },
        success: (res) => {
          this.setData({
            copyList: res.data.data
          })
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