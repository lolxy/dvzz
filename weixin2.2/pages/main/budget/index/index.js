// pages/main/budget/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu:1,
    rightIcon:'./image/right.png',
    mapIcon:'./image/map.png',
    sumPrice:0,
    menuList:[
      {
        "id":1,
        "icon":'./image/ico1.png',
        "title":'装修建材'
      },
      {
        "id": 2,
        "icon": './image/ico2.png',
        "title": '生活家电'
      },
      {
        "id": 3,
        "icon": './image/ico3.png',
        "title": '软装家具'
      },
      {
        "id": 4,
        "icon": './image/ico4.png',
        "title": '全屋定制'
      }
    ],
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
    ]
  },

  getCurrentMenuData:function(e){
    this.setData({
      currentMenu:e.currentTarget.dataset.id
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