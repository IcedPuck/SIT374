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
      url: '/pages/order/order',
    })
  },
  //跳转到email_and_phone_change页面
  // 需要传参
  toEP(e) {
    wx.navigateTo({
      url: '/pages/email_and_phone_change/email_and_phone_change',
    })
  },
  //跳转到service页面
  // 需要传参
  toService(e) {
    wx.navigateTo({
      url: '/pages/service/service',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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
  }
})