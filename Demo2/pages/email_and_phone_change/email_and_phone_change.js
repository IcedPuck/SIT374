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
    //将数据上传到EPDetail里面
    db.collection('EPDetail').doc('5e847ab25eb4e5d1005cc40f7024a2da').update({
      data:{
        email: e.detail.value.email,
        phone: e.detail.value.phone
      },
      success: res => {
        console.log(res)
        //向上面添加数据
        that.setData({
          email: e.detail.value.email,
          phone: e.detail.value.phone
        })
        wx.showToast({
          title: 'Add Success'
        })
      }
    })
  }
  
})