// pages/list/list.js
const app = getApp()
const api = require('../../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll:true,
    scrollTop:0,
    currentBrandPage:0,
    currentGoodsPage: 0,
    loadedBrand:false,
    loadedGoods: false,
    keyword:'',
    code:{
      currentCode1: '',
      currentCode2: '',
      currentCode3: ''
    },
    fBrandName:'',
    fMatColor:'',
    fNorms:'',
    fPrice:'',
    fQuality:'',
    fShopCityID:'',
    brandList:[],
    goodsList:[],
    filterList:[],
    currentType:"goods",
    filterIcon:"./image/filter.png",
    actionSheetHidden: true
  },

  // 切换商品和品牌
  menuClick:function(e){
    this.setData({
      currentType: e.target.dataset.type,
      scrollTop:0
    })
    if (this.data.currentType == "brand" && !this.data.brandList.length) {
      this.getBrandList()
    }else if(!this.data.goodsList.length){
      this.getGoodsList()
    }
  },

// 判断当前是否可以滚动
  onUpdateScrollStatus:function(e){
    this.setData({
      isScroll: !this.data.isScroll,
      scrollTop:0
    })
  },

// 获取当前分类
  onChangeCurrentCate:function(e){
    this.setData({
      code: e.detail,
      loadedBrand: false,
      currentBrandPage: 0,
      loadedGoods: false,
      currentGoodsPage: 0,
      brandList: [],
      goodsList: []
    })
    this.getFilterField()
    if (this.data.currentType == "brand"){
        this.getBrandList()
    }else{
      this.getGoodsList()
    }
  },

  // 获取过滤条件列表
  getFilterField: function () {
    api.getFilterField({
      data: {
        fSeriesCode: this.data.code.currentCode3 || this.data.code.currentCode2 || this.data.code.currentCode1
      },
      success: (res) => {
        let list = res.data.data.list
        list.forEach((item)=>{
          item.list.forEach((elem,index)=>{
            elem['checked'] = index>0?false:true
          })
        })
        this.setData({
          filterList:list
        })
      }
    })
  },

  // 获取当前分类的品牌列表
  getBrandList:function(){
    if(!this.data.loadedBrand){
      wx.showLoading({
        title: '加载中',
      })
        api.getBrandList({
          data: {
            fType1Code: this.data.code.currentCode1,
            fType2Code: this.data.code.currentCode2,
            fType3Code: this.data.code.currentCode3,
            num: this.data.currentBrandPage,
            lat: app.globalData.area.latitude,
            lng: app.globalData.area.longitude
          },
          success: (res) => {
            setTimeout(function () {
              wx.hideLoading()
            }, 500)
            let brandList = res.data.data
            this.setData({
              brandList: this.data.brandList.concat(brandList)
            })
            if (brandList && brandList.length < 10) {
              this.setData({
                loadedBrand: true
              })
            }
          },
          fail: (res) => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
          }
        });
    }
  },

  // 搜索商品列表
  onSearch: function (e) {
    this.setData({
      loadedBrand: false,
      loadedGoods: false,
      currentBrandPage: 0,
      currentGoodsPage: 0,
      brandList: [],
      goodsList: [],
      keyword: e.detail
    })
    this.getGoodsList()
  },

  // 获取当前分类的商品列表
  getGoodsList: function () {
    if (!this.data.loadedGoods) {
      wx.showLoading({
        title: '加载中',
      })
      api.getGoodsList({
        data: {
          fSeriesCode: this.data.code.currentCode3 || this.data.code.currentCode2 || this.data.code.currentCode1,
          num: this.data.currentGoodsPage,
          keyword: this.data.keyword,
          fBrandName: this.data.fBrandName,
          fMatColor: this.data.fMatColor,
          fNorms: this.data.fNorms,
          fPrice: this.data.fPrice,
          fQuality: this.data.fQuality,
          fShopCityID: this.data.fShopCityID,
          lat: app.globalData.area.latitude,
          lng: app.globalData.area.longitude
        },
        success: (res) => {
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
          let goodsList = res.data.data
          this.setData({
            goodsList: this.data.goodsList.concat(goodsList)
          })
          if (goodsList && goodsList.length < 10) {
            this.setData({
              loadedGoods: true,
            })
          }
        },
        fail:(res)=>{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500
          })
        }
      });
    }
  },

  // 切换过滤弹窗
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  // 过滤弹窗变化遮罩层隐藏
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  // 获取过滤的列表数据
  filterSearch:function(e){
    this.setData({
      loadedBrand: false,
      loadedGoods: false,
      actionSheetHidden:true,
      currentBrandPage: 0,
      currentGoodsPage: 0,
      brandList: [],
      goodsList: [],
      fBrandName: e.detail.fBrandName.length ? e.detail.fBrandName.join(','):'',
      fMatColor: e.detail.fMatColor.length ? e.detail.fMatColor.join(',') : '',
      fNorms: e.detail.fNorms.length ? e.detail.fNorms.join(',') : '',
      fPrice: e.detail.fPrice.length ? e.detail.fPrice.join(',') : '',
      fQuality: e.detail.fQuality.length ? e.detail.fQuality.join(',') : '',
      fShopCityID: e.detail.fShopCityID.length ? e.detail.fShopCityID.join(',') : ''
    })
    if (this.data.currentType == "brand") {
      this.getBrandList()
    } else {
      this.getGoodsList()
    }
  },

  // 重置过滤的列表数据
  resetFilterSearch: function (e) {
    this.setData({
      loadedBrand: false,
      loadedGoods: false,
      currentBrandPage: 0,
      currentGoodsPage: 0,
      brandList: [],
      goodsList: [],
      fBrandName: e.detail.fBrandName.length ? e.detail.fBrandName.join(',') : '',
      fMatColor: e.detail.fMatColor.length ? e.detail.fMatColor.join(',') : '',
      fNorms: e.detail.fNorms.length ? e.detail.fNorms.join(',') : '',
      fPrice: e.detail.fPrice.length ? e.detail.fPrice.join(',') : '',
      fQuality: e.detail.fQuality.length ? e.detail.fQuality.join(',') : '',
      fShopCityID: e.detail.fShopCityID.length ? e.detail.fShopCityID.join(',') : ''
    })
    if (this.data.currentType == "brand") {
      this.getBrandList()
    } else {
      this.getGoodsList()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:{
        currentCode1: options.code1 || "",
        currentCode2: options.code2 || "",
        currentCode3: options.code3 || ""
      },
      keyword: options.keyword || ""
    })
    this.getFilterField()
    this.getGoodsList()
  },

  scrollLower:function(e){
    if (this.data.currentType == "brand") {
      this.setData({
        currentBrandPage: this.data.currentBrandPage + 1
      })
      this.getBrandList()
      if (this.data.loadedBrand && e.detail.direction == 'bottom'){
        wx.showToast({
          title: '已经到底了！',
          icon: 'none',
          duration: 1500
        })
      }
    }else{
      this.setData({
        currentGoodsPage: this.data.currentGoodsPage + 1
      })
      this.getGoodsList()
      if (this.data.loadedGoods && e.detail.direction == 'bottom') {
        wx.showToast({
          title: '已经到底了！',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})