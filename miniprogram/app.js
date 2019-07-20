//app.js
App({
  onLaunch: function () {
   
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //  this.globalData = {}
  },
   globalData: {
     ag: "18",
     beaut: "90",
     gende: "0",  image_data:"http://ku.90sjimg.com/element_origin_min_pic/17/03/15/687715db58e62ebd1c8f8eafb5939293.jpg",
    cha:"",
   }

})
