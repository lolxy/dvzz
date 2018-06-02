// components/mall/filter/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    displayType:{
      type:String
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
    filterList:[
      {
        "id":1,
        "name":"商城",
        "list":[
          {
            "id":11,
            "name":"多维商城",
          },
          {
            "id": 12,
            "name": "华洲建材城",
          },
          {
            "id": 11,
            "name": "多维商城",
          },
          {
            "id": 12,
            "name": "华洲建材城",
          },
          {
            "id": 11,
            "name": "多维商城",
          },
          {
            "id": 12,
            "name": "华洲建材城",
          },
          {
            "id": 11,
            "name": "多维商城",
          },
          {
            "id": 12,
            "name": "华洲建材城",
          }
        ]
      },
      {
        "id": 2,
        "name": "品牌",
        "list": [
          {
            "id": 11,
            "name": "金牌亚洲",
          },
          {
            "id": 12,
            "name": "奥米茄",
          },
          {
            "id": 12,
            "name": "科勒卫浴",
          },
          {
            "id": 11,
            "name": "金牌亚洲",
          },
          {
            "id": 12,
            "name": "奥米茄",
          },
          {
            "id": 12,
            "name": "科勒卫浴",
          },
          {
            "id": 11,
            "name": "金牌亚洲",
          },
          {
            "id": 12,
            "name": "奥米茄",
          },
          {
            "id": 12,
            "name": "科勒卫浴",
          }
        ]
      },
      {
        "id": 3,
        "name": "规格（单位：mm）",
        "list": [
          {
            "id": 11,
            "name": "300*300",
          },
          {
            "id": 12,
            "name": "600*600",
          },
          {
            "id": 12,
            "name": "800*800",
          },
          {
            "id": 12,
            "name": "600*600",
          },
          {
            "id": 12,
            "name": "800*800",
          },
          {
            "id": 12,
            "name": "600*600",
          },
          {
            "id": 12,
            "name": "800*800",
          }
        ]
      },
      {
        "id": 4,
        "name": "材质",
        "list": [
          {
            "id": 11,
            "name": "仿古砖",
          },
          {
            "id": 12,
            "name": "金刚釉",
          },
          {
            "id": 12,
            "name": "抛光砖",
          },
          {
            "id": 11,
            "name": "仿古砖",
          },
          {
            "id": 12,
            "name": "金刚釉",
          },
          {
            "id": 12,
            "name": "抛光砖",
          },
          {
            "id": 11,
            "name": "仿古砖",
          },
          {
            "id": 12,
            "name": "金刚釉",
          },
          {
            "id": 12,
            "name": "抛光砖",
          }
        ]
      },
      {
        "id": 5,
        "name": "颜色",
        "list": [
          {
            "id": 11,
            "name": "红色",
          },
          {
            "id": 12,
            "name": "黄色",
          },
          {
            "id": 12,
            "name": "绿色",
          },
          {
            "id": 12,
            "name": "蓝色",
          },
          {
            "id": 12,
            "name": "绿色",
          },
          {
            "id": 12,
            "name": "蓝色",
          },
          {
            "id": 12,
            "name": "绿色",
          },
          {
            "id": 12,
            "name": "蓝色",
          }
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
