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
    mes:{}
  },
  input:function(e){
    this.setData({
      
    })
  },
  loadp:function(){
    console.log(app.globalData.username)
  },
  onLoad: function (options){
    console.log(app.globalData.username)
  },
})