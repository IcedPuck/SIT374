// pages/me/administrator/administrator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    detail: '',
    contacts: '',
    picture: ''
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  detailInput: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  contactsInput: function (e) {
    this.setData({
      contacts: e.detail.value
    })
  },
  picture: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: function (res) {
        that.setData({
          picture: that.data.picture.concat(res.tempFilePaths)
        })
      }
    })
  },
  publish: function () {
    const db = wx.cloud.database()
    db.collection('emall').add({
      data: {
        name: this.data.name,
        detail: this.data.detail,
        contacts: this.data.contacts,
        picture: this.data.picture
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })
  },

})