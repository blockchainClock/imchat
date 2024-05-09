import * as types from './mutation-types'

export default {
	setEngine(state,payload){
		state.engine = payload
	},
	setDoing(state,payload){
		state.isDoing = payload
	},
	setChannel(state,payload){
		state.channel = payload
	},
	setUid(state,payload){
		state.uid = payload
	}
}
