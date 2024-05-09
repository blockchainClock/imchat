<template>
	<view>
		<Connected v-if="showConnected" :room="room" @disconnect="disconnect" />
		
		<div v-if="showAccept" class="mb-[64px] flex flex-row justify-around px-2">
		  <div class="flex flex-col items-center" @click.stop="disconnect">
		    <img class="h-[62px] w-[62px]" :src="hungup" alt="hungup" />
		    <span class="mt-2 text-sm text-white">{{ $t("rtc.hungup") }}</span>
		  </div>
		  <div class="flex flex-col items-center" @click.stop="acceptInvitation">
		    <img class="h-[62px] w-[62px]" :src="accept" alt="accept" />
		    <span class="mt-2 text-sm text-white">{{ $t("rtc.accept") }}</span>
		  </div>
		</div>
	</view>
 
</template>

<script >
// import hungup from "@/assets/images/rtc/hungup.png";
// import accept from "@/assets/images/rtc/accept.png";
// import type { RtcInvite, WSEvent } from "open-im-sdk-wasm/lib/types/entity";
import { AuthData, InviteData } from "../data";
// import { IMSDK } from "@/utils/imCommon";
import IMSDK, {
  IMMethods,
  MessageReceiveOptType,
  MessageType,
  SessionType,
} from "openim-uniapp-polyfill";
// import useUserStore from "@/store/modules/user";
// import { SessionType, CbEvents, MessageType } from "open-im-sdk-wasm";
import { CustomType } from "@/constant/comp";
import { ExMessageItem } from "@/store/modules/message";
// import emitter from "@/utils/events";
import { RemoteParticipant, Room, RoomEvent } from "livekit-client";
import Connected from "./Connected.vue";
import { getRtcConnectData } from "@/api/imApi";
import { v4 as uuidV4 } from "uuid";
import { mapGetters, mapActions } from "vuex";
export default {
	props:{
		room: {},
		isWaiting: false,
		isConnected: false,
		duration: '',
		invitation: {},
		inviteData: {},
		sendCustomSignal: null,
	},
	computed: {
	  ...mapGetters([
	    "storeSelfInfo"
	  ]),
	},
	onMounted() {
	  IMSDK.subscribe(IMSDK.IMEvents.OnRecvNewMessages, this.newMessagesHandler);
	  this.room.on(
	    RoomEvent.ParticipantDisconnected,
	    participantDisconnectedHandler
	  );
	},
	
	onUnmounted(){
	  IMSDK.off(IMSDK.IMEvents.OnRecvNewMessages, this.newMessageHandler);
	  this.room.off(
	    RoomEvent.ParticipantDisconnected,
	    participantDisconnectedHandler
	  );
	},
	data(){
		return{
			isRecv:this.storeSelfInfo.userID !== this.invitation?.inviterUserID,
			recvID: this.isRecv ? this.invitation.inviterUserID: this.invitation.inviteeUserIDList[0],
			showAccept: !this.isRecv ? false: !this.isConnected,
			showConnected: this.isConnected || !this.isRecv
		}
	},
	methods:{
		async acceptInvitation(){
			try {
			  await this.sendCustomSignal(this.recvID, CustomType.CallingAccept);
			  const { data } = await getRtcConnectData(
			    this.invitation.roomID,
			    this.storeSelfInfo.userID
			  );
			  uni.$emit("connectRtc", {
			    liveURL: data.serverUrl,
			    token: data.token,
			  });
			} catch (error) {
			  console.log(error);
			  uni.$emit("CLOSE_RTC_MODAL");
			}
		},
		disconnect(){
			if (this.isWaiting) {
			  const customType = this.isRecv
			    ? CustomType.CallingReject
			    : CustomType.CallingCancel;
			  this.sendCustomSignal(this.recvID, customType);
			  uni.$emit("CLOSE_RTC_MODAL");
			  return;
			}
			this.sendCustomSignal(this.recvID, CustomType.CallingHungup);
			uni.$emit("CLOSE_RTC_MODAL");
		},
		acceptHandler(roomID){
			if (this.invitation.roomID !== roomID) return;
			uni.$emit("connectRtc", undefined);
		},
		rejectHandler(roomID){
		  if (this.invitation.roomID !== roomID) return;
		  uni.$emit("CLOSE_RTC_MODAL");
		},
		
		hangupHandler(roomID){
		  if (this.invitation.roomID !== roomID) return;
		  this.room.disconnect();
		  uni.$emit("CLOSE_RTC_MODAL");
		},
		
		cancelHandler(roomID){
		  if (this.invitation.roomID !== roomID) return;
		  if (!this.isWaiting) return;
		  uni.$emit("CLOSE_RTC_MODAL");
		},
		participantDisconnectedHandler(remoteParticipant){
		  const identity = remoteParticipant.identity;
		  if (
		    identity === this.invitation.inviterUserID ||
		    identity === this.invitation.inviteeUserIDList[0]
		  ) {
		    this.room.disconnect();
		    uni.$emit("CLOSE_RTC_MODAL");
		  }
		},
		newMessageHandler(data){
		  data.map((message) => {
		    if (message.contentType === MessageType.CustomMessage) {
		      const customData = JSON.parse(message.customElem.data) 
		      if (customData.customType === CustomType.CallingAccept) {
		        this.acceptHandler(customData.data);
		      }
		      if (customData.customType === CustomType.CallingReject) {
		        this.rejectHandler(customData.data);
		      }
		      if (customData.customType === CustomType.CallingCancel) {
		        this.cancelHandler(customData.data);
		      }
		      if (customData.customType === CustomType.CallingHungup) {
		        this.hangupHandler(customData.data);
		      }
		    }
		  });
		},
		
	}
	
}
// type IRtcControlEmits = {
//   (event: "connectRtc", data?: AuthData): void;
//   (event: "closeOverlay"): void;
// };
// type IRtcControlProps = {
//   room: Room;
//   isWaiting: boolean;
//   isConnected: boolean;
//   duration: string;
//   invitation: RtcInvite;
//   inviteData: InviteData;
//   sendCustomSignal: (recvID: string, customType: CustomType) => Promise<void>;
// };
// const emit = defineEmits<IRtcControlEmits>();
// const props = defineProps<IRtcControlProps>();

