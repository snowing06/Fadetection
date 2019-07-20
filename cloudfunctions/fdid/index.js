// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");
const secret = require('./config.js');
cloud.init({
  env: 'zimin-8ba3w'
})
var synDetectFace=function(url){
  const IaiClient = tencentcloud.iai.v20180301.Client;
const models = tencentcloud.iai.v20180301.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("AKIDqSyjcIk060f4JJfZswlLgGZ4PWQ4JzJR", "2oNq68vdLAo56pJgpiLhu8Un2LPFzxHM");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile); //调用就近地域

  let req = new models.DetectFaceRequest();
  let params = '{"Url":"' + url + '","NeedFaceAttributes":1}' //拼接参数
  req.from_json_string(params);
  return new Promise(function (resolve, reject) { //构造异步函数
    client.DetectFace(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}
// 云函数入口函数
exports.main = async (event, context) => {
  const fileList = [event.fileID] //读取来自客户端的fileID
  console.log("fileID:" + event.fileID)
  const result = await cloud.getTempFileURL({ //向云存储发起读取文件临时地址请求
    fileList,
  })
  console.log("result:" + JSON.stringify(result))
  const url = result.fileList[0].tempFileURL
  console.log("url:" + url)
  datas = await synDetectFace(url) //调用异步函数，向腾讯云API发起人脸检测请求
  return datas
}