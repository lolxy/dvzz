// pages/main/budget/index/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: "fucai",
    currentSubMenu: 1,
    toMenuView: "item1",
    toMenuSubView: "subitem1",
    sumPrice: 0,
    menuList: [
      {
        "id": 1,
        "title": "瓷砖"
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
    attrList: [
      {
        "id": 1,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 2,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 3,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 4,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 5,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 6,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 7,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 8,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 1,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 2,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 3,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 4,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 5,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 6,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 7,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      },
      {
        "id": 8,
        "area": "客餐厅地面",
        "price": 3235,
        "spec": "新濠X2SD802005真石 93.0元/㎡*37.9㎡"
      }
    ],
    fucaiList:[
      {
        "id":1,
        "name":"热水管",
        "brand":"日丰",
        "specList":[
          {
            "id":2,
            "spec":"28*28(白)",
            "price":200,
            "unit":"捆",
            "num":2,
            "sumprice":60
          },
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          },
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          },
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          },
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          },
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      },
      {
        "id": 1,
        "name": "热水管",
        "brand": "日丰",
        "specList": [
          {
            "id": 2,
            "spec": "28*28(白)",
            "price": 200,
            "unit": "捆",
            "num": 2,
            "sumprice": 60
          }
        ]
      }
    ]
  },

  getCurrentType: function (e) {
    this.setData({
      currentType: e.currentTarget.dataset.type,
      toMenuSubView: "subitem1",
      currentSubMenu: 1
    })
  },

  getCurrentSubMenuData: function (e) {
    this.setData({
      currentSubMenu: e.currentTarget.dataset.id,
      toMenuSubView: e.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isManager: options.isManager ? options.isManager : false,
      isBack: options.toNext ? options.toNext : false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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