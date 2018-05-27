// pages/reservation/reservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    libList: [
      '文理学部图书馆',
      '工学部图书馆',
      '医学部图书馆'
    ],
    libIndex: 0,

    seatList: [...Array(10).keys()],
    seatIndex: 0,

    resText: '',
  },

  onLoad: function (options) {
  
  },

  onReady: function () {
    this.getResResult();
  },

  getResResult: function () {
    wx.getStorage({
      key: 'res',
      success: (res) => {
        console.log(res.data);
        this.setData({ resText: res.data });
      },
      fail: (res) => {
        wx.setStorageSync('res', '暂未预约座位');
        this.setData({ resText: '暂未预约座位' });
      },

    })
  },

  makeReservation: function () {
    const resText = `已预约在 ${this.data.libList[this.data.libIndex]} 的 ${this.data.seatList[this.data.seatIndex]} 号座位，请在半个小时内前往。`;
    wx.setStorageSync('res', resText);
    wx.showToast({
      title: '预约成功',
      icon: 'success'
    })
    this.getResResult();
  },

  bindLibChange: function (e) {
    this.setData({ libIndex: e.detail.value });
  },

  bindSeatChange: function (e) {
    this.setData({ seatIndex: e.detail.value });
  },
})