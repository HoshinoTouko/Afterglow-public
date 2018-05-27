// pages/index/menu/menu.js
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
    menuLists: [{
      name: '识别码',
      pageTo: '/pages/qrcode/qrcode',
      img: '/statics/icon/id_code.png'
    }, {
      name: '扫描',
      pageTo: '/pages/qrcode/qrcode',
      img: '/statics/icon/scan.png'
    }, {
      name: '座位预约',
      pageTo: '/pages/index/reservation/reservation',
      img: '/statics/icon/reservation.png'
    }, {
      name: '馆藏查询',
      pageTo: '/pages/library/library',
      img: '/statics/icon/query.png'
    }, {
      name: '消费记录',
      pageTo: '/pages/qrcode/qrcode',
      img: '/statics/icon/purchase_history.png'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
