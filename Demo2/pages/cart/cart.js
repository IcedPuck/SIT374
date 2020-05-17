// pages/cart/cart.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    carts: [],
    total: 0,
    address: {},
    cityName: {},
    countyName: {},
    detailInfo: {},
    errMsg: {},
    nationalCode: {},
    postalCode: {},
    provinceName: {},
    telNumber: {},
    userName: {}
  },
  getTotal() {
    const total = this.data.carts.reduce((sum, a) => sum + a.price * a.num, 0)
    this.setData({
      total
    })
  },
  addCart(e) {
    const {index} = e.currentTarget.dataset
    const carts = [...this.data.carts]
    carts[index].num += 1
    this.setData({
      carts
    })
    app.globalData.carts = carts
    app.setTabbar()
    this.getTotal()
  },
  order(e) {
    if (!this.data.address.userName) {
      wx.chooseAddress({
        success: res => {
          db.collection('EPDetail').doc('5e847ab25eb4e5d1005cc40f7024a2da').update({
            data:{
              cityName: res.cityName,
              countyName: res.countyName,
              detailInfo: res.detailInfo,
              errMsg: res.errMsg,
              nationalCode: res.nationalCode,
              postalCode: res.postalCode,
              provinceName: res.provinceName,
              telNumber: res.telNumber,
              userName: res.userName,
              email:'yinxiaof@deakin.edu.au',
              phone:'133XXXXXX'
            }
          })
          this.setData({
            address: res
          })
          console.log(res)
        }
      })
    }
  },
  minusCart(e) {
    const {
      index
    } = e.currentTarget.dataset
    const carts = [...this.data.carts]
    carts[index].num -= 1
    if (carts[index].num - 0 > 0) {
      this.setData({
        carts
      })
      app.globalData.carts = carts
      app.setTabbar()
      this.getTotal()
    } else {
      carts[index].num = 0
      this.setData({
        carts
      })
      app.globalData.carts = carts
      app.setTabbar()
      this.getTotal()
    }

  },
  onShow() {
    this.setData({
      carts: app.globalData.carts
    })
    this.getTotal()
  }
})