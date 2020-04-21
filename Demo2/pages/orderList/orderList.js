Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "2019-05-01",
    footprint: [
      {
        "id": 1,
        "title": "企业贷款",
        "subtitle": null,
        "coverImage": null,
        "insertTime": "2019-05-01 11:11:11"
      },
      {
        "id": 2,
        "title": "二手车分期",
        "subtitle": "业务办理-在线咨询",
        "coverImage": "http://xxx.jpg",
        "insertTime": "2019-05-01 11:11:11"
      },

    ],
    active: false,
  },

  del(e) {
    wx.showModal({
      title: '提示',
      content: '确认要删除此足迹么？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          this.data.footprint.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            footprint: this.data.footprint
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})