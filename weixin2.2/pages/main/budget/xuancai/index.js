// pages/main/budget/index/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu:1,
    currentSubMenu:1,
    switchType:1,
    toMenuView: "item1",
    toMenuSubView: "subitem1",
    addIcon:'./image/add.png',
    sysIcon:'./image/qrimg.png',
    managerIcon:'./image/manager.png',
    rightIcon:'./image/right.png',
    mapIcon:'./image/map.png',
    windowWidth: app.systemInfo.windowWidth,
    sumPrice:0,
    hiddenModal:true,
    xcList:[
      {
        "id":1,
        "title":'瓷砖',
        "icon":'./image/sico1.png',
        "price":'3540'
      },
      {
        "id": 2,
        "title": '石材',
        "icon": './image/sico2.png',
        "price": '3420'
      },
      {
        "id": 3,
        "title": '门类',
        "icon": './image/sico3.png',
        "price": '3520'
      },
      {
        "id": 4,
        "title": '集成吊顶',
        "icon": './image/sico4.png',
        "price": '3540'
      },
      {
        "id": 5,
        "title": '洁具',
        "icon": './image/sico5.png',
        "price": '5420'
      },
      {
        "id": 6,
        "title": '五金',
        "icon": './image/sico6.png',
        "price": '2240'
      },
      {
        "id": 7,
        "title": '开关面板',
        "icon": './image/sico7.png',
        "price": '1520'
      },
      {
        "id": 8,
        "title": '木地板',
        "icon": './image/sico8.png',
        "price": '5420'
      },
      {
        "id": 9,
        "title": '照明',
        "icon": './image/sico9.png',
        "price": '6520'
      }
    ],
    menuList:[
      {
        "id":1,
        "title":"瓷砖"
      },
      {
        "id": 2,
        "title": "马赛克"
      },
      {
        "id": 3,
        "title": "瓷砖线条"
      },
      {
        "id": 4,
        "title": "水刀拼花"
      },
      {
        "id": 5,
        "title": "瓷砖加工"
      },
      {
        "id": 6,
        "title": "瓷砖"
      },
      {
        "id": 7,
        "title": "瓷砖"
      },
      {
        "id": 8,
        "title": "瓷砖"
      },
      {
        "id": 9,
        "title": "瓷砖"
      },
      {
        "id": 10,
        "title": "瓷砖"
      }
    ],
    attrList:[
      {
        "id":1,
        "name":"客餐厅",
        'children':[
          {
            "id":2,
            "name":"地面",
            "price":7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "厨房",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "公卫",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "生活阳台",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "客餐厅",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "客餐厅",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "客餐厅",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "客餐厅",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "客餐厅",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      },
      {
        "id": 1,
        "name": "客餐厅",
        'children': [
          {
            "id": 2,
            "name": "地面",
            "price": 7000
          },
          {
            "id": 3,
            "name": "墙面",
            "price": 7000
          }
        ]
      }
    ]
  },

  getCurrentMenuData:function(e){
    this.setData({
      currentMenu:e.currentTarget.dataset.id,
      toMenuView:e.currentTarget.id,
      toMenuSubView: "subitem1",
      currentSubMenu:1
    })
  },

  getCurrentSubMenuData: function (e) {
    this.setData({
      currentSubMenu: e.currentTarget.dataset.id,
      toMenuSubView:e.currentTarget.id
    })
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

  // 跳转到管理页面
  manager:function(){
    wx.navigateTo({
      url: '/pages/main/budget/comfirm/index?isManager=true&&toNext=true'
    })
  },

  // 跳转到当前所选商品的收藏页
  gotoFavPage:function(){
    wx.navigateTo({
      url: '/pages/main/budget/detail2/index'
    })
  },

  // 跳转到选材商品列表页
  gotoXuancai:function(){
    wx.navigateTo({
      url: '/pages/main/budget/productList/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let sum = 0
    this.data.xcList.forEach((item)=>{
       sum = sum + parseInt(item.price)
    })
    this.setData({
      sumPrice:sum
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})