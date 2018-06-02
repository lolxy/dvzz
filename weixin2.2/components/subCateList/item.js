// components/mall/subCateList/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
    currentCatId: '1',
    filterIcon: "./image/filter.png",
    moreIcon: "./image/down.png",
    cateList: [
      {
        "id": 1,
        "name": "瓷砖"
      },
      {
        "id": 2,
        "name": "石材"
      },
      {
        "id": 3,
        "name": "木地板"
      },
      {
        "id": 4,
        "name": "洁具"
      },
      {
        "id": 5,
        "name": "开光面板"
      },
      {
        "id": 3,
        "name": "木地板"
      },
      {
        "id": 4,
        "name": "洁具"
      },
      {
        "id": 5,
        "name": "开光面板"
      }
    ],
    moreList: [
      {
        "id": 1,
        "name": "瓷砖"
      },
      {
        "id": 2,
        "name": "石材"
      },
      {
        "id": 3,
        "name": "木地板"
      },
      {
        "id": 4,
        "name": "洁具"
      },
      {
        "id": 5,
        "name": "开光面板"
      },
      {
        "id": 1,
        "name": "瓷砖"
      },
      {
        "id": 2,
        "name": "石材"
      },
      {
        "id": 3,
        "name": "木地板"
      },
      {
        "id": 4,
        "name": "洁具"
      },
      {
        "id": 5,
        "name": "开光面板"
      },
      {
        "id": 1,
        "name": "瓷砖"
      },
      {
        "id": 2,
        "name": "石材"
      },
      {
        "id": 3,
        "name": "木地板"
      },
      {
        "id": 4,
        "name": "洁具"
      },
      {
        "id": 5,
        "name": "开光面板"
      },
      {
        "id": 1,
        "name": "瓷砖"
      },
      {
        "id": 2,
        "name": "石材"
      },
      {
        "id": 3,
        "name": "木地板"
      },
      {
        "id": 4,
        "name": "洁具"
      },
      {
        "id": 5,
        "name": "开光面板"
      }
    ],
    subCateList: [
      {
        "id": 1,
        "name": "沐浴房"
      },
      {
        "id": 2,
        "name": "马桶"
      },
      {
        "id": 3,
        "name": "龙头"
      },
      {
        "id": 4,
        "name": "小便池"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleMoreMenu: function () {
      this.setData({
        isShow: !this.data.isShow
      })
      this.triggerEvent('customevent')
    },
    closeActionSheet: function () {
      this.setData({
        isShow: true
      })
      this.triggerEvent('customevent')
    },
    actionSheetTap:function(){
      this.triggerEvent('customevent')
    }
  }
})
