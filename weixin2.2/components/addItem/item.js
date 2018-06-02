// components/budget/addItem/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    downIcon: "/image/downicon.png",
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    colseModal:function(){
      this.triggerEvent('customevent',true)
    },
    openModal:function(){
      this.triggerEvent('customevent', false)
    },
    submitForm:function(){
      
      this.triggerEvent('customevent', true)
    }
  }
})
