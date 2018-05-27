// pages/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    book1: "看人的艺术:11种以物识人术,看人看到骨子里",
    bookdet1: "如何看人不走眼？如何做到知人知面又知心？如何像FBI、CIA特工一样成为心理学高手？",
    book2: "半小时漫画世界史",
    bookdet2:"看半小时漫画，通五千年历史，脉络无比清晰，看完就能倒背。其实是一本严谨的极简世界史！仅仅通过手绘和段子，二混子就捋出清晰的历史大脉络：简到崩溃的极简欧洲史、美国往事三部曲、一口气就能读完的日本史、肌肉猛男斯巴达300勇士、酷炫无比的加勒比海盗……",
    bookimg1: "../../statics/img/book1.jpg",
    bookimg2: "../../statics/img/book2.jpg" 
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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