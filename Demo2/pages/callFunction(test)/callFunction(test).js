// pages/callFunction(test)/callFunction(test).js
const app = getApp()
Page({
  // callFunction: function(){
  //   console.log("Button is clicked")
  //   wx.cloud.callFunction({
  //     name:"addData"
  //   }).then(console.log)
  // }
  data:{

  },
  input:function(e){
    app.globalData.username = "你好！"
  },
  loadp:function(){
    console.log(app.globalData.username)
  },
  onLoad: function (options){
    console.log(app.globalData.username)
  },
})