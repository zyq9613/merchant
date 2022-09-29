import COS from 'cos-js-sdk-v5'

var Bucket = 'redenlops01-1313983242';
var Region = 'ap-guangzhou'; 


// let uploadFileName = Date.parse(new Date())
	var cos = new COS({
	    // getAuthorization 必选参数
	    SecretId:'AKIDSn00sb8Uk2NYXHyaBZuByeQUjs7znWBm',
		SecretKey:'bCuafdgeTDxRD1pbKsHc0IQM5ZzENK6h',
	    // getAuthorization: function (options, callback) {
	    //     // 初始化时不会调用，只有调用cos方法（比如cos.putObject）时才会进入
	    //     // 异步获取临时密钥
	    //     // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
	    //     // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
	    //     // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

	        

	    //     // var url = 'http://example.com/server/sts.php'; // url替换成您自己的后端服务
	    //     // var xhr = new XMLHttpRequest();
	    //     // xhr.open('GET', url, true);
	    //     // xhr.onload = function (e) {
	    //     //     try {
	    //     //         var data = JSON.parse(e.target.responseText);
	    //     //         var credentials = data.credentials;
	    //     //     } catch (e) {
	    //     //     }
	    //     //     if (!data || !credentials) {
	    //     //       return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
	    //     //     };
	    //     //     callback({
	    //     //       TmpSecretId: credentials.tmpSecretId,
	    //     //       TmpSecretKey: credentials.tmpSecretKey,
	    //     //       SecurityToken: credentials.sessionToken,
	    //     //       // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
	    //     //       StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
	    //     //       ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
	    //     //   });
	    //     // };
	    //     // xhr.send();
	    // }
	    
	});

// export default function(file,callback){
	
	// cos.uploadFile({
 //      Bucket: Bucket, /* 填写自己的bucket，必须字段 */
 //      Region: Region,     /* 存储桶所在地域，必须字段 */
 //      Key: uploadFileName + '-' + file.name,              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
 //      Body: file, // 上传文件对象
 //      SliceSize: 1024 * 1024 * 5,      触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 
      
	  
 //    },function (err, data) {
 //         callback(err)
 //        if (err) {
 //            callback(err)
 //        } else {
 //            let fileUrl = 'https://' + data.Location
            
 //            callback(data)
 //        }
 //    })
// }

export default cos;
	
