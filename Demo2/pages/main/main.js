// pages/main/main.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    tops:[]
  },
  addCart(e){
    const {item} = e.currentTarget.dataset
    const i = app.globalData.carts.findIndex(v=>v._id==item._id)//寻找商品的id是否相同
    if(i>-1){
      //已经存在的情况数量加1
      app.globalData.carts[i].num += 1
    }
    else
    {
      item.num = 1
      app.globalData.carts.push(item)
    }
    //实例功能setTabbar
    app.setTabbar()
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getList(true)
  },
  //触底加页
  onReachBottom() {
    this.page += 1
    this.getList()
  },
  //获取列表
  getList(isInint) {
    //设置页面为最大个数为5个
    const PAGE = 5
    wx.showLoading({
      title: 'Loading',
    })
    db.collection('emall').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('xx', res.data)
        if (isInint) {
          this.setData({
            list: res.data
          })
        }
        else {
          //下拉刷新，不能覆盖而是累加
          this.setData({
            list: this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }
      }
    })
    wx.hideLoading()
  },
  toDetail(e) {
    //获取现在所在任务的id
    const id = e.currentTarget.id
    //跳转传参
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
      //如何传参数：用？传参的name和=然后， 后面加上e.currentTarget.id
    })
    //如果只需要跳转啊就只需要使用wx.navigateTo({url:'地址就可以使用'})
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //设置列表
  getTop(){
    db.collection('emall').orderBy('count', 'desc').limit(4).get({
      success:res=>{
        console.log(res.data)
        this.setData ({
          tops: res.data
        })
      }
    })
  },
  //转发
  onShareAppMessage(){
    return{
      title:"Hello, There is ACIC shop"
    }
  },
  onLoad() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    // db.collection('emall').get({
    //   success: res => (
    //     this.setData({
    //       list: res.data
    //     }),
    //     wx.hideLoading()
    //   )
    // })
    this.page = 0
    this.getList(false)
    this.getTop()
    //转发API
    wx.showShareMenu()
  }
})