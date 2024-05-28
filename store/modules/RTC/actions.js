
// #ifdef APP-PLUS
// import {agora} from "@/utils/constant.js";
import RtcEngine from '@/components/Agora-RTC-JS/index';
import { CustomType } from "@/constant/im";
// #endif
let timer1;
export default {
	async initRTC({commit,dispatch,state}){
		// #ifdef APP-PLUS
		if(state.engine){
			return state.engine
		}
		
		clearInterval(timer1)
		const engine = await RtcEngine.create('a3492b9b7f4242aa81b95e982dee911d')
		commit('setEngine',engine)
		engine.addListener('JoinChannelSuccess',(channel,uid,elapsed)=>{
			console.log('JoinChannelSuccess', 'JoinChannelSuccess')
			commit('setDoing',true)
			commit('setUid',uid)
			commit('setChannel',channel)
			// engine.leaveChannel()
		})
		engine.addListener('LeaveChannel',(stats)=>{
			console.log('leave calling room',)
			commit('setDoing',false)
			commit('setUid','')
			commit('setChannel','')
			clearInterval(timer1)
			setTimeout(()=>{
				commit('setCallTime',0)
			},1000)
			// engine.leaveChannel()
		})
		engine.addListener('UserJoined',(uid, elapsed)=>{
			console.log('leave calling room',)
			commit('setDoing',false)
			commit('setUid','')
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
					webUrl: url + '&data=' + time.toString()
				},
				   (res) => {
				});
			},1000)
			
			// engine.leaveChannel()
		})
		
		
		engine.addListener('Error',(data)=>{
			clearInterval(timer1)
			setTimeout(()=>{
				commit('setCallTime',0)
			},1000)
		})
		uni.$on('call' + CustomType.CallingReject,()=>{
			console.log('对方已拒绝')
			engine.leaveChannel()
			uni.showToast({
				title: '对方已拒绝您的通话',
				icon:'none'
			})
			uni.$openWebview.hide()
			clearInterval(timer)
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
