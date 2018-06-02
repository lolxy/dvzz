// components/productItem/productItem.js
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
    productList:[
      {
        "id":1,
        "imgurl":"./image/pro1.jpg",
        "title":"辉煌马桶陶瓷普通坐便器辉煌马桶陶瓷普通坐便器1",
        "price":"1588",
        "oldPrice": "158",
        "store":"多维商城",
        "area":"2.4km"
      },
      {
        "id":2,
        "imgurl": "./image/pro2.jpg",
        "title": "辉煌马桶陶瓷普通坐便器辉煌马桶陶瓷普通坐便器2",
        "price": "1588",
        "oldPrice": "158",
        "store": "多维商城",
        "area": "2.4km"
      },
      {
        "id":3,
        "imgurl": "./image/pro1.jpg",
        "title": "辉煌马桶陶瓷普通坐便器辉煌马桶陶瓷普通坐便器3",
        "price": "1588",
        "oldPrice":"158",
        "store": "多维商城",
        "area": "2.4km"
      },
      {
        "id":4,
        "imgurl": "./image/pro2.jpg",
        "title": "辉煌马桶陶瓷普通坐便器辉煌马桶陶瓷普通坐便器4",
        "price": "1588",
        "oldPrice": "158",
        "store": "多维商城",
        "area": "2.4km"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoPage: function (e) {
      wx.navigateTo({
        url: `/pages/main/mall/detail/index?id=${e.currentTarget.dataset.id}`
      })
    }
  }
})
