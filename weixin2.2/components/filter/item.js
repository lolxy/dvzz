// components/mall/filter/item.js
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    displayType:{
      type:String
    },
    filterList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    downIcon:'./image/down.png',
    isOpen:false,
    currentIndex:null,
    selected:true,
    focusArea:false,
    filterVal:'',
    minPrice:'',
    maxPrice:'',
    params:{
      fShopCityID:[],
      fBrandName:[],
      fNorms:[],
      fQuality:[],
      fMatColor:[],
      fPrice:[]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取得当前属性值
    getCurrentSpec:function(e){
      let arr = this.data.params[`${e.currentTarget.dataset.key}`]
      if (!e.currentTarget.dataset.value){
        arr.splice(0, arr.length)
        this.data.filterList[e.currentTarget.dataset.index].list.forEach((item,index)=>{
            item.checked = index > 0?false:true
        })
      }else{
        this.data.filterList[e.currentTarget.dataset.index].list[e.currentTarget.dataset.dindex].checked = !e.currentTarget.dataset.checked
        if (!e.currentTarget.dataset.checked) {
          arr.push(e.currentTarget.dataset.value)
        }else{
          arr.splice(arr.findIndex(item => item === e.currentTarget.dataset.value), 1)
        }
        this.data.filterList[e.currentTarget.dataset.index].list[0].checked = arr.length ? false:true
      }
      this.setData({
        filterList: this.data.filterList,
        params: this.data.params
      })
    },

    // 取得最小价格
    getMinPrice:function(e){
      this.setData({
        minPrice: e.detail.value
      })
    },
    // 取得最大价格
    getMaxPrice: function (e) {
      this.setData({
        maxPrice: e.detail.value
      })
    },
    // 切换展示更多字段
    togglePanel:function(e){
      if (this.data.currentIndex == e.currentTarget.dataset.index){
        this.setData({
          isOpen:!this.data.isOpen
        })
      }else{
        this.setData({
          currentIndex: e.currentTarget.dataset.index,
          isOpen:true
        })
      }
    },
    // 提交筛选参数
    submitFilter:function(){
      if (this.data.minPrice && !this.data.maxPrice){
        wx.showToast({
          title: '高位价格不能为空',
          icon:'none',
          duration:1500
        })
        return false;
      }
      if (!this.data.minPrice && this.data.maxPrice) {
        wx.showToast({
          title: '低位价格不能为空',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (this.data.minPrice && this.data.maxPrice){
        if (parseFloat(this.data.minPrice) > parseFloat(this.data.maxPrice)) {
          wx.showToast({
            title: '价格区间填写有误',
            icon: 'none',
            duration: 1500
          })
          return false;
        }
        let price = Array.of(this.data.minPrice, this.data.maxPrice);
        this.data.params.fPrice = price
        this.setData({
          params: this.data.params
        })
      }
      this.triggerEvent('filtersearch', this.data.params)
    },

    resetFilter:function(){
      this.data.filterList.forEach((item) => {
        item.list.forEach((elem, index) => {
          elem['checked'] = index > 0 ? false : true
        })
      })
      let params = {
        fShopCityID: [],
        fBrandName: [],
        fNorms: [],
        fQuality: [],
        fMatColor: [],
        fPrice: []
      }
      this.setData({
        minPrice:'',
        maxPrice:'',
        filterList:this.data.filterList,
        params: params
      })
      this.triggerEvent('resetsearch', this.data.params)
    },

    // 获取textarea焦点
    getAreaFocus:function(){
      this.setData({
        focusArea: true
      })
    },
    // 文本框获取焦点
    bindTextAreaInput:function(e){
      this.setData({
        filterVal: e.detail.value
      })
    },
    // 文本框失去焦点
    bindTextAreaBlur:function(e){
      this.setData({
        focusArea: false
      })
    }
  }
})
