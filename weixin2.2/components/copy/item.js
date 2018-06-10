const api = require('../../utils/api.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    copyList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
