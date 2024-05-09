<template>
  <rtc-modal v-if="showRtcModal" :inviteData="inviteData"></rtc-modal>
</template>

<script>
import { getBusinessInfo } from "@/api/imApi.js";
// import { CustomType } from "@/constants/enum";
import { InviteData, ParticipantInfo } from "@/pages/rtc/data";
import rtcModal from "@/pages/rtc/index.vue";
// import emitter from "@/utils/events";
// import { IMSDK } from "@/utils/imCommon";
// import { CbEvents, MessageType } from "open-im-sdk-wasm";
// import type {
//   MessageItem,
//   RtcInvite,
//   WSEvent,
// } from "open-im-sdk-wasm/lib/types/entity";
import IMSDK, {
  GroupStatus,
  IMMethods,
  SessionType,
  MessageStatus,
} from "openim-uniapp-polyfill";
export default {
	components:{
		rtcModal
	},
	data(){
		return{
			showRtcModal: false,
			inviteData:{},
			
		}
	},
	onMounted(){
	  IMSDK.on(CbEvents.OnRecvNewMessages, this.newMessageHandler);
	  uni.$on("OPEN_RTC_MODAL", openRtcModalHandler);
	  uni.$on("CLOSE_RTC_MODAL", closeRtcModalHandler);
	},
	
	onUnmounted(){
	  IMSDK.off(CbEvents.OnRecvNewMessages, this.newMessageHandler);
	  uni.$off("OPEN_RTC_MODAL", openRtcModalHandler);
	  uni.$off("CLOSE_RTC_MODAL", closeRtcModalHandler);
	},
	methods:{
		openRtcModalHandler (data){
		  if (this.showRtcModal) return;
		  this.inviteData.invitation = data.invitation;
		  this.inviteData.participant = data.participant;
		  this.inviteData.isJoin = data.isJoin;
		  this.showRtcModal = true;
		},
		closeRtcModalHandler () {
		  this.showRtcModal = false;
		},
		newMessageHandler (data){
		  if (this.showRtcModal) return;
		  let rtcInvite;
		  data.map((message) => {
		    if (message.contentType === MessageType.CustomMessage) {
		      const customData = JSON.parse(message.customElem.data);
		      if (customData.customType === CustomType.CallingInvite) {
		        rtcInvite = customData.data;
		      }
		    }
		  });
		  if (rtcInvite) {
		    getBusinessInfo(rtcInvite.inviterUserID).then(({ data: { users } }) => {
		      if (users.length === 0) return;
		      this.inviteData.invitation = rtcInvite;
		      this.inviteData.participant = {
		        userInfo: {
		          nickname: users[0].nickname,
		          faceURL: users[0].faceURL,
		          userID: users[0].userID,
		          ex: "",
		        },
		      };
		      this.showRtcModal.value = true;
		    });
		  }
		}
	}
}



</script>

<style lang="scss" scoped></style>
