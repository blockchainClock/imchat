<template>
	<view>
		<VideoTrack
		  v-if="isVideo"
		  v-for="track in tracks"
		  :key="getTrackReferenceId(track)"
		  :class="isLocal(track.participant) ? 'rtc-video-myself' : 'rtc-video-other'"
		  :track-ref="track"
		/>
		<AudioTrack
		  v-else
		  v-for="track in tracks"
		  :key="getTrackReferenceId(track) + 1"
		  :track-ref="track"
		/>
	</view>
  
</template>

<script >
// import useUserStore from '/store/modules/user'
import { getTrackReferenceId } from '@livekit/components-core'
import { Participant, Room, Track } from 'livekit-client'
// import { VideoTrack, AudioTrack, useTracks } from '/util/open-im-rtc'
import { mapGetters, mapActions } from "vuex";
export default {
	
	props:{
		room:{},
		isVideo:false,
	},
	computed: {
	  ...mapGetters([
	    "storeSelfInfo"
	  ]),
	},
	mounted() {
		// this.tracks = useTracks({ room: this.room }, [this.tracksType])
	},
	data(){
		return{
			tracksType:this.isVideo ? Track.Source.Camera : Track.Source.Microphone,
			tracks:{}
		}
	},
	methods:{
		isLocal(participant){
			// return participant.identity == this.storeSelfInfo.userID
		}
	}
}
// type RoomProps = {
//   room: Room
//   isVideo: boolean
// }
// const props = defineProps<RoomProps>()

// const tracksType = computed(() =>
//   props.isVideo ? Track.Source.Camera : Track.Source.Microphone,
// )

// const userStore = useUserStore()
// const tracks = useTracks({ room: props.room }, [tracksType.value])

// const isLocal = (participant: Participant) =>
//   participant.identity == userStore.selfInfo.userID
</script>

<style lang="scss">
.rtc-video-myself {
  position: absolute;
  top: 60px;
  right: 16px;
  width: 120px;
  z-index: 10;
}

.rtc-video-other {
  position: absolute;
  object-fit: cover;
  height: 100vh;
}
</style>
