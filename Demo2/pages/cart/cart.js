// pages/cart/cart.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data:{
    carts:[],
    total:0,
    address:{}
  },
  getTotal(){
    const total = this.data.carts.reduce((sum,a)=>sum + a.price * a.num, 0)
    this.setData({
      total
    })
  },
  addCart(e) {
    const { index } = e.currentTarget.dataset
    const carts = [...this.data.carts]
    carts[index].num += 1
    this.setData({
      carts
    })
    app.globalData.carts = carts
    app.setTabbar()
    this.getTotal()
  },
  order(){
    if(!this.data.address.userName)
    {
      wx.chooseAddress({
        success:res=>{
          this.setData({
            address:res
          })
          console.log(res)
        }
      })
    }
    else
    {

    }
  },
  minusCart(e){
    const{ index } = e.currentTarget.dataset
    const carts = [...this.data.carts]
    carts[index].num -= 1
    if (carts[index].num - 0 > 0)
    {
      this.setData({
        carts
      })
      app.globalData.carts = carts
      app.setTabbar()
      this.getTotal()
    }
    else
    {
      carts[index].num = 0
      this.setData({
        carts
      })
      app.globalData.carts = carts
      app.setTabbar()
      this.getTotal()
    }

  },
  onShow(){
    this.setData({
      carts:app.globalData.carts  
    })
    this.getTotal()
  }
})