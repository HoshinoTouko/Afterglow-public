const app = getApp()
const QR = require("../../utils/qrcode.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canUseOpenData: wx.canIUse('button.open-type.getUserInfo'),

    maskHidden: true,
    imagePath: '',
    sessionStr: 'grKJHjkenfklIJBGFEklnd',
  },

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

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);
    var that = this;
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function () {
      that.canvasToTempImage();
      clearTimeout(st);
    }, 3000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  refreshQRCode: function (e) {
    var that = this;

    wx.login({
      success: (res) => {
        if (res.code) {
          //console.log(res.code);
          wx.request({
            url: 'https://afterglow-api.eriri.ac.cn/auth/get_id_code',
            data: {code: res.code},
            success: (res) => {
              res = res.data
              if (res.err === 0){
                this.setData({
                  maskHidden: false,
                });
                this.drawQRCode(res.id_code);
              }
              else{
                this.setData({
                  maskHidden: false,
                });
                this.drawQRCode('');
              }
              
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },  
  drawQRCode: function (str) {
    wx.showToast({
      title: '获取新二维码中...',
      icon: 'loading',
      duration: 1000
    });
    var st = setTimeout(() => {
      wx.hideToast()
      var size = this.setCanvasSize();
      //绘制二维码
      console.log(str);
      this.createQrCode(str, "mycanvas", size.w, size.h);
      this.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 1000)
  }
})
