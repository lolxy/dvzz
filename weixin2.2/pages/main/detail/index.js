// pages/detail/detail.js
//获取应用实例
const app = getApp()
const api = require('../../../utils/api.js');
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
    currentSelectMatDetailId:'',
    detail:{},
    evaluate:{},
    mallList:[],
    collectList: [],
    mallListLoad:false,
    displayType:'',
    currentTab: 0,
    amount:0,
    isCollect:false,
    isSelectMat:false,
    hiddenModal:true,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight - 10,
    favicon:"./image/favicon.png",
    faviconed:"./image/faviconed.png",
    loadImg: "./image/loadimg.png"
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.setData({
      currentGoodsId: options.id,
      displayType: options.displayType || '',
      amount: options.amount || 0,
      currentSelectMatDetailId: options.selectMatDetailId || ''
    })
    this.getDetail()
    this.getCollectList()
    this.getSelectMatStatus()
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
        wx.setNavigationBarTitle({
          title: res.data.data.mat.fMatAllName
        })
        let article = res.data.data.mat.fDesc;
        WxParse.wxParse('article', 'html', article, self, 5);
        self.setData({
          detail: res.data.data.mat,
          evaluate: res.data.data.evaluate
        })
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

  // 获取当前选材的收藏列表
  getCollectList: function () {
    if (this.data.currentSelectMatDetailId){
      api.getCollectList({
        data: {
          fSelectMatDetailID: this.data.currentSelectMatDetailId
        },
        success: (res) => {
          this.setData({
            collectList: res.data.data
          })
          this.isCollected()
        }
      })
    }
  },

  // 判断当期商品是否已被收藏
  isCollected:function(){
    let collectList = this.data.collectList
    if (collectList.length){
      let findCurrentMat = collectList.find(item => item.fMatID === this.data.currentGoodsId)
      this.setData({
        isCollect: (findCurrentMat && findCurrentMat.fMatID)?true:false
      })
    }
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
    if(this.data.isCollect){
      this.dellCollect()
    }else{
      this.addCollect()
    }
  },

  // 添加收藏
  addCollect:function(){
    api.addCollect({
      data:{
        fSelectMatDetailID: this.data.currentSelectMatDetailId,
        fMatID: this.data.currentGoodsId
      },
      success:(res)=>{
        this.setData({
          isCollect: true
        })
      }
    })
  },

  // 删除收藏
  dellCollect: function () {
    api.dellCollect({
      data: {
        fSelectMatDetailID: this.data.currentSelectMatDetailId,
        fMatID: this.data.currentGoodsId
      },
      success: (res) => {
        this.setData({
          isCollect: false
        })
      }
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

  // 加入预算提示
  join:function(){
    this.setData({
      hiddenModal:false
    })
  },

  // 加入选材
  addSelectMatDetail:function(){
    api.addMatToSelectDetail({
      data:{
        fSelectMatDetailID: this.data.currentSelectMatDetailId,
        fMatID:this.data.currentGoodsId
      },
      success:(res)=>{
        wx.showToast({
          title: '成功选材！',
        })
        this.setData({
          isSelectMat:true
        })
        wx.navigateBack({
          delta: 2
        })
      },
      fail:(res)=>{
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },

  // 判断该商品是否已被加入过
  getSelectMatStatus:function(){
    api.getSelectMatDetail({
      data: {
        fSelectMatDetailID: this.data.currentSelectMatDetailId
      },
      success: (res) => {
        this.setData({
          isSelectMat: (res.data.data.fMatID && res.data.data.fMatID === this.data.currentGoodsId)?true:false
        })
      }
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