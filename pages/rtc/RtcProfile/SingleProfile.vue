<template>
  <view v-if="isWaiting || !isVideo" >
    <!-- <Avatar :size="70" :src="userInfo?.faceURL" :desc="userInfo?.nickname" /> -->
    <span class="mt-2 text-xl text-white">{{ userInfo.nickname }}</span>
    <span v-if="isWaiting" class="mt-2 text-white opacity-70">{{ title }}</span>
  </view>
</template>

<script>
// import type { PublicUserItem } from 'open-im-sdk-wasm/lib/types/entity'
export default {
	props:{
		userInfo:{} ,
		isVideo: false,
		isWaiting: false,
		isRecv: false
	},
	data(){
		return{
			title:''
		}
	}
}
// type SingleContentProps = {
//   userInfo?: PublicUserItem
//   isVideo: boolean
//   isWaiting: boolean
//   isRecv: boolean
// }
// const props = defineProps<SingleContentProps>()

// const { t } = useI18n()

// const title = computed(() => {
//   if (props.isRecv && !props.isVideo) return t('rtc.inviteYouVoice')
//   if (props.isRecv && props.isVideo) return t('rtc.inviteYouVideo')
//   return t('rtc.onCall')
// })
</script>
