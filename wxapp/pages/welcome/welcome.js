// pages/welcome/welcome.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonLoding: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.checkLogin();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  checkLogin: function () {
    this.setData({ buttonLoding: true });
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://afterglow-api.eriri.ac.cn/auth/check_wx_code',
          data: { code: res.code },
          success: (res) => {
            if (res.data.err === 0){
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/index/index',
                });
                this.setData({ buttonLoding: false });
              }, 1000);
            }
            else {
              this.setData({ buttonLoding: false });
              wx.showToast({
                title: '用户未注册！',
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail: () => {
            this.setData({ buttonLoding: false });
          }
        })
      }
    })
  },

  gotoRegister: () => {
    wx.navigateTo({
      url: '/pages/registration/registration',
    });
  },
})