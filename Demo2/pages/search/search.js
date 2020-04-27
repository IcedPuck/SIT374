// pages/search/search.js
const db = wx.cloud.database();
const _=db.command
const app = getApp()
Page({
  getInputView:function(data){
    console.log("Query")
    var value = data.detail.value.serach
    db.collection("emall").where({
      title: new db.RegExp({
        regexp: value,
        options:"i"
      })
    }).get().then(console.log)
  },
  getInputValue(e){
    const value = e.detail
    console.log(value)
  }
})