//pages/orderList/orderLost
const app = getApp();
//Cloud database instance
const db = wx.cloud.database();

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options, e) {
    var itemName = options.couse;
    db.collection('orderInfo').where({
      couse: itemName
    }).get({
      success: res => {
        for (var i = 0; i < res.data.length; i++) {
          var year = res.data[i].time.getFullYear();
          var month = res.data[i].time.getMonth() + 1 < 10 ? "0" + (res.data[i].time.getMonth() + 1) : res.data[i].time.getMonth() + 1;
          var day = res.data[i].time.getDate() < 10 ? "0" + res.data[i].time.getDate() : res.data[i].time.getDate();
          res.data[i].time = year + "-" + month + "-" + day;
        }
        this.setData({
          list: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})