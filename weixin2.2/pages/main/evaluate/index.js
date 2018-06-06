// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        "id":1,
        "photo":"./image/photo.png",
        "time":"2018-05-12",
        "phone":"13456787654",
        "content":"瓷砖的仿真程度很高，玉纹的裂纹看着很真实，瓷砖印得很清晰，没 有杂牌模糊的感觉，可以放心购买，挺高档的。",
        "imglist":[
          "./image/img1.jpg", "./image/img2.jpg", "./image/img3.jpg", "./image/img5.jpg", "./image/img6.jpg"
        ]
      },
      {
        "id": 1,
        "photo": "./image/photo.png",
        "time": "2018-05-12",
        "phone": "13456787654",
        "content": "瓷砖的仿真程度很高，玉纹的裂纹看着很真实，瓷砖印得很清晰，没 有杂牌模糊的感觉，可以放心购买，挺高档的。",
        "imglist": [
          "./image/img1.jpg", "./image/img2.jpg", "./image/img3.jpg", "./image/img4.jpg", "./image/img5.jpg", "./image/img6.jpg"
        ]
      },
      {
        "id": 1,
        "photo": "./image/photo.png",
        "time": "2018-05-12",
        "phone": "13456787654",
        "content": "瓷砖的仿真程度很高，玉纹的裂纹看着很真实，瓷砖印得很清晰，没 有杂牌模糊的感觉，可以放心购买，挺高档的。",
        "imglist": [
          "./image/img1.jpg", "./image/img2.jpg", "./image/img3.jpg", "./image/img4.jpg", "./image/img5.jpg", "./image/img6.jpg"
        ]
      },
      {
        "id": 1,
        "photo": "./image/photo.png",
        "time": "2018-05-12",
        "phone": "13456787654",
        "content": "瓷砖的仿真程度很高，玉纹的裂纹看着很真实，瓷砖印得很清晰，没 有杂牌模糊的感觉，可以放心购买，挺高档的。",
        "imglist": [
          "./image/img1.jpg", "./image/img2.jpg", "./image/img3.jpg", "./image/img4.jpg", "./image/img5.jpg", "./image/img6.jpg"
        ]
      },
      {
        "id": 1,
        "photo": "./image/photo.png",
        "time": "2018-05-12",
        "phone": "13456787654",
        "content": "瓷砖的仿真程度很高，玉纹的裂纹看着很真实，瓷砖印得很清晰，没 有杂牌模糊的感觉，可以放心购买，挺高档的。",
        "imglist": [
          "./image/img1.jpg", "./image/img2.jpg", "./image/img3.jpg", "./image/img4.jpg", "./image/img5.jpg", "./image/img6.jpg"
        ]
      }
    ]
  },

  // 查看图片大图
  onPreview:function(e){
    wx.previewImage({
      current: "", // 当前显示图片的http链接
      urls: [] // 需要预览的图片http链接列表
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