// const userStore = useUserStore();

// const isRecv = computed(
//   () => userStore.selfInfo.userID !== props.invitation?.inviterUserID
// );
// const recvID = isRecv.value
//   ? props.invitation.inviterUserID
//   : props.invitation.inviteeUserIDList[0];
// const showAccept = computed(() => {
//   if (!isRecv.value) {
//     return false;
//   }
//   return !props.isConnected;
// });
// const showConnected = computed(() => props.isConnected || !isRecv.value);


// const acceptInvitation = async () => {
//   try {
//     await props.sendCustomSignal(recvID, CustomType.CallingAccept);
//     const { data } = await getRtcConnectData(
//       props.invitation.roomID,
//       userStore.selfInfo.userID
//     );
//     emit("connectRtc", {
//       liveURL: data.serverUrl,
//       token: data.token,
//     });
//   } catch (error) {
//     console.log(error);
//     emitter.emit("CLOSE_RTC_MODAL");
//   }
// };

// const disconnect = () => {
//   if (props.isWaiting) {
//     const customType = isRecv
//       ? CustomType.CallingReject
//       : CustomType.CallingCancel;
//     props.sendCustomSignal(recvID, customType);
//     emitter.emit("CLOSE_RTC_MODAL");
//     return;
//   }
//   props.sendCustomSignal(recvID, CustomType.CallingHungup);
//   emitter.emit("CLOSE_RTC_MODAL");
// };

// const acceptHandler = async ({ roomID }: RtcInvite) => {
//   if (props.invitation.roomID !== roomID) return;
//   emit("connectRtc", undefined);
// };

// const rejectHandler = ({ roomID }: RtcInvite) => {
//   if (props.invitation.roomID !== roomID) return;
//   emitter.emit("CLOSE_RTC_MODAL");
// };

// const hangupHandler = ({ roomID }: RtcInvite) => {
//   if (props.invitation.roomID !== roomID) return;
//   props.room.disconnect();
//   emitter.emit("CLOSE_RTC_MODAL");
// };

// const cancelHandler = ({ roomID }: RtcInvite) => {
//   if (props.invitation.roomID !== roomID) return;
//   if (!props.isWaiting) return;
//   emitter.emit("CLOSE_RTC_MODAL");
// };

// const participantDisconnectedHandler = (
//   remoteParticipant: RemoteParticipant
// ) => {
//   const identity = remoteParticipant.identity;
//   if (
//     identity === props.invitation.inviterUserID ||
//     identity === props.invitation.inviteeUserIDList[0]
//   ) {
//     props.room.disconnect();
//     emitter.emit("CLOSE_RTC_MODAL");
//   }
// };

// const newMessageHandler = ({ data }: WSEvent<ExMessageItem[]>) => {
//   data.map((message) => {
//     if (message.contentType === MessageType.CustomMessage) {
//       const customData = JSON.parse(message.customElem.data) as {
//         data: RtcInvite;
//         customType: CustomType;
//       };
//       if (customData.customType === CustomType.CallingAccept) {
//         acceptHandler(customData.data);
//       }
//       if (customData.customType === CustomType.CallingReject) {
//         rejectHandler(customData.data);
//       }
//       if (customData.customType === CustomType.CallingCancel) {
//         cancelHandler(customData.data);
//       }
//       if (customData.customType === CustomType.CallingHungup) {
//         hangupHandler(customData.data);
//       }
//     }
//   });
// };

// onMounted(() => {
//   IMSDK.on(CbEvents.OnRecvNewMessages, newMessageHandler);
//   props.room.on(
//     RoomEvent.ParticipantDisconnected,
//     participantDisconnectedHandler
//   );
// });

// onUnmounted(() => {
//   IMSDK.off(CbEvents.OnRecvNewMessages, newMessageHandler);
//   props.room.off(
//     RoomEvent.ParticipantDisconnected,
//     participantDisconnectedHandler
//   );
// });
</script>
