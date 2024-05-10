<template>
  <view :class="isVoice ? 'text_message_container bg_container' : ''" >
	  <div  class="media_message_container"  v-if="!isVoice">
		  <div >
		  	  <u--image
		  	    @load="onLoaded"
		  	    width="120"
		  	    height="100%"
		  	    mode="widthFix"
		  	    :src="getImgUrl"
		  	    @click="clickMediaItem"
		  	  >
		  	    <template  v-slot:loading>
		  	      <u-loading-icon  color="red"></u-loading-icon>
		  	    </template>
		  	  </u--image>
		  </div>
		     
		  
		  <text v-if="isVideo " class="video_duration">{{ getDuration }}</text>
	  </div>
	  <div v-if="isVoice"  :class="voiceClass" @click="playVoiceFn" :style="'width:' + getVoiceWidth + 'px'">
		  <span v-if="message.sendID == storeSelfInfo.userID">{{getSounceDuration}}</span>
		  
		  <image class="no-play-pic" v-if="!playVoice" style="width: 15px;height: 15px;margin:0 5px;" src="/static/images/voice_message.png"></image>
		  <image class="play-pic" v-else style="width: 20px;height: 20px;margin:0 5px;" src="/static/images/sounce.gif"></image>
		   
		   <span v-if="message.sendID != storeSelfInfo.userID">{{getSounceDuration}}</span>
	  </div>
  </view>
</template>

<script>
import { secFormat } from "@/util/imCommon";
import {mapGetters} from 'vuex';
import { CustomType } from "@/constant/im";
import { MessageType } from "openim-uniapp-polyfill";
import player from "@/player/audio.js"
export default {
  name: "",
  props: {
    message: Object,
  },
  data() {
    return {
      loadingWidth: "120px",
	  isCall: 0,
	  playVoice: false
    };
  },
 
  computed: {
	 ...mapGetters(['storeSelfInfo',"storeCurrentConversation"]),
    isVideo() {
      return this.message.contentType === MessageType.VideoMessage;
    },
	isVoice(){
		return this.message.contentType === MessageType.VoiceMessage;
	},
	getVoiceWidth(){
		let timelong = this.message.soundElem.duration / 1000;
		let max = 60;
		let st =  (timelong / max) * 240
		if(st > 240){
			return 240;
		}else if(st < 40){
			return 40;
		}else{
			return st;
		}
	},
	voiceClass(){
		if(this.message.sendID == this.storeSelfInfo.userID){
			return 'self-voice'
		}else{
			return 'friend-voice'
		}
	},
	getSounceDuration(){
		if (!this.isVoice) {
		  return 0;
		}
		return secFormat(this.message.soundElem.duration / 1000);
	},
	callText(){
		let messagestr = JSON.parse(this.message.customElem.data)
		if(messagestr.customType > 204 || messagestr.customType < 200) return '';
		switch (messagestr.customType){
			case CustomType.CallingReject:
				return '对方已拒绝'
				break;
			case CustomType.CallingCancel:
				return '已取消'
				break;
			case CustomType.CallingHungup:
				return '通话时长' + messagestr.time + ' s'
				break;
			default:
				break;
		}
	},
    getImgUrl() {
      if (this.isVideo) {
        return this.message.videoElem.snapshotUrl;
      }
	  
	  if(this.message.contentType == 110){
		  let messagestr = JSON.parse(this.message.customElem.data)
		  if(messagestr.customType >= 200 && messagestr.customType <= 204){
			  this.isCall = messagestr.mediaType
			  return messagestr.mediaType;
		  }
	  }
	  this.isCall = 1;
      return this.message.pictureElem.snapshotPicture?.url ?? this.message.pictureElem.sourcePath;
    },
    getDuration() {
      if (!this.isVideo) {
        return 0;
      }
      return secFormat(this.message.videoElem.duration);
    },
    maxHeight() {
      let imageHeight = "";
      if (this.isVideo) {
        imageHeight = this.message.videoElem.snapshotHeight
      }
      if (!this.isVideo && this.message.pictureElem.sourcePicture) {
        imageHeight = this.message.pictureElem.sourcePicture.height
      }
      if (!this.isVideo && this.message.pictureElem.snapshotPicture) {
        imageHeight = this.message.pictureElem.snapshotPicture.height
      }
      return (imageHeight || 0) > 120 ? 120 : imageHeight;
    },
  },
  beforeDestroy() {
  	if(this.playVoice){
  		player.stop()
  	}
  },
  methods: {
	  playVoiceFn(){
		  player.oncePlay(
		  	this.message.soundElem.sourceUrl,
		  	()=>{
		  		this.playVoice = true
		  	},
		  	()=>{
		  		this.playVoice = false
		  	},
		  	()=>{
		  		this.playVoice = false
		  	}
		  )
	  },
    clickMediaItem() {
      if (this.isVideo) {
        uni.navigateTo({
          url: `/pages/conversation/previewVideo/index?previewVideoUrl=${this.message.videoElem.videoUrl}&snapshotUrl=${this.message.videoElem.snapshotUrl}`,
        });
      } else {
        const list = this.$store.getters.storePreviewImageList;
        const idx = list.findIndex((item) => item === this.message.pictureElem.sourcePicture.url);
        uni.previewImage({
          current: idx,
          urls: list,
          longPressActions :{
            itemList: ['保存图片'],
            success(data) {
              uni.downloadFile({
                url: list[data.index],
                success(res){
                  let url = res.tempFilePath
                  uni.saveImageToPhotosAlbum({
                    filePath: url,
                    success() {
                      uni.showToast({
                        title:'已保存到系统相册',
                        icon:"none"
                      })
                    },
                    fail(err) {
                      uni.showToast({
                        title:'保存失败',
                        icon:"none"
                      })
                    }
                  })
                }
	            })
            }
          },
          fail(err) {
            console.log(err);
          },
        });
      }
    },
    onLoaded() {
      this.loadingWidth = "auto";
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
.self-voice, .friend-voice{
	display: flex;
	align-items: center;
}
.self-voice{
	justify-content: flex-end;
}
.self-voice .play-pic{
	transform: rotate(180deg);
	
}
.friend-voice .no-play-pic{
	transform: rotate(180deg);
	
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
