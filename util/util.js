// #ifdef H5
import clipboardCopy from "clipboard-copy";
// #endif
import {
	homePath
} from "@/util/constant.js"


export const delay = (duration = 0) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, duration)
	})
}
export const toast = (title, duration = 1500) => {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	});
};

export const dateDiff = timestamp => {
	
	if (!timestamp) {
		return timestamp
	} 
	
	try{
		 if(!(timestamp instanceof Date)){
			if(typeof timestamp=='string' && timestamp.includes("-")){
				timestamp = timestamp.replace(/-/g, '/');
				timestamp = new Date(timestamp)
			}else{ 
				timestamp = new Date(timestamp)
			}
		 }
	}catch(e){
		
		return ''
	}
	const now = new Date()
	
	const year = timestamp.getFullYear()
	const month = timestamp.getMonth()
	const day = timestamp.getDate()
	
	if(now.getFullYear()!=year){ 
		return timestamp.Format('yyyy-MM-dd')
	}
	if(now.getDate()==day){
		
		
		
		
		
		
			return timestamp.Format('HH:mm')
		
	}else{
		return timestamp.Format('MM-dd')
	}
}; 

export const getLocation = ({
	type = 'gcj02',
	altitude = false,
	geocode = false
} = {}) => {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type,
			altitude,
			geocode,
			success: resolve,
			fail: reject
		})
	})
}
export const authLocation = async ({
	title = '是否授权当前位置',
	content = '需要获取您的地理位置，请确认授权'
} = {}) => {
	// #ifdef MP
	const {
		authSetting
	} = await new Promise((resolve, reject) => {
		uni.getSetting({
			success: resolve,
			fail: reject
		})
	})
	console.log('authSetting', authSetting)
	if (authSetting['scope.userLocation'] == false) {
		await new Promise((resolve, reject) => {
			uni.showModal({
				title,
				content,
				success({
					confirm
				}) {
					if (!!confirm) {
						resolve()
					} else {
						reject()
						toast('您未授权定位服务')
					}
				},
				faill: reject
			})
		})
		const res = await new Promise((resolve, reject) => {
			uni.openSetting({
				success: resolve,
				fail: reject
			})
		})
		return res.authSetting["scope.userLocation"]
	} else {
		toast('请在系统设置中打开定位服务', 1500);
		throw new Error('定位服务未开启')
	}
	// #endif

	// #ifdef APP-PLUS
	const system = uni.getSystemInfoSync(); 
	if (system.platform === 'android') { 
		const context = plus.android.importClass("android.content.Context");
		const locationManager = plus.android.importClass("android.location.LocationManager");
		const main = plus.android.runtimeMainActivity();
		const mainSvr = main.getSystemService(context.LOCATION_SERVICE);

		var Intent = plus.android.importClass('android.content.Intent');
		var Settings = plus.android.importClass('android.provider.Settings');

		if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) { 
			uni.showModal({
				title: '提示',
				content: '请打开定位服务功能',
				showCancel: false,
				success() {
					const intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
					main.startActivity(intent); 
				}
			});
		} else { 
			uni.showModal({
				title: '提示',
				content: '请授予位置权限',
				showCancel: false,
				success() {
					const intent = new Intent(Settings.ACTION_APPLICATION_SETTINGS);
					main.startActivity(intent); 
				}
			});
		}
	} else if (system.platform == 'ios') { 
		uni.showModal({
			title: '提示',
			content: '请打开定位服务功能',
			showCancel: false, 
			success() {
				plus.runtime.openURL("app-settings://");
			}
		});
	}
	// #endif
}
export const chooseLocation = ({
	latitude,
	longitude,
	keyword
} = {}) => {
	return new Promise((resolve, reject) => {
		uni.chooseLocation({
			latitude,
			longitude,
			keyword,
			success: resolve,
			fail: reject
		})
	})

}
export const openMap = ({
	latitude,
	longitude,
	scale = 18,
	name,
	address
}) => {
	return new Promise((resolve, reject) => {
		uni.openLocation({
			latitude,
			longitude,
			scale,
			address,
			success: resolve,
			fail: reject
		})
	})
}

