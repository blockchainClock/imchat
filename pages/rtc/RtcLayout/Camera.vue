<template>
  <div class="flex flex-row">
    <!-- <img v-if="isGroup" class="w-[30px] h-[30px]" :src="invite" alt="invite"> -->
    <!-- <img v-if="isVideo" class="w-[30px] h-[30px] mx-4" :src="camera_reverse" alt="camera_reverse"> -->
    <img
      v-if="isVideo"
      @click="changeCamera"
      class="h-[30px] w-[30px]"
      :src="isCameraEnabled ? camera_open : camera_close"
      alt="camera"
    />
  </div>
</template>

<script >
// import camera_reverse from '@/assets/images/rtc/camera_reverse.png'
// import camera_open from '@/assets/images/rtc/camera_open.png'
// import camera_close from '@/assets/images/rtc/camera_close.png'
// import { Room } from 'livekit-client'
// import { useLocalParticipant } from '@/util/open-im-rtc'
export default {
	props:{
		room: {},
		isVideo: false,
	},
	mounted() {
		// const { localParticipant, isCameraEnabled } = useLocalParticipant(this.room)
		// this.localParticipant = localParticipant;
		// this.isCameraEnabled=isCameraEnabled;
	},
	data(){
		return{
			localParticipant:{},
			isCameraEnabled:false,
		}
	},
	methods:{
		async changeCamera(){
			// this.localParticipant.value.setCameraEnabled(!isCameraEnabled.value)
		}
	}
}
// type CameraProps = {
//   room: Room
//   isVideo: boolean
// }
// const props = defineProps<CameraProps>()

// const { localParticipant, isCameraEnabled } = useLocalParticipant(props.room)

// const changeCamera = async () =>
//   localParticipant.value.setCameraEnabled(!isCameraEnabled.value)
</script>
