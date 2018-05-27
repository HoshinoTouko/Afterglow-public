// pages/registration/registration.js
const encoding = require("../../utils/encoding.js");

Page({
  data: {
    can_input: true,

    card_id: '',
    name: '',
    major: '',
    welcome_text: '',

    legal_id: '',
    phone: '',
    password: '',

    unique_id: '',
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },
  
  phoneInput: function (e) {
    this.setData({ phone: e.detail.value })
  },

  legalIdInput: function (e) {
    this.setData({ legal_id: e.detail.value })
  },

  passwordInput: function (e) {
    this.setData({ password: e.detail.value })
  },

  submitRegistration: function () {
    wx.login({
      success: (res) => {
        const data = {
          unique_id: this.data.unique_id,
          legal_id: this.data.legal_id,
          phone: this.data.phone,
          password: this.data.password,
          code: res.code,
        }
        //console.log(data);
        wx.request({
          url: 'https://afterglow-api.eriri.ac.cn/registration/register',
          data,
          success: (res) => {
            const data = res.data;
            if (data.err === 0){
              wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 1000
              });
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/welcome/welcome',
                }, 10000)
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 1000
              });
            }
          }
        })
      }
    })
  },

  scanToFetch: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        let result = wx.base64ToArrayBuffer(res["result"]);
        let string_json = new encoding.TextDecoder("utf-8").decode(result);

        let QRjson = JSON.parse(string_json);

        const unique_id = QRjson["unique_id"];
        wx.request({
          url: 'https://afterglow-api.eriri.ac.cn/registration/get_info_by_uid',
          data: { unique_id },
          success: (res) => {
            const data = res.data;
            this.setData({
              card_id: `你的校园卡号是${data.card_id}`,
              name: `你好，${data.name}`,
              major: `你入学的专业是${data.major}`,
              welcome_text: `欢迎成为我们的一员！`,
            });
            this.setData({ unique_id, can_input: false });
          }
        })
      }
    })
  }
})