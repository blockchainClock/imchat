// const registerUrl = 'https://web.rentsoft.cn/chat'
// const configUrl = 'https://web.rentsoft.cn/complete_admin'
// const apiUrl = 'https://web.rentsoft.cn/api'
// const wsUrl = 'wss://web.rentsoft.cn/msg_gateway'
// 119.8.104.83
// 192.168.43.36
const baseHttpUrl = 'http://192.168.43.36'
const baseWsUrl = 'ws://192.168.43.36'

const registerUrl = baseHttpUrl + ':10008' //chat.keynes.com
const configUrl = baseHttpUrl + ':10009'  // chat-admin.keynes.com
const apiUrl = baseHttpUrl + ':10002'  // im.keynes.com
// const registerUrl = 'http://119.8.104.83:10008'
// const configUrl = 'http://119.8.104.83:10009'
// const apiUrl = 'http://119.8.104.83:10002'

let wsUrl = baseWsUrl + ':10001'
const version = ''
// 高德地图web api key  用于根据经纬度生成快照  当前key已绑定安卓包名  需要自行申请替换
const AmapWebKey = "";

const getRegisterUrl = () => uni.getStorageSync("IMRegisteUrl") || registerUrl;
const getConfigUrl = () => uni.getStorageSync("IMConfigUrl") || configUrl;
const getApiUrl = () => uni.getStorageSync("IMApiUrl") || apiUrl;
const getWsUrl = () => uni.getStorageSync("IMWsUrl") || wsUrl;

module.exports = {
  version,
  AmapWebKey,
  getRegisterUrl,
  getConfigUrl,
  getApiUrl,
  getWsUrl,
};
