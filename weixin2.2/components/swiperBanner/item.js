// components/swiperBanner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true, //banner  是否自动播放
    interval: 5000,//banner1 切换间隔
    duration: 500,//切换动画持续时间
    circular: true//是否采用衔接滑动
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
