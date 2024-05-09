
// #ifdef APP-PLUS
// import {agora} from "@/utils/constant.js";
import RtcEngine from '@/components/Agora-RTC-JS/index';
// #endif

export default {
	async initRTC({commit,dispatch,state}){
		// #ifdef APP-PLUS
		if(state.engine){
			return state.engine
		}
		
		const engine = await RtcEngine.create('a3492b9b7f4242aa81b95e982dee911d')
		commit('setEngine',engine)
		engine.addListener('JoinChannelSuccess',(channel,uid,elapsed)=>{
			commit('setDoing',true)
			commit('setUid',uid)
			commit('setChannel',channel)
		})
		engine.addListener('LeaveChannel',(stats)=>{
			commit('setDoing',false)
			commit('setUid','')
			commit('setChannel','')
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
