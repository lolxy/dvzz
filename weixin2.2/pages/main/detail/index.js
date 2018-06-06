// pages/detail/detail.js
//获取应用实例
const app = getApp()
const api = require('../../../utils/api.js');
const util = require('../../../utils/util.js');
const WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true, //banner  是否自动播放
    interval: 5000,//banner1 切换间隔
    duration: 500,//切换动画持续时间
    circular: true,//是否采用衔接滑动
    currentGoodsId:null,
    detail:{},
    evaluate:{},
    mallList:[],
    mallListLoad:false,
    currentTab: 0,
    isCollect:true,
    hiddenModal:true,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight - 10,
    favicon:"./image/favicon.png",
    faviconed:"./image/faviconed.png",
    loadImg: "./image/loadimg.png"
  },

  // 获取商品详情
  getDetail:function(){
    const self = this
    wx.showLoading({
      title: '加载中'
    })
    api.getDetail({
      data:{
        fMatID: self.data.currentGoodsId
      },
      success: (res) => {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        let article = res.data.data.mat.fDesc;
        WxParse.wxParse('article', 'html', article, self, 5);
        self.setData({
          detail: res.data.data.mat,
          evaluate: res.data.data.evaluate
        })
        // if (res.data.data.evaluate && res.data.data.evaluate.eval && res.data.data.evaluate.eval.fDatetime) {
        //   self.data.evaluate.eval.fDatetime = util.formatDate(new Date(res.data.data.evaluate.eval.fDatetime))
        // }
        // self.setData({
        //   evaluate: res.data.data.evaluate
        // })
      }
    });
  },

  // 获取详情页商城列表
  getDetailMallList:function(){
    const self = this
    wx.showLoading({
      title: '加载中'
    })
    api.getDetailMallList({
      data:{
        fMatID: self.data.currentGoodsId
      },
      success: (res) => {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        self.setData({
          mallList: res.data.data,
          mallListLoad:true
        })
      }
    })
  },

  // 滚动切换标签样式
  switchTabs: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.getMallListApi()
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
    this.getMallListApi()
  },

  // 获取商城列表
  getMallListApi:function(){
    if (this.data.currentTab === 1 && !this.data.mallListLoad) {
      this.getDetailMallList()
    }
  },

  // 切换收藏
  toggleCollect:function(e){
    this.setData({
      isCollect: !this.data.isCollect
    })
  },

  // 查看大图
  viewBigImg:function(e){
    let urls = this.data.detail.list.map((item)=>{
      return item.fUrl
    })
    wx.previewImage({
      current: e.currentTarget.dataset.burl,
      urls: urls
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentGoodsId:options.id
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getDetail()
  },

  // 加入预算
  join:function(){
    this.setData({
      hiddenModal:false
    })
  },

  // 关闭提示弹窗
  closeModal:function(){
    this.setData({
      hiddenModal: true
    })
  },

  comfirm:function(){
    this.setData({
      hiddenModal: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})