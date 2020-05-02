// pages/search/search.js
const db = wx.cloud.database();
const _=db.command
const app = getApp()
var text
Page({
  data:{
    list:[]
  },
  getInputView:function(data){
    var that = this
    console.log("Query")
    var value = data.detail.value.serach
    db.collection("emall").where({
      title: new db.RegExp({
        regexp: value,
        options:"i"
      })
    }).limit(5).get({
      success: res => {
        that.setData({
          list: res.data
        })
      }
    })
  },
  getInputValue(e){
    const value = e.detail.value.serach
    this.text = value
    console.log(value)
  },
  toDetail(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
      // e.currentTarget.id
  },
  onLoad(){
    this.getInputView
  }
})