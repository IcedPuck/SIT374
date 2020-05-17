//pages/newadmin/newadmin
const app = getApp();
//Cloud database instance
const db = wx.cloud.database();


// pages/me/modify/modify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetId: '',
    name: '',
    detail: '',
    pic: '',
    phone: '',
    imgUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options, e) {
    this.setData({
      targetId: options.id
    })
    db.collection('emall').where({
      _id: this.data.targetId
    }).get({
      success: res => {
        this.setData({
          name: res.data[0].title,
          detail: res.data[0].detail,
          pic: res.data[0].image,
          phone: res.data[0].phone
        })
      }
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    }
    )

  },
  detailInput: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  contactsInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  picture() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: 'Uploading',
        })
        const filePath = res.tempFilePaths[0]
        console.log(filePath)
        const cloudPath = 'modifyImage' + filePath.match(/\.[^.]+?$/)[0]
        console.log('cloudPath>>', cloudPath)
        that.setData({
          pic: that.data.pic.concat(res.tempFilePaths)
        })
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', 'cloudPath是：', cloudPath, 'filePath是：', filePath, 'res是：', res)
            console.log(res.fileID)
            wx.showToast({
              title: 'Upload successful!',
            })
            var app = getApp();
            app.globalData.yunPath = res.fileID
            //const yunPath = res.fileID
            console.log('yunpath shi:' + app.globalData.yunPath)
            console.log('fileID是：', res.fileID)
            console.log(cloudPath)
            console.log(filePath)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
          }
        })
      }
    })
  },
  modify() {
    console.log(this.cloudPath)
    db.collection('emall').doc(this.data.targetId).update({
      data: {
        Test: "modifyTest Success",
        name: this.data.name,
        detail: this.data.detail,
        phone: this.data.phone,
        image: app.globalData.yunPath
      }
    })
    // db.collection('emall').add({
    //   data:{
    //     yunPath:this.yunPath
    //   }
    // })
    wx.showToast({
      title: 'Modify Successful!'
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