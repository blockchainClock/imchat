<template>
  <div class="z-10 mb-[48px] flex flex-row justify-around px-2">
    <div class="flex flex-col items-center" @click.stop="changeMic">
      <img
        class="h-[62px] w-[62px]"
        :src="isMicrophoneEnabled ? mic_open : mic_close"
        alt="mic"
      />
      <span class="mt-2 text-sm text-white">{{
        isMicrophoneEnabled ? 'rtc.micOpen' : 'tc.micClose'
      }}</span>
    </div>
    <div class="flex flex-col items-center" @click.stop="disconnect">
      <img class="h-[62px] w-[62px]" :src="hungup" alt="hungup" />
      <span class="mt-2 text-sm text-white">'rtc.hungup' </span>
    </div>
    <div class="flex flex-col items-center">
      <img
        class="h-[62px] w-[62px]"
        :src="soundStatus ? sound_open : sound_close"
        alt="sound"
      />
      <span class="mt-2 text-sm text-white">'rtc.soundOpen'</span>
    </div>
  </div>
</template>

<script>
// import sound_open from '@/assets/images/rtc/sound_open.png'
// import sound_close from '@/assets/images/rtc/sound_close.png'
// import mic_open from '@/assets/images/rtc/mic_open.png'
// import mic_close from '@/assets/images/rtc/mic_close.png'
// import hungup from '@/assets/images/rtc/hungup.png'
// import { useLocalParticipant } from '@/util/open-im-rtc'
// import { Room } from 'livekit-client'

export default {
	props:{
		room:{}
	},
	mounted() {
		const loudspeaker = this.room.getActiveDevice('audiooutput')
		if (loudspeaker) {
		  this.room.switchActiveDevice('audiooutput', loudspeaker)
		}
	},
	data(){
		return{
			soundStatus:true,
			localParticipant:null,
			isMicrophoneEnabled:false
		}
	},
	methods:{
		changeMic(){
			// this.localParticipant.setMicrophoneEnabled(!this.isMicrophoneEnabled)
		},
		disconnect:function(){
			uni.$emit('disconnect')
		}
	}
	
}
// type IRtcConnectedEmits = {
//   (event: 'disconnect'): void
// }
// type IRtcConnectedProps = {
//   room: Room
// }
// const emit = defineEmits<IRtcConnectedEmits>()
// const props = defineProps<IRtcConnectedProps>()

// const soundStatus = ref(true)
// const { localParticipant, isMicrophoneEnabled } = useLocalParticipant(props.room)

// const changeMic = async () =>
//   localParticipant.value.setMicrophoneEnabled(!isMicrophoneEnabled.value)

// const disconnect = () => emit('disconnect')

// onMounted(() => {
//   const loudspeaker = props.room.getActiveDevice('audiooutput')
//   if (loudspeaker) {
//     props.room.switchActiveDevice('audiooutput', loudspeaker)
//   }
// })
</script>
