//pages/newadmin/newadmin
const app = getApp();
//Cloud database instance
const db = wx.cloud.database();

// pages/me/newadmin/newadmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    mHidden: true,
    targetId: '',
    itemTotalAmount: 0,
    itemShowAmount: 5,
    hiddenBottom: true,
    nowYear: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date()
    this.setData({
      nowYear: now.getFullYear()
    })
    wx.showLoading({
      title: 'Loading',
    })
    db.collection('emall').count({
      success: ret => {
        this.setData({
          itemTotalAmount: ret.total
        })
      }
    })
    db.collection('emall').orderBy('time', 'desc').limit(this.data.itemShowAmount).get({
      success: res => {
        for (var i = 0; i < res.data.length; i++) {
          var year = res.data[i].time.getFullYear();
          res.data[i].time = year;
        }
        this.setData({
          list: res.data,
        })
        wx.hideLoading()
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
    var now = new Date()
    this.setData({
      nowYear: now.getFullYear()
    })
    db.collection('emall').orderBy('time', 'desc').limit(this.data.itemShowAmount).get({
      success: res => {
        for (var i = 0; i < res.data.length; i++) {
          var year = res.data[i].time.getFullYear();
          res.data[i].time = year;
        }
        this.setData({
          list: res.data
        })
      }
    })
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
   * Monitor users' up pulling action
   */
  onReachBottom: function () {
    if (this.data.itemTotalAmount < this.data.itemShowAmount) {
      this.setData({
        hiddenBottom: false
      })
    } else {
      var amount = this.data.itemShowAmount + 5;
      this.setData({
        itemShowAmount: amount
      })
      this.onShow()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * Confirm delete
   */
  deleteItem: function () {
    this.setData({
      mHidden: true
    })
    db.collection('emall').where({
      _id: this.data.targetId
    }).remove({
      success: function () {
        wx.showToast({
          title: 'Delete success',
        })
      }
    })
    db.collection('emall').count({
      success: ret => {
        this.setData({
          itemTotalAmount: ret.total
        })
      }
    })
    this.onShow()
  },

  /**
   * Cancel delete
   */
  cancelDelete: function () {
    this.setData({
      mHidden: true
    })
  },

  /**
   * Show delete model
   */
  clickDelete: function (e) {
    this.setData({
      mHidden: false,
      targetId: e.currentTarget.dataset.id
    })
  },

  /**
   * Enter modify page
   */
  clickModify: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/modify/modify?id=' + id,
    })
  },

  jump_manager() {
    wx.navigateTo({
      url: '/pages/administrator/administrator',
    })
  }

})