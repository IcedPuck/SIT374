// pages/callFunction(test)/callFunction(test).js
Page({
  callFunction: function(){
    console.log("Button is clicked")
    wx.cloud.callFunction({
      name:"addData"
    }).then(console.log)
  }
})