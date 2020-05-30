// pages/email_and_phone_change/email_and_phone_change.js
var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: {},
    phone: {},
    currentID:{},
    selectArray: [{
      "id": "10",
      "text": "会计类"
  }, {
      "id": "21",
      "text": "工程类"
  }],
 
  },
 
  onLoad:function(options) {
    
    db.collection('EPDetail').where({_openid:getApp().globalData.openid}).get({
      success:res=>{
         console.log(res)
         var test=new Array()
        for(var i=0;i<res.data.length;i++){
          var obj={
            "id":res.data[i]._id,
            "text":"Email: "+res.data[i].email+" Phone: "+res.data[i].phone
          }
          
          // console.log(obj)
           test.push(obj)
        }
        
        this.setData(
          {
             email:res.data[res.data.length-1].email,
             phone:res.data[res.data.length-1].phone,
             selectArray:test
          },
          //  console.log(res.data[0].email),
          //  console.log(res)
        )
      }
    })

   
  },
  getDate:function(e){
    
    db.collection('EPDetail').where({_id:e.detail.id}).get({
      success:res=>{ 
        console.log(res)
        
        this.setData({
             email:res.data[0].email,
             phone:res.data[0].phone,
             
          })
          app.globalData.currentID=res.data[0]._id
        
            console.log(app.globalData.currentID)
      }
    })
},
  //从searchBox里面获取数据
  searchBox: function(e) {
    const that = this
    let phone, email
    //将数据上传到EPDetail里面
    db.collection('EPDetail').where({_id:app.globalData.currentID}).update({
      data:{
        email: e.detail.value.email,
        phone: e.detail.value.phone
      },
      success: res => {
        console.log(res)
        //向上面添加数据
        that.setData({
          email: e.detail.value.email,
          phone: e.detail.value.phone
        })
        wx.showToast({
          title: 'Add Success'
        })
      }
    })
  },
  
  
})