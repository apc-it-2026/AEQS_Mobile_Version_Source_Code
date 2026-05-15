import { traObjKey } from '@/util'
const url = process.uniEnv.baseUrl;
const urlTag = "/api/CommonCall"
const BaseUrl = url + urlTag

//UserToken 覆盖用的token
//hiddenToken 是否隐藏token
//method 请求方法
//type 请求类型
//ClassName class名
//Data  请求报文
//DllName  dll名
//needParse 是否需要解析字符串形式的报文
//notTra 不将报文转成小写
//notTraRetData 不处理RetData
const myRequest = (option) => {
	// 将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
	return new Promise((resolve, reject) => {
		let token = option.UserToken || uni.getStorageSync('UserToken');
		if (option.hiddenToken) token = ""
		uni.request({
			url: BaseUrl,
			method: option.type || "POST",
			data: {
				"ClassName": option.ClassName,
				"Data": option.Data || {},
				"DllName": option.DllName || option.ClassName.split('.')[0],
				"IP4": "",
				"IsRasRequst": "false",
				"IsRasResult": "false",
				"MAC": "",
				"Method": option.Method,
				"RasResultKey": "",
				"UserToken": token
			},
			success: (res) => {
				if (res.data.IsSuccess) {
					if (option.needParse) {
						try {
							res.data.RetData && (res.data.RetData = JSON.parse(res.data.RetData))
							res.data.RetData1 && (res.data.RetData1 = JSON.parse(res.data.RetData1))
						} catch (error) { }
					}
					if (!option.notTra) {
						try {
							res.data.RetData && (res.data.RetData = traObjKey(res.data.RetData))
							res.data.RetData1 && (res.data.RetData1 = traObjKey(res.data.RetData1))
						} catch (error) { }
					}
					if (!option.notTraRetData) {
						try {
							res.data = res.data.RetData1 || res.data.RetData
						} catch (error) { }
					}
					log(option, res.data)
					resolve(res.data)//返回报文
				} else {
					log(option, res.data.ErrMsg, true)
					reject(res.data.ErrMsg)//接口报错
					if (res.data.ErrMsg.includes('UserToken')) {//登录失效
						setTimeout(() => {
							uni.reLaunch({ url: '../login/login' })
						}, 2000);
					}
					uni.showToast({
						title: res.data.ErrMsg,
						duration: 2000,
						icon: 'none',
					});
				}
			},
			fail: (err) => {
				uni.showToast({
					title: uni.$vue.$t('common.网络错误') + ':' + JSON.stringify(err),
					duration: 2000,
					icon: 'none',
				});
				log(option, err, true)
				reject(err)//网络错误
			}
		})
	})
}
function log(option, res, isERR) {
	// #ifdef H5
	console.group("%c%s", "color: #0ab99c;  font-size: 14px;", "接口打印:" + option.remark + " " + option.Method);
	console.log("%c%s", "color: #398ade; font-size: 12px;", '请求报文-----', JSON.parse(JSON.stringify(option.Data)))
	console[isERR ? 'error' : 'log']("%c%s", "color: #398ade; font-size: 12px;", '响应报文-----', JSON.parse(JSON.stringify(res)))
	console.groupEnd();
	// #endif
	// #ifndef H5
	console.log(option.remark + '请求报文-----', JSON.parse(JSON.stringify(option.Data)))
	console.log(option.remark + '响应报文-----', JSON.parse(JSON.stringify(res)))
	// #endif
}

export default {
	BaseUrl,
	myRequest,
	url,
}
