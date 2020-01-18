// pages/detail/detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {}
  },
  order() {
    wx.cloud.callFunction({
      name: "emall-pay",
      data: {
        type: 'unifiedorder', //统一下单
        data: {
          goodId: this.data.id
        }
      },
      success: result => {
        const data = result.data
        //再次签名
        wx.cloud.callFunction({
          name: "emall-pay",
          data: {
            type: "orderquery",
            data: {
              out_trade_no: result.result.data.out_trade_no
            }
          },
          success: queryRet => {
            const {
              time_stamp,
              nonce_str,
              sign,
              prepay_id,
              body,
              total_fee
            } = queryRet.result.data
            //拉起支付
            wx.requestPayment({
              timeStamp: time_stamp,
              nonceStr: nonce_str,
              package: 'prepay_id=${prepay_id}',
              signType: 'MD5',
              paySign: sign,
              success() {
                wx.hideLoading() //收尾操作，隐藏loading
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    const ins = db.collection('emall').doc(options.id)
    ins.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins.get({
      success: res => {
        this.setData({
          info: res.data
        })
        console.log(res)
      }
    })
  }
})