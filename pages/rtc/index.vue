<template>
	<view>
		<RtcLayout
		  :inviteData="inviteData"
		  :authData="config"
		  :connect="connect"
		  :isConnected="isConnected"
		  @connectRtc="connectRtc"
		  :room="room"
		  :sendCustomSignal="sendCustomSignal"
		/>
	</view>
 
</template>

<script>
// import { useRoom } from "/util/open-im-rtc";
// import { IMSDK } from "@/utils/imCommon";
// import { InviteData } from "./data";
// import useUserStore from "@/store/modules/user";
import RtcLayout from "./RtcLayout/index.vue";
// import emitter from "@/utils/events";
// import { feedbackToast } from "@/utils/common";
import { CustomType } from "@/constant/comp";
import { getRtcConnectData } from "@/api/imApi";
import { mapGetters, mapActions } from "vuex";
import { v4 as uuidV4 } from "uuid";
import IMSDK, {
  GroupStatus,
  IMMethods,
  SessionType,
  MessageStatus,
} from "openim-uniapp-polyfill";
export default {
	components:{
		RtcLayout,
	},
	props:{
		inviteData:{}
	},
	computed: {
	  ...mapGetters([
	    "storeSelfInfo"
	  ]),
	},
	mounted() {
		// this.room = useRoom({
		//   refConfig: this.config,
		//   onConnected: () => {
		// 	this.isConnected = true;
		//   },
		//   onDisconnected: () => {
		// 	this.connect = false;
		// 	this.isConnected = false;
		// 	this.config.connect = false;
		//   },
		//   onError: (error) => {
		// 	console.error(error);
		//   },
		// })
		this.tryInvite()
	},
	data(){
		return{
			inviteData:{},
			connect:false,
			isConnected:false,
			props:{},
			config:{
				  serverUrl: "",
				  token: "",
				  connect: false,
				  audio: true,
				  video: this.inviteData.invitation?.mediaType === "video",
			},
			isRecv:this.storeSelfInfo.userID !== this.inviteData.invitation?.inviterUserID,
			room: {},
			timer:0,
		}
	},
	methods:{
		connectRtc(data){
			if (data) {
			    this.config.serverUrl = data.liveURL;
			    this.config.token = data.token;
			    this.config.connect = true;
			  }
			  this.connect = true;
			
		},
		clearTimer (){
			clearTimeout(this.timer)
		},
		checkTimeout(){
		  if (this.timer) clearTimer();
		  this.timer = setTimeout(() => {
		    clearTimer();
		    if (!this.inviteData.invitation) return;
		
		    sendCustomSignal(
		      this.inviteData.invitation?.inviteeUserIDList[0],
		      CustomType.CallingCancel
		    );
		  }, 30 * 1000);
		},
		async tryInvite(){
		  if (!this.isRecv) {
		    try {
		      const { data } = await getRtcConnectData(
		        uuidV4(),
		        this.storeSelfInfo.userID
		      );
		      this.config.serverUrl = data.serverUrl;
		      this.config.token = data.token;
		      this.config.connect = true;
		      await sendCustomSignal(
		        this.inviteData.invitation?this.inviteData.invitation.inviteeUserIDList[0]:{},
		        CustomType.CallingInvite
		      );
		      checkTimeout();
		    } catch (error) {
		      // feedbackToast({ message: t("rtc.invitationFailed"), error });
		      uni.$emit("CLOSE_RTC_MODAL");
		    }
		  }
		},
		async sendCustomSignal (recvID, customType) {
		  const data = {
				customType,
				data: {
				  ...this.inviteData.invitation,
				},
			  };
		  const { data: message } = await IMSDK.createCustomMessage({
		    data: JSON.stringify(data),
		    extension: "",
		    description: "",
		  });
		  await IMSDK.sendMessage({
		    recvID,
		    message,
		    groupID: "",
		    isOnlineOnly: true,
		  });
		}
	}
}
// const { t } = useI18n();
// const userStore = useUserStore();

// const connect = ref(false);
// const isConnected = ref(false);
// const config = reactive({
//   serverUrl: "",
//   token: "",
//   connect: false,
//   audio: true,
//   video: props.inviteData.invitation?.mediaType === "video",
// });
// const isRecv = computed(
//   () => userStore.selfInfo.userID !== props.inviteData.invitation?.inviterUserID
// );

// const room = useRoom({
//   refConfig: config,
//   onConnected: () => {
//     isConnected.value = true;
//   },
//   onDisconnected: () => {
//     connect.value = false;
//     isConnected.value = false;
//     config.connect = false;
//   },
//   onError: (error) => {
//     console.error(error);
//   },
// });

// const connectRtc = (data?: any) => {
//   if (data) {
//     config.serverUrl = data.liveURL;
//     config.token = data.token;
//     config.connect = true;
//   }
//   connect.value = true;
// };

// const timer = ref<NodeJS.Timeout>();
// const clearTimer = () => clearTimeout(timer.value!);
// const checkTimeout = () => {
//   if (timer.value) clearTimer();
//   timer.value = setTimeout(() => {
//     clearTimer();

//     if (!props.inviteData.invitation) return;

//     sendCustomSignal(
//       props.inviteData.invitation?.inviteeUserIDList[0],
//       CustomType.CallingCancel
//     );
//   }, (props.inviteData.invitation?.timeout ?? 30) * 1000);
// };

// const tryInvite = async () => {
//   if (!isRecv.value) {
//     try {
//       const { data } = await getRtcConnectData(
//         uuidV4(),
//         userStore.selfInfo.userID
//       );
//       config.serverUrl = data.serverUrl;
//       config.token = data.token;
//       config.connect = true;
//       await sendCustomSignal(
//         props.inviteData.invitation!.inviteeUserIDList[0],
//         CustomType.CallingInvite
//       );
//       checkTimeout();
//     } catch (error) {
//       feedbackToast({ message: t("rtc.invitationFailed"), error });
//       emitter.emit("CLOSE_RTC_MODAL");
//     }
//   }
// };

// const sendCustomSignal = async (recvID: string, customType: CustomType) => {
//   const data = {
//     customType,
//     data: {
//       ...props.inviteData.invitation,
//     },
//   };
//   const { data: message } = await IMSDK.createCustomMessage({
//     data: JSON.stringify(data),
//     extension: "",
//     description: "",
//   });
//   await IMSDK.sendMessage({
//     recvID,
//     message,
//     groupID: "",
//     isOnlineOnly: true,
//   });
// };

// onMounted(() => {
//   tryInvite();
// });
</script>

<style lang="scss" scoped></style>
