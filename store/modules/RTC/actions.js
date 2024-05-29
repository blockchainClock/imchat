
// #ifdef APP-PLUS
// import {agora} from "@/utils/constant.js";
import RtcEngine from '@/components/Agora-RTC-JS/index';
import { CustomType } from "@/constant/im";
// #endif
let timer1;
let listeners = [];
export default {
	async initRTC({commit,dispatch,state}){
		// #ifdef APP-PLUS
		if(state.engine){
			return state.engine
		}
		
		clearInterval(timer1)
		
		const engine = await RtcEngine.create('a3492b9b7f4242aa81b95e982dee911d')
		commit('setEngine',engine)
		listeners = [
			{
				//自己加入房间成功
				event:'JoinChannelSuccess',
				handle:(channel, uid, elapsed)=>{
					uni.$emit('innerJoinChannelSuccess', {uid: uid,channel: channel, elapsed:elapsed })
				}
			},
			{
				//对方加入房间,即对方接通了通话
				event:'UserJoined',
				handle:(uid, elapsed)=>{
					console.info('UserJoined///////////', uid, elapsed);
					uni.$emit('innerUserJoined', ({uid: uid,reason:elapsed }))
					commit('setDoing',false)
					commit('setUid',uid)
					commit('setChannel','')
					let time = 0;
					clearInterval(timer1)
					timer1 = setInterval(()=>{
						time = time + 1;
						commit('setCallTime',time)
						let css = {
							'padding':'5px',
							'width':'60px',
							'height':'60px',
							'line-height':'25px'
						}
						let url = "file:///android_asset/index.html?css=" + JSON.stringify(css)
						
						uni.$openWebview.update({
							webUrl: url + '&data=' + time.toString() + 's'
						},
						   (res) => {
						});
					},1000)
				}
			},
			{
				//有用户离开通话房间,即对方结束通话
				event:'UserOffline',
				handle:(uid, reason)=>{
					
					uni.$emit('innerUserOffline',{uid: uid,reason:reason })
				}
			},
			{
				//自己离开通话房间
				event:'LeaveChannel',
				handle:(stats)=>{
					uni.$emit('innerLeaveChannel', stats)
					console.log('leave calling room',)
					uni.$off('call' + CustomType.CallingHungup)
					uni.$off('call' + CustomType.CallingReject)
					commit('setDoing',false)
					commit('setUid','')
					commit('setChannel','')
					commit('setEngine',null)
					listeners.forEach(({event,handle})=>{
						engine.removeListener(event,handle)
					})
					uni.navigateBack()
					// engine.destroy()
					clearInterval(timer1)
					setTimeout(()=>{
						commit('setCallTime',0)
					},1000)
				}
			},
			{
				//对方切换成语音通话
				event:'UserEnableVideo',
				handle:(uid,enabled)=>{
					uni.$emit('innerUserEnableVideo', {uid: uid,enabled:enabled })
				}
			},
			{
				event:"Error",
				handle:(err)=>{
					clearInterval(timer1)
					listeners.forEach(({event,handle})=>{
						engine.removeListener(event,handle)
					})
					setTimeout(()=>{
						commit('setCallTime',0)
					},1000)
				}
				
			}
		]
		
		listeners.forEach(({event,handle})=>{
			engine.addListener(event,handle)
		})
		uni.$on('call' + CustomType.CallingReject,()=>{
			console.log('对方已拒绝')
			engine.leaveChannel()
			uni.showToast({
				title: '对方已拒绝您的通话',
				icon:'none'
			})
			uni.$openWebview.hide()
			clearInterval(timer1)
			setTimeout(()=>{
				commit('setCallTime',0)
			},1000)
			
		})
		uni.$on('call' + CustomType.CallingHungup,()=>{
			engine.leaveChannel()
			uni.showToast({
				title: '对方已挂断，通话结束',
				icon:'none'
			})
			uni.$openWebview.hide()
			clearInterval(timer1)
			setTimeout(()=>{
				commit('setCallTime',0)
			},1000)
			// uni.navigateBack()
			
		})
		
		return engine
		// #endif
	},
	async destroyRTC({commit,state}){
		// #ifdef APP-PLUS
		if(!state.engine){
			return null
		}
		await state.engine.destroy()
		commit('setEngine',null)
		commit('setDoing',false)
		commit('setUid','')
		commit('setChannel','')
		// #endif
	}
}
