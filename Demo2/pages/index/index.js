//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()//获取云数据库的实例

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //从数据库里面获取结果
  getImage(){
    db.collection('emall').get({
      success:(res)=>{
        console.log(res)
      }
    })
  },
  //向数据库里面添加商品（图片，商品名称，价格，类型）
  addImage(){
    wx.chooseImage({
      count: 1,
      success: function(res) {

        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = 'my-image-' + tempFile[tempFile.length - 2]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,//云存储里面唯一的标识
          success:res=>{
            console.log(res.fileID)
            db.collection('emall').add({
              data: {
                title: '商品1',
                price: 18,
                tags: ['book', 'food'],
                image: res.fileID//添加文件的id
              },
              // showToast当点击事件发生的时候出现弹窗 
              success: ret => {
                console.log(ret)
                wx.showToast({
                  title: 'Add Success',
                })
              }
            })
          }
        })
      },
    })
  },
  addMall(){
    //这里可以看成数据库的写入
    //数据库的连接是根据collection（‘数据库名字’）.add()去增加到指定数据库名字的数据库里面
    db.collection('emall').add({
      data:{
        title: '商品1',
        price: 18,
        tags:['book', 'food']
      },
      // showToast当点击事件发生的时候出现弹窗 
      success:res=>{
        console.log(res)
        wx.showToast({
          title: 'Add Success',
        })
      }
    })
    // wx.showToast({
    //   title: 'Add',
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name:'login1',
      data:{
        a: 1,
        b: 2
      },
      success:res => {
        // console.log(res.result.wxInfo.OPENID)
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,//微信数据的值
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
      }
    })
  }
})
