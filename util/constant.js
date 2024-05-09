export const sign = "console.log(hello wold)";

// export const BASE_URL = 'http://kechat.vs2015.net';//https://im-api.kechat.io http://kechat.vs2015.net
export const BASE_URL = 'https://im-api.kechat.io';//https://im-api.kechat.io  http://127.0.0.1:33050/kechat
export const BASE_URL_SW = 'https://im-api.kechat.io';//https://im-api.kechat.io http://kechat.vs2015.net http://127.0.0.1:33050

export const VERSION = '1.0.7'



export const Bucket = 'knsim-1318387091'	
export const Region = 'ap-nanjing'	



export const templates = {
	follow:'',
	praise:'', 
	comment:'', 
	petBirthday:'', 
	petAnniversary:'', 
}

export const storageKey = {	
	sessionUserInfo:'sessionUserInfo',
	token:'token',
	userId:'userId'
}
// #ifdef MP
export const unauthPath = '/pages/accreditUserInfo/index' 
// #endif
// #ifndef MP
export const unauthPath = '/pages/login/login' 
// #endif
export const homePath = '/pages/index/index' 

export const IMConfig = { 
	protocol:'wss://',//wss://   ws://
	IP:'im.kechat.io',//im.kechat.io     127.0.0.1:33050/websocket  app1.vs2015.net:33050/websocket_api
	port:'',//443
	method:'GET',
	// httpBase:'http://kechat.vs2015.net',//https://im.kechat.io http://kechat.vs2015.net
	httpBase:'https://im.kechat.io'//https://im.kechat.io   http://127.0.0.1:33050/kechat  http://app1.vs2015.net:33050/kechat_api
}

export const STAFF={
	QQ:'',
	EMAIL:''
}

export const agora = {
	appId:'119025fa0afb40aea16fa3d3fabce92e'
}

export const uniConfig = { 
	provider: '',
	spaceId: '',
	clientSecret: ''
}