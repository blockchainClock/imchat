import api from './config.js'

 function paramsFun(json) {
 	if (!json) return ''
 	return cleanArray(
 		Object.keys(json).map(key => {
 			if (json[key] === undefined) return ''
 			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
 		})
 	).join('&')
 }

 /**
  * @param {Array} actual
  * @returns {Array}
  */
 function cleanArray(actual) {
 	const newArray = []
 	for (let i = 0; i < actual.length; i++) {
 		if (actual[i]) {
 			newArray.push(actual[i])
 		}
 	}
 	return newArray
 }
 const request = (options) => {
	 console.log(options,'options')
	 //console.log(api.ApiUrl + options.url,'api.ApiUrl + options.url')
 	return new Promise((resolve, reject) => {
		
 		uni.request({
 			url: api.ApiUrl + options.url + (options.params ? '?' + paramsFun(options.params) :
 				''),
 			method: options.method || 'GET',
 			data: options.data || '{}',
			timeout:100000,
 			header: { 
 				'Content-Type': 'application/json',//application/x-www-form-urlencoded  application/json
 				// 'Token':options.isToken==2?uni.getStorageSync('Token'):''
 			},
 			success: (res) => {
 				//code 0 成功 -1 失败 -2token失效
 				if (res.data.code == -2) {
 					uni.hideLoading()
 					uni.showToast({ 
 						icon: "none",
 						title: res.data.msg
 					})
					
					uni.removeStorageSync('Token');
 					var pages = getCurrentPages();
 					var currPage = pages[pages.length - 1] //当前页面
 					if(currPage.route!='pages/login'){
 						uni.reLaunch({
 							url:'/pages/login/login'
 						})
 					}
					uni.clearStorageSync();
 					//resolve(res.data)
 					return;
 				}else if(res.data.code==-1){
					uni.showToast({
						icon: "none",
						title: "验证码错误"
					})
					resolve(res.data)
				} else{
 					resolve(res.data)
 				}
 			},
 			fail: (err) => {
				uni.hideLoading();
 				uni.showToast({
 					icon: "none",
 					title: "服务开小差，请重试~"
 				})
 				reject(err)
 			}
 		})
 	})
 }

 export default request
