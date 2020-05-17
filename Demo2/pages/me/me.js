// pages/me/me.js
const app = getApp()
const db = wx.cloud.database() //获取云数据库的实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //跳转到order页面
  // 需要传参
  toOrder(e) {
    wx.navigateTo({
      url: '/pages/orderList/orderList',
    })
  },
  //跳转到email_and_phone_change页面
  // 需要传参
  toEP(e) {
    wx.navigateTo({
      url: '/pages/email_and_phone_change/email_and_phone_change',
    })
  },
  toAccount(e){
    wx.navigateTo({
      url: '/pages/account/account',
    })
  },
  toService(e) {
    wx.navigateTo({
      url: '/pages/administrator/administrator',
    })
  },
  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name: 'login1',
      data: {
        a: 1,
        b: 2
      },
      success: res => {
        // console.log(res.result.wxInfo.OPENID)
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo, //微信数据的值
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
      }
    })
  },
  data: {
    lastTapTime: 0,
  },

  doubleClick: function (e) {
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time  // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据
    if (curTime - lastTime > 0) {
      if (curTime - lastTime < 300) {//是双击事件
        wx.navigateTo({
          url: '/pages/adminlogin/adminlogin',
        })
      }

    }
    this.setData({
      lastTapTime: curTime
    })
  },
  Service(e) {
    wx.navigateTo({
      url: '/pages/administrator/administrator',
    })
  },

})