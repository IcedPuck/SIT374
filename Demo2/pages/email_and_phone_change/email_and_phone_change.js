// pages/email_and_phone_change/email_and_phone_change.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: {},
    phone: {},
    visual: 'hidden'
  },
  //从searchBox里面获取数据
  searchBox: function(e) {
    const that = this
    let phone, email
    //将数据上传到EPDetail里面
    db.collection('EPDetail').where({
      
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        console.log(res.data)
      }
    })
    db.collection('EPDetail').where({
      
    })
    .update({
      data:{
        email: e.detail.value.email,
        phone: e.detail.value.phone
      },
      success: res => {
        console.log(res)
        //向上面添加数据
        that.setData({
          email: e.detail.value.email,
          phone: e.detail.value.phone,
          visual: e.detail.value.email.length ? 'show' : 'hidden'
        })
        wx.showToast({
          title: 'Add Success'
        })
      }
    })
  }
  
})