export const jumpTo = (href, type = 0) => {
	if (type == 0) {
		uni.navigateTo({
			url: href
		});
	}
	if (type == 1) {
		// #ifdef APP-PLUS
		plus.runtime.openURL(href);
		// #endif
		// #ifdef H5
		window.open(href);
		// #endif
		// #ifdef MP-WEIXIN
		href = href.split('&').join('^')
		uni.navigateTo({
			url: `/pages/toHtml/toHtml?url=${href}`
		})
		// #endif
	}
	if (type == 2) {
		href = href.split('&').join('^')
		uni.navigateTo({
			url: `/pages/toHtml/toHtml?url=${href}`
		})
	}
}

export const copy = (data) => {
	// #ifdef H5
	return clipboardCopy(data).then(() => {
		uni.showToast({
			title: '内容已复制',
			icon: 'success'
		})
	}).catch(() => {
		toast('复制失败')
	})
	// #endif
	// #ifndef H5
	return new Promise((resolve, reject) => {
		uni.setClipboardData({
			data,
			success: resolve,
			fail: reject
		})
	})
	// #endif
}

export const compareVer = (curV, reqV) => {
	if (curV && reqV) {
		
		var arr1 = curV.split('.'),
			arr2 = reqV.split('.');
		var minLength = Math.min(arr1.length, arr2.length),
			position = 0,
			diff = 0;
		
		while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
			position++;
		}
		diff = (diff != 0) ? diff : (arr1.length - arr2.length);
		
		return diff > 0;
	} else {
		
		console.log("版本号不能为空");
		return false;
	}
}

export const getNetworkType = () => {
	return new Promise((resolve, reject) => {
		uni.getNetworkType({
			success: resolve,
			fail: reject
		})
	})
}

export const goback = (delta = 1) => {
	const routes = getCurrentPages()
	if (routes.length > delta) {
		uni.navigateBack({
			delta
		})
	} else {
		uni.reLaunch({
			url: homePath
		})
	}
}

export const switchTab = ({
	index = 0
}) => {
	const routes = getCurrentPages()
	console.log(homePath)
	const i = routes.findIndex(({
		route
	}) => homePath.endsWith(route))
	if (i < 0) {
		return uni.reLaunch({
			url: `${homePath}?cur=${index}`
		})
	}
	if (routes.length - i > 1) {
		uni.navigateBack({
			delta: (routes.length - i - 1)
		})
	}
	uni.$emit('switchTab', index)
}
export const vibrateLong = () => {
	return new Promise((resolve, reject) => {
		// #ifdef H5
		console.log("H5没有震动能力")
		resolve()
		// #endif
		// #ifndef H5
		uni.vibrateLong({
			success: resolve,
			fail: reject
		})
		// #endif
	})
}

export const guid = (len = 32, firstU = true, radix = null) => {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [];
	radix = radix || chars.length;

	if (len) {
		
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		let r;
		
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	
	if (firstU) {
		uuid.shift();
		return 'u' + uuid.join('');
	} else {
		return uuid.join('');
	}
}




export const getVersion = () => {
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, ({
			version,
			versionCode
		}) => {
			console.log(version, versionCode)
			resolve({
				version,
				versionCode
			})
		})
	})
}

export const install = (filePath, options = {
	force: true
}) => {
	return new Promise((resolve, reject) => {
		plus.runtime.install(filePath, options, resolve, reject)
	})
}

export const appRestart = () => {
	plus.runtime.restart();
}
export const appPlatform = () => {
	return plus.os.name;
}

export const getClientInfo = () => {
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		plus.push.getClientInfoAsync(resolve, reject)
		// #endif
		// #ifndef APP-PLUS
		resolve({})
		// #endif
	})
}

export const bindAlias = (alias) => {
	if (plus.os.name == 'Android') {
		const PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
		const context = plus.android.runtimeMainActivity().getContext();
		const Instance = PushManager.getInstance();
		Instance.bindAlias(context, alias);
	} else {
		const GeTuiSdk = plus.ios.importClass("GeTuiSdk");
		GeTuiSdk.bindAliasandSequenceNum(alias, alias);
	}
}

