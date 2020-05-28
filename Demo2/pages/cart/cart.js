// pages/cart/cart.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    itemlist: [
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
      {
        content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
      },
    ],
    dbcarts: [],
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
    userName: {},
    startX: 0, //开始坐标
    startY: 0
  },

  onLoad: function (options) {
    var _this = this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'demo-2mweo'
    })

    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('cart').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          dbcarts: res.data
        })
      }
    })
  },

  getTotal() {
    const total = this.data.carts.reduce((sum, a) => sum + a.price * a.num, 0)
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
  order(e) {
    if (!this.data.address.userName) {
      wx.chooseAddress({
        success: res => {
          db.collection('EPDetail').doc('5e847ab25eb4e5d1005cc40f7024a2da').update({
            data: {
              cityName: res.cityName,
              countyName: res.countyName,
              detailInfo: res.detailInfo,
              errMsg: res.errMsg,
              nationalCode: res.nationalCode,
              postalCode: res.postalCode,
              provinceName: res.provinceName,
              telNumber: res.telNumber,
              userName: res.userName,
              email: 'yinxiaof@deakin.edu.au',
              phone: '133XXXXXX'
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
  },


  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.itemlist.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      carts: this.data.carts
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.carts.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      carts: that.data.carts
    })
  },

  // 计算滑动角度
  // @param {Object} start 起点坐标
  // @param {Object} end 终点坐标

  angle: function (start, end) {
    var dX = end.X - start.X,
      dY = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(dY / dX) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.minusCart(e);
    this.data.carts.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      carts: this.data.carts
    })

  }
})