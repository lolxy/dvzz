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
    copyList: [
      {
        id:1,
        name: '次卧1-衣柜',
        checked:true
      },
      {
        id: 2,
        name: '次卧2-衣柜',
        checked: false
      },
      {
        id: 3,
        name: '主卧-衣柜',
        checked: false
      },
      {
        id: 4,
        name: '客餐厅-酒柜',
        checked: false
      },
      {
        id: 3,
        name: '主卧-衣柜',
        checked: false
      },
      {
        id: 4,
        name: '客餐厅-酒柜',
        checked: false
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
