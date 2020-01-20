// pages/email_and_phone_change/email_and_phone_change.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: {},
    phone: {}
  },
  //从searchBox里面获取数据
  searchBox: function(e) {
    const that = this
    let phone, email
    that.setData({
      email: e.detail.value.email,
      phone: e.detail.value.phone
    })
    //将数据上传到EPDetail里面
    db.collection('EPDetail').add({
      data:{
        email: e.detail.value.email,
        phone: e.detail.value.phone
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: 'Add Success',
        })
      }
    })
  }
})