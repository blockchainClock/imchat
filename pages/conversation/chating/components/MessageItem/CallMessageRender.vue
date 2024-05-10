<template>
  <view  class="text_message_container bg_container">
	<div v-if="getImgUrl == 'video'" class="text_message_container bg_container">
		<div class="call-content"  v-if="isSender">
			<span>{{callText}}</span>
			<image
			  class="video-icon"
			  src="@/static/images/chating_message_video.png"
			  alt=""
			  srcset=""
			/>
		</div>
		<div  class="call-content"  v-else>
			<image
			  class="video-icon"
			  src="@/static/images/chating_message_video_other.png"
			  alt=""
			  srcset=""
			/>
			<span>{{callText}}</span>
		</div>
	</div>
	<div v-if="getImgUrl == 'audio'">
		<div class="call-content"  v-if="isSender">
			<span>{{callText}}</span>
			<image
			  
			  class="video-icon"
			  src="@/static/images/chating_message_voice.png"
			  alt=""
			  srcset=""
			/>
		</div>
		<div class="call-content"  v-else>
			<image
			  
			  class="video-icon"
			  src="@/static/images/chating_message_voice.png"
			  alt=""
			  srcset=""
			/>
			<span>{{callText}}</span>
		</div>
		
	</div>
	
	
	
  </view>
</template>

<script>
import { secFormat } from "@/util/imCommon";
import {mapGetters} from 'vuex';
import { CustomType } from "@/constant/im";
export default {
  name: "",
  props: {
    message: Object,
	isSender: {
	  type: Boolean,
	  default: false,
	}
  },
  data() {
    return {
      loadingWidth: "120px",
	  isCall: 0,
    };
  },
 
  computed: {
	 ...mapGetters(['storeSelfInfo',"storeCurrentConversation"]),
    isMyMessage(){
		return this.message.sendID == this.storeSelfInfo.userID
	},
	callText(){
		let messagestr = JSON.parse(this.message.customElem.data)
		if(messagestr.customType > 204 || messagestr.customType < 200) return '';
		switch (messagestr.customType){
			case CustomType.CallingReject:
				if(this.isMyMessage){
					return '已拒绝'
				}else{
					return '对方已拒绝'
				}
				break;
			case CustomType.CallingCancel:
				if(this.isMyMessage){
					return '已取消'
				}else{
					return '对方已取消'
				}
				break;
			case CustomType.CallingHungup:
				return '通话时长' + messagestr.time + ' s'
				break;
			default:
				break;
		}
	},
    getImgUrl() {
	  
	  let messagestr = JSON.parse(this.message.customElem.data);
	  if(messagestr.customType >= 200 && messagestr.customType <= 204){
		  this.isCall = messagestr.mediaType
		  return messagestr.mediaType;
	  }
	  
    }
 
  },
  methods: {
    clickMediaItem() {
    },
    onLoaded() {
      
    },
  },
};
</script>

<style lang="scss" scoped>
.media_message_container {
  position: relative;
  border-radius: 16rpx;
  overflow: hidden;

  .play_icon {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .video_duration {
    position: absolute;
    bottom: 12rpx;
    right: 24rpx;
    color: #fff;
  }
}
.video-icon{
	width: 28px;
	height:24px;
}
.call-content{
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #000;
}
.call-content>span{
	margin: 0 5px;
}
</style>
