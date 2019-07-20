//index.js
var app = getApp()
Page({
  
  data: {
    age: "请上传照片",
    beauty: "请上传照片",
    gender: "请上传照片", image_src:"http://ku.90sjimg.com/element_origin_min_pic/17/03/15/687715db58e62ebd1c8f8eafb5939293.jpg",
    data1:"",
    data2:"",
    data3:""
  },
  UploadImage() {
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)
    var that = this
    //上传图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '加载中...',
        });
        //图片路径获取
        const tempFilePaths = res.tempFilePaths[0]
        app.globalData.image_data = res.tempFilePaths[0]
        console.log(tempFilePaths)
        that.setData({
          image_src: res.tempFilePaths[0]
        });
        //将图片上传给云函数并解析
        var uploadTask = wx.cloud.uploadFile({
          cloudPath: random + '.png',
          filePath: tempFilePaths, // 文件路径
          success: res => {
            console.log(res.fileID)
            wx.cloud.callFunction({
              name: 'fdid',
              data: {
                fileID: res.fileID
              },
              success(res) {
                wx.hideLoading()
                 wx.showToast({
                   title: '成功',
                   icon: 'success',
                   duration: 500
                 })
                 //打印云函数解析内容，看是否解析成功
                console.log("FaceInfos:" + JSON.stringify(res.result)) 
                //年龄
                if (res.result.FaceInfos[0].FaceAttributesInfo.Age<=6) {
                  that.setData({
                    age: res.result.FaceInfos[0].FaceAttributesInfo.Age,
                  });
                } else {
                  that.setData({
                    age: res.result.FaceInfos[0].FaceAttributesInfo.Age - 2,
                  });
                }
                //颜值
                if (res.result.FaceInfos[0].FaceAttributesInfo.Beauty >= 85 & res.result.FaceInfos[0].FaceAttributesInfo.Beauty <= 99) {
                  that.setData({
                    beauty: res.result.FaceInfos[0].FaceAttributesInfo.Beauty+1,
                  });
                  //传参给全局变量
                  app.globalData.beaut = res.result.FaceInfos[0].FaceAttributesInfo.Beauty+1
                }
                else if (res.result.FaceInfos[0].FaceAttributesInfo.Beauty >= 99) {
                  that.setData({
                    beauty: res.result.FaceInfos[0].FaceAttributesInfo.Beauty ,
                  });
                  app.globalData.beaut = res.result.FaceInfos[0].FaceAttributesInfo.Beauty
                }
                else {
                  that.setData({
                  beauty: res.result.FaceInfos[0].FaceAttributesInfo.Beauty + 6,
                  
                  });
                  app.globalData.beaut = res.result.FaceInfos[0].FaceAttributesInfo.Beauty+6
                   }
                   //性别
              if (res.result.FaceInfos[0].FaceAttributesInfo.Gender < 50) {
                   that.setData({
                     gender: "女"
                   });
                 } 
                 else {
                  that.setData({
                     gender: "男"
                   });    
             }
                app.globalData.ag = res.result.FaceInfos[0].FaceAttributesInfo.Age-2,
                  console.log(app.globalData.ag),//测试全局变量赋值所用
                  app.globalData.gende = res.result.FaceInfos[0].FaceAttributesInfo.Gender,
                  //app.globalData.beaut = res.result.FaceInfos[0].FaceAttributesInfo.Beauty
                wx.setStorage({
                  key:"userInfo",
                  data1: res.result.FaceInfos[0].FaceAttributesInfo.Gender,
                  data2: res.result.FaceInfos[0].FaceAttributesInfo.Age,
                  data3: res.result.FaceInfos[0].FaceAttributesInfo.Beauty
                })
              },
            })
          },
         
          fail: err => {
          }
        })
        //上传进度
        uploadTask.onProgressUpdate((res) => {
          that.setData({
            progress: res.progress 
          })
        })
      }
    })
  },
  onLoad: function (options) {
   
    wx.cloud.init({
      env: 'zimin-8ba3w',
    })
      
  },
//分享按钮
onShareAppMessage(b) {
  if (app.globalData.beaut) {
      return {
        title: `刚刚测了自己的颜值为【` + app.globalData.beaut + `】你也赶紧来试试吧！`, path: `/pages/index/index`, imageUrl: ``
      }
    } else {
      return {
        title: `刚刚测了自己的颜值，你也赶紧来试试吧！`, path: `/pages/index/index` , imageUrl: ``
      }
    }
  }
})
