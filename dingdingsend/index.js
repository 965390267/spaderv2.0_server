const https = require("https");
const token = "919caa447462c944bec7dc51f786e9c12ee7833955108d8efeffe201de01ef55"; //钉钉token
const url = 'oapi.dingtalk.com'; //钉钉基础地址
const mobiles = ['13629642585']; //被at的联系人的电话


function sendDD(content) {
  var parms= {
        "msgtype": "link",
        "link": content,
        "at": {
          "atMobiles": [
            "15808801553"
          ],
          "isAtAll": false
        }
      }
    const requestData = JSON.stringify(parms);
    const req = https.request({
        hostname: url,
        port: 443,
        path: '/robot/send?access_token=' + token,
        method: "POST",
        json: true,
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        }
    });
    req.write(requestData);
    req.on('data', function (data) {
        if (msg.statusCode === 200) {
           
        }
    });
 req.on('error',function(err){

 })
    req.end();
}

module.exports = sendDD;