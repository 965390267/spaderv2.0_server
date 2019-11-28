const https = require("https");
const token = "71b8caef196044afbb5d313116b2943bcb71acd5341f39d47706eb21ea2f70ac"; //钉钉token
const url = 'oapi.dingtalk.com'; //钉钉基础地址
const mobiles = ['1363333333']; //被at的联系人的电话

function sendDD(content,ddtoken) {

  var parms= {
        "msgtype": "link",
        "link":content,
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
        path: '/robot/send?access_token=' + ddtoken,
        method: "POST",
        json: true,
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        }
    });
    req.write(requestData);
    req.on('data', function (data) { console.log(data);
        if (msg.statusCode === 200) {
          
           
        }
    });
 req.on('error',function(err){


 })
    req.end();
}

module.exports = sendDD;