<template>
	<view>
		<view >
			<div class="z-10 mt-5 flex flex-row justify-between px-3">
			  <img class="h-[30px] w-[30px]" :src="mini" alt="mini" @click="changeMini" />
			  <Camera v-if="!isWaiting" :room="room" :isVideo="isVideo" />
			</div>
			<RtcProfile :room="room" :inviteData="inviteData" :isWaiting="isWaiting" />	
			<RtcControl
			  :isWaiting="isWaiting"
			  :isConnected="isConnected"
			  :invitation="inviteData.invitation"
			  :inviteData="inviteData"
			  :duration="duration"
			  @connectRtc="connectRtc"
			  :room="room"
			  :sendCustomSignal="sendCustomSignal"
			/>
			<RtcRoom v-if="isConnected" :room="room" :isVideo="isVideo" />
		</view>
	
	</view>
  
</template>

<script>
// import mini from '@/assets/images/rtc/mini.png'
import RtcControl from '../RtcControl/index.vue'
// import Counter from '../Counter/index.vue'
import RtcRoom from './Room.vue'
import RtcProfile from '../RtcProfile/index.vue'
import { mapGetters, mapActions } from "vuex";
// import { AuthData, InviteData } from '../data'
// import { useDraggable } from '@vueuse/core'
// import { Room } from 'livekit-client'
// import useInviteData from '../useInviteData'
import Camera from './Camera.vue'
import { CustomType } from '@/constant/comp'

export default {
	components:{
		Camera,
		RtcProfile,
		RtcRoom,
		RtcControl
	},
	props:{
	   connect: false,
	  isConnected: false,
	  inviteData: {},
	  room: {},
	  sendCustomSignal: {},
	},
	computed: {
	  ...mapGetters([
	    "storeSelfInfo"
	  ]),
	},
	data(){
		return{
			show:true,
			isClose:false,
			isMini:false,
			counterRef:0,
			el:null,
			isWaiting: !(this.connect && this.isConnected),
			isVideo: this.inviteData?.invitation?.mediaType === 'video',
			isRecv: this.storeSelfInfo.userID !== this.inviteData.invitation?.inviterUserID
			
		}
	},
	methods:{
		changeMini(){
			  this.show = !this.show
			  this.isMini = !this.isMini
		},
		connectRtc(data){
		  if (data) {
		    uni.$emit('connectRtc', {
		      liveURL: data.liveURL,
		      token: data.token,
		    })
		  } else {
		    uni.$emit('connectRtc', undefined)
		  }
		}
	}
}
// type IRtcLayoutEmits = {
//   (event: 'connectRtc', data?: AuthData): void
// }
// type IRtcLayoutProps = {
//   connect: boolean
//   isConnected: boolean
//   inviteData: InviteData
//   room: Room
//   sendCustomSignal: (recvID: string, customType: CustomType) => Promise<void>;
// }
// const emit = defineEmits<IRtcLayoutEmits>()
// const props = defineProps<IRtcLayoutProps>()

// const show = ref(true)
// const isClose = ref(false)
// const isMini = ref(false)
// const counterRef = ref()
// const el = ref<HTMLElement | null>(null)

// const duration = computed(() => counterRef.value?.getTime() ?? '')
// const isWaiting = computed(() => !(props.connect && props.isConnected))
// const initialValueX = computed(
//   () =>
//     (window.innerWidth ||
//       document.documentElement.clientWidth ||
//       document.body.clientWidth) -
//     86 -
//     16,
// )

// const { isVideo, isGroup, isRecv } = useInviteData(props.inviteData)
// const { style } = useDraggable(el, {
//   initialValue: { x: initialValueX.value, y: 100 },
// })

// const connectRtc = (data?: AuthData) => {
//   if (data) {
//     emit('connectRtc', {
//       liveURL: data.liveURL,
//       token: data.token,
//     })
//   } else {
//     emit('connectRtc', undefined)
//   }
// }

// const changeMini = () => {
//   show.value = !show.value
//   isMini.value = !isMini.value
// }
</script>

<style lang="scss" scoped>
.van-overlay {
  backdrop-filter: blur(30px);
  transition: 0.3s ease;
}
</style>