export const unbindAlias = (alias) => {
	if (plus.os.name == 'Android') {
		const PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
		const context = plus.android.runtimeMainActivity().getContext();
		const Instance = PushManager.getInstance();
		Instance.unBindAlias(context, alias, true);
	} else {
		const GeTuiSdk = plus.ios.importClass("GeTuiSdk");
		GeTuiSdk.unbindAliasandSequenceNumandIsSelf(alias, alias, true);
	}
}

export const getNotificationsEnabled = () => {
	if (plus.os.name == 'Android') {
		let main = plus.android.runtimeMainActivity();
		let pkName = main.getPackageName();
		let uid = main.getApplicationInfo().plusGetAttribute("uid");
		let NotificationManagerCompat = plus.android.importClass(
		"android.support.v4.app.NotificationManagerCompat");
		
		if (NotificationManagerCompat == null) {
			NotificationManagerCompat = plus.android.importClass("androidx.core.app.NotificationManagerCompat");
		}
		let areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled()
		return areNotificationsEnabled
	} else {
		let UIApplication = plus.ios.import("UIApplication");
		let app = UIApplication.sharedApplication();
		let enabledTypes = 0;
		if (app.currentUserNotificationSettings) {
			let settings = app.currentUserNotificationSettings();
			enabledTypes = settings.plusGetAttribute("types");
		} else {
			
			enabledTypes = app.enabledRemoteNotificationTypes();
		}
		plus.ios.deleteObject(app);
		return !!enabledTypes
	}
}

export const openNotificationsSetting = () => {
	if (plus.os.name == 'Android') {
		let main = plus.android.runtimeMainActivity();
		let pkName = main.getPackageName();
		let uid = main.getApplicationInfo().plusGetAttribute("uid");
		let Intent = plus.android.importClass('android.content.Intent');
		let Build = plus.android.importClass("android.os.Build");
		
		let intent = null
		if (Build.VERSION.SDK_INT >= 26) {
			intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
			intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
		} else if (Build.VERSION.SDK_INT >= 21) { 
			intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
			intent.putExtra("app_package", pkName);
			intent.putExtra("app_uid", uid);
		} else { 
			let Settings = plus.android.importClass("android.provider.Settings");
			let Uri = plus.android.importClass("android.net.Uri");
			intent = new Intent();
			intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
			let uri = Uri.fromParts("package", main.getPackageName(), null);
			intent.setData(uri);
		}
		main.startActivity(intent);
	} else {
		let UIApplication = plus.ios.import("UIApplication");
		let NSURL = plus.ios.import("NSURL");
		let setting = NSURL.URLWithString("app-settings:");
		let application = UIApplication.sharedApplication();
		application.openURL(setting);
		plus.ios.deleteObject(setting);
		plus.ios.deleteObject(application);
	}
}

export const existApp = (info) => {
	return plus.runtime.isApplicationExist(info)
}
existApp.map = {
	weixin: {
		pname: 'com.tencent.mm',
		action: 'weixin://'
	},
	qq: {
		pname: 'com.tencent.mobileqq',
		action: 'mqq://'
	}
}


export const getSetting = (withSubscriptions = false) => {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			withSubscriptions,
			success: resolve,
			fail: reject
		})
	})
}

export const requestSubscribeMessage = (tmplIds) => {
	return new Promise((resolve, reject) => {
		uni.requestSubscribeMessage({
			tmplIds,
			success: resolve,
			fail: reject
		})
	})
}

export const openAppSetting = () =>{
	// #ifdef APP-PLUS
	if (plus.os.name == 'Android') {
		var main = plus.android.runtimeMainActivity();  
		var Intent = plus.android.importClass("android.content.Intent");
		var mIntent = new Intent('android.settings.WIRELESS_SETTINGS');  
		main.startActivity(mIntent);
	}else{
		toast('暂无网络连接\n请您检查是否系统设置=>蜂窝移动网络\n中是否允许使用蜂窝移动网络的流量')
	}
	// #endif
}
