<template>
  <SingleProfile
    :userInfo="inviteData.userInfo"
    :isVideo="isVideo"
    :isWaiting="isWaiting"
    :isRecv="isRecv"
  />
</template>

<script >
	
import { Room } from 'livekit-client'
import { InviteData } from '../data'
import { mapGetters, mapActions } from "vuex";
import SingleProfile from './SingleProfile.vue'
// import useInviteData from '../useInviteData'
export default {
	components:{
		SingleProfile
	},
	props:{
		room: {},
		inviteData: {},
		isWaiting: false,
	},
	computed: {
	  ...mapGetters([
	    "storeSelfInfo"
	  ]),
	},
	data(){
		return{
			isVideo: this.inviteData?.invitation?.mediaType === 'video',
			isRecv:this.storeSelfInfo.userID !== this.inviteData.invitation?.inviterUserID
		}
	}
}
// type RtcProfileProps = {
//   room: Room
//   inviteData: InviteData
//   isWaiting: boolean
// }
// const props = defineProps<RtcProfileProps>()

// const { isVideo, isRecv } = useInviteData(props.inviteData)
</script>
