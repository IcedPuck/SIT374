// pages/me/adminlogin/adminlogin.js
Page({
  data: {
    Username: '',
    Password: ''
  },

  nameInput: function (e) {
    this.setData({
      Username: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      Password: e.detail.value
    })
  },

  loginBtn: function () {
    var usernames = this.data.Username
    var passwords = this.data.Password
    if (usernames == 'Adm' && passwords == '123') {
      wx.navigateTo({
        url: '/pages/newadmin/newadmin',
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
})