// pages/PKing/PKing.js
var app = getApp();
Page({
  data: {
    conmpare1:"",
    conmpare2: "",
    age: "",
      beauty:"",
      plain:false,//按钮初始是镂空状态
      gender: "",
      gender11:"", 
      age1:"",
      beauty1:"",
      gender1:"",  
      image_src:
  "http://ku.90sjimg.com/element_origin_min_pic/17/03/15/687715db58e62ebd1c8f8eafb5939293.jpg",
    image_src1:"",
image_src2:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.navigateTo({

      url: '../../pages/index/index',

    })
  },
  pk:function(){
    
  },
 
  getUsersInfo: function () {
    //读取缓存登录
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        this.gender = res.result.FaceInfos[0].FaceAttributesInfo.Gender
      }
    })
  },
  onShow: function () {
     this.setData({
       image_src:app.globalData.image_data,
     gender11: app.globalData.gende,
       age: app.globalData.ag,
       beauty: app.globalData.beaut
     });
    if (app.globalData.gende >= 50) {
      this.setData({
        age1: 26,
        gender: "男",
        beauty1: 86,
        image_src1: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562313543&di=e1c07d5782558a92a01c7c169a91cfda&src=http://img4.cache.netease.com/lady/2013/12/2/201312021033519354e_550.jpg"
      });
      if (app.globalData.beaut < 86) {
        this.setData({
          compare2: "<"
        });
      }
      else if (app.globalData.beaut > 86) {
        this.setData({
          compare2: ">"
        });
      }
      else {
        this.setData({
          compare2: "="
        });
      }
    }
    if (app.globalData.ag < 26) {
      this.setData({
        compare1: "<"
      });
    }
    else if (app.globalData.ag > 26) {
      this.setData({
        compare1: ">"
      });
    }
    else {
      this.setData({
        compare1: "="
      });
    }


    //女性PK
    if (app.globalData.gende < 50) {
      this.setData({
        age1: 21,
        gender: "女",
        beauty1: 89,
        image_src1: "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=50e83e06c695d143ce7bec711299e967/4b90f603738da9772b5d542ebe51f8198618e341.jpg"
      });
      if (app.globalData.ag < 21) {
        this.setData({
          compare1: "<"
        });
      }
      else if (app.globalData.ag > 21) {
        this.setData({
          compare1: ">"
        });
      }
      else {
        this.setData({
          compare1: "="
        });
      }
      if (app.globalData.beaut < 89) {
        this.setData({
          compare2: "<"
        });
      }
      else if (app.globalData.beaut > 89) {
        this.setData({
          compare2: ">"
        });
      }
      else {
        this.setData({
          compare2: "="
        });
      }
    } 
  },
  //分享按钮
  onShareAppMessage: function (options) {
    　　var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    // if (app.globalData.beaut) {
    //   return {
    //     title: `快来PK一下你的颜值吧`, path: `/pages/PKing/PKing`, imageUrl: ``
    //   }
    // } else {
    //   return {
    //     title: `快来PK一下你的颜值吧`, path: `/pages/PKing/PKing`, imageUrl: ``
    //   }
    // }
   　　　　
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)

    }if(app.globalData.gende<50){
      if(app.globalData.beaut>=89){
        return {
          title: '我竟然比刘亦菲还美，你也快来试试吧',
          path: '/pages/PKing/PKing',
          success: function (res) {
            // 转发成功
            console.log(res);
            console.log("转发成功:" + JSON.stringify(res));
          },
          fail: function (res) {
            // 转发失败
            console.log("转发失败:" + JSON.stringify(res));
          }
        }
      }
    }
    if (app.globalData.gende < 50) {
      if (app.globalData.beaut < 89) {
        app.globalData.cha=89-app.globalData.beaut

        return {
          title: `我的颜值和刘亦菲只差了` +app.globalData.cha + `分，你也快来试试吧`,
          path: '/pages/PKing/PKing',
          success: function (res) {
            // 转发成功
            console.log(res);
            console.log("转发成功:" + JSON.stringify(res));
          },
          fail: function (res) {
            // 转发失败
            console.log("转发失败:" + JSON.stringify(res));
          }
        }
      }
    }
    if (app.globalData.gende > 50) {
      if (app.globalData.beaut >= 86) {
        return {
          title: '哈哈，我比吴彦祖还帅，你也快来试试吧',
          path: '/pages/PKing/PKing',
          success: function (res) {
            // 转发成功
            console.log(res);
            console.log("转发成功:" + JSON.stringify(res));
          },
          fail: function (res) {
            // 转发失败
            console.log("转发失败:" + JSON.stringify(res));
          }
        }
      }
    }
    if (app.globalData.gende > 50) {
      if (app.globalData.beaut< 86) {
        app.globalData.cha = 86 - app.globalData.beaut
        return {
          title: `我的颜值和吴彦祖只差了` +app.globalData.cha + `分,你也快来试试吧`,
          path: '/pages/PKing/PKing',
          success: function (res) {
            // 转发成功
            console.log(res);
            console.log("转发成功:" + JSON.stringify(res));
          },
          fail: function (res) {
            // 转发失败
            console.log("转发失败:" + JSON.stringify(res));
          }
        }
      }
    }
}
})