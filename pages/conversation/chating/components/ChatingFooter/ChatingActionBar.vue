<template>
  <view class="chat_action_bar">
    <u-row class="action_row" v-if="!storeCurrentConversation.groupID">
      <u-col
        v-for="item in actionList"
        :key="item.idx"
        @click="actionClick(item)"
        span="3"
      >
        <view class="action_item" >
          <image :src="item.icon" alt="" srcset="" />
          <text class="action_item_title">{{ item.title }}</text>
        </view>
      </u-col>
    </u-row>
	<u-row class="action_row" v-else="storeCurrentConversation.groupID">
	  <u-col
	    v-for="item in actionList.slice(0,2)"
	    :key="item.idx"
	    @click="actionClick(item)"
	    span="3"
	  >
	    <view class="action_item" >
	      <image :src="item.icon" alt="" srcset="" />
	      <text class="action_item_title">{{ item.title }}</text>
	    </view>
	  </u-col>
	</u-row>
  </view>
</template>

<script>
	import IMSDK, {
	  GroupMemberRole,
	  GroupStatus,
	  IMMethods,
	  MessageStatus,
	  MessageType,
	  SessionType,
	} from "openim-uniapp-polyfill";
import { ChatingFooterActionTypes } from "@/constant";
import {getRtcConnectData} from "@/api/imApi.js"
import { mapGetters, mapActions } from "vuex";
import { CustomType } from "@/constant/im";
import { parseMessageByType, offlinePushInfo } from "@/util/imCommon";
export default {
	computed: {
	  ...mapGetters([
		"storeCurrentConversation",
		"storeCurrentGroup",
		"storeCurrentMemberInGroup",
		"storeSelfInfo",
	  ]),
	},
  data() {
    return {
		  actionFlag: true,
		  actionList: [
			{
			  idx: 0,
			  type: ChatingFooterActionTypes.Album,
			  title: "相册",
			  icon: require("static/images/chating_action_image.png"),
			},
			{
			  idx: 1,
			  type: ChatingFooterActionTypes.Camera,
			  title: "拍摄",
			  icon: require("static/images/chating_action_camera.png"),
			}, {
			  idx: 2,
			  type: ChatingFooterActionTypes.Video,
			  title: "视频通话",
			  icon: require("static/images/videotab.png"),
			},{
			  idx: 3,
			  type: ChatingFooterActionTypes.Audio,
			  title: "语音通话",
			  icon: require("static/images/audiotab.png"),
			}
		  ],
    };
  },
  methods: {
	async sendMessage(type, url){
		let messagedata = {
			data:{
				customType: CustomType.CallingInvite,
				inviterUserID: this.storeSelfInfo.userID,
				inviteeUserIDList: [this.storeCurrentConversation.userID],
				groupID:"",
				roomID: IMSDK.uuid(),
				timeout: 60,
				mediaType: ChatingFooterActionTypes.Audio == type ? 'audio' : 'video',
				sessionType: SessionType.Single,
				platformID: 2,
				token: url.token,
				conversationID: this.storeCurrentConversation.conversationID
			}
		}
		let message;
		try{
			message = await IMSDK.asyncApi(
			 IMMethods.CreateCustomMessage,
			 IMSDK.uuid(),
			 JSON.stringify(messagedata)
			)
		}catch(e){
			console.log('error', e)
			return;
			//TODO handle the exception
		}
		IMSDK.asyncApi(IMMethods.SendMessage, IMSDK.uuid(), {
		  recvID: this.storeCurrentConversation.userID,
		  groupID: this.storeCurrentConversation.groupID,
		  message,
		  offlinePushInfo,
		}).then(({ data }) => {
			
			  uni.setStorageSync('videoToken',url.token )
			  let params = messagedata.data;
			  params.avatar = this.storeCurrentConversation.faceURL;
			  params.userName = this.storeCurrentConversation.showName;
			  params.sendID = this.storeSelfInfo.userID;
			  params.to = this.storeCurrentConversation.userID;
			 this.$store.commit("message/SET_CALL_INFO", params)
			  uni.navigateTo({
			  	url:'/pages/conversation/chating/imCall?chainnInfo=' + JSON.stringify(params)
			  })
		})
	},
    async actionClick(action) {
		
		
		
		if(!this.actionFlag) return;
		this.actionFlag = false
      switch (action.type) {
        case ChatingFooterActionTypes.Album:
			this.$emit("prepareMediaMessage", action.type);
		     break;
		case ChatingFooterActionTypes.Audio:
			let data  = await getRtcConnectData(
			  this.storeCurrentConversation.conversationID,
			  this.storeSelfInfo.userID
			);
			this.sendMessage(ChatingFooterActionTypes.Audio, data)
			break;
			// let channinfo = {
			// 	conversationID: this.storeCurrentConversation.conversationID,
			// 	userName: this.storeCurrentConversation.showName,
			// 	avatar: this.storeCurrentConversation.faceURL
			// }
			// uni.navigateTo({
			// 	url:'/pages/conversation/chating/liveCall?data=' + JSON.stringify({url:data.serverUrl, token:data.token})
			// })
		case ChatingFooterActionTypes.Video:
			
			let data2  = await getRtcConnectData(
			  this.storeCurrentConversation.conversationID,
			  this.storeSelfInfo.userID
			);
			this.sendMessage(ChatingFooterActionTypes.Video, data2)
			
			break;
        case ChatingFooterActionTypes.Camera:
          this.$emit("prepareMediaMessage", action.type);
          break;
        default:
          break;
      }
	  this.actionFlag = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat_action_bar {
  position: relative;
  background: #f0f2f6;
  padding: 24rpx 36rpx;

  .action_row {
    flex-wrap: wrap;
    margin-bottom: 24rpx;
  }

  .action_item {
    @include centerBox();
    flex-direction: column;
    margin-top: 24rpx;

    image {
      width: 96rpx;
      height: 96rpx;
    }

    &_title {
      font-size: 24rpx;
      color: #999;
      margin-top: 6rpx;
    }
  }
}
</style>
