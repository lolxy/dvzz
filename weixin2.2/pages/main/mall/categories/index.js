// pages/categories/categories.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[
      {
        "id":"1",
        "icon":"./image/cat_icon_1.png",
        "title":"装修建材",
        "children":[
          {
            "id": "11",
            "icon": "",
            "title": "瓷砖",
          },
          {
            "id": "11",
            "icon": "",
            "title": "石材",
          },
          {
            "id": "11",
            "icon": "",
            "title": "木地板",
          },
          {
            "id": "11",
            "icon": "",
            "title": "门类",
          },
          {
            "id": "11",
            "icon": "",
            "title": "开关面板",
          },
          {
            "id": "11",
            "icon": "",
            "title": "集成吊顶",
          },
          {
            "id": "11",
            "icon": "",
            "title": "木作模块化",
          },
          {
            "id": "11",
            "icon": "",
            "title": "门窗类",
          },
          {
            "id": "11",
            "icon": "",
            "title": "辅助主材",
          },
          {
            "id": "11",
            "icon": "",
            "title": "背景",
          }
        ]
      },
      {
        "id": "2",
        "icon": "./image/cat_icon_2.png",
        "title": "全屋定制",
        "children": [
          {
            "id": "11",
            "icon": "",
            "title": "厨房地柜",
          },
          {
            "id": "11",
            "icon": "",
            "title": "厨房吊柜",
          },
          {
            "id": "11",
            "icon": "",
            "title": "衣柜",
          },
          {
            "id": "11",
            "icon": "",
            "title": "常用柜",
          },
          {
            "id": "11",
            "icon": "",
            "title": "书桌",
          },
          {
            "id": "11",
            "icon": "",
            "title": "榻榻米",
          },
          {
            "id": "11",
            "icon": "",
            "title": "门类",
          },
          {
            "id": "11",
            "icon": "",
            "title": "护墙板类",
          }
        ]
      },
      {
        "id": "3",
        "icon": "./image/cat_icon_3.png",
        "title": "软装家具",
        "children": [
          {
            "id": "11",
            "icon": "",
            "title": "灯具类",
          },
          {
            "id": "11",
            "icon": "",
            "title": "家具类",
          },
          {
            "id": "11",
            "icon": "",
            "title": "洗衣池",
          },
          {
            "id": "11",
            "icon": "",
            "title": "晾衣架",
          },
          {
            "id": "11",
            "icon": "",
            "title": "装饰类",
          }
        ]
      },
      {
        "id": "4",
        "icon": "./image/cat_icon_4.png",
        "title": "生活家电",
        "children": [
          {
            "id": "11",
            "icon": "",
            "title": "大家电",
          },
          {
            "id": "11",
            "icon": "",
            "title": "厨房电器",
          }
        ]
      }
    ]
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