<template>
	
  <view
    v-if="!getNoticeContent && source.contentType != 2101 "
    :id="`auchor${source.clientMsgID}`"
    class="message_item"
    :class="{ message_item_self: isSender2, message_item_active: isActive }"
  >
    
    <my-avatar
      @longpress="atUser"
      @click="showInfo"
      size="42"
      :desc="source.senderNickname"
      :src="isSender2 ? storeSelfInfo.faceURL :  storeCurrentConversation.faceURL"
    />
    <view class="message_container">
      <view class="message_sender" :style="{ 'flex-direction': !isSender2 ? 'row-reverse' : 'row' }" >
        <text>{{ formattedMessageTime }}</text>
        <text style="margin-left: 2rpx;margin-right: 2rpx;">{{ '' }}</text>
        <text v-if="!isSingle">{{source.senderNickname }}</text>
      </view>
      <view class="message_send_state_box">
        <view style="height: 100%;display: flex;justify-items: center;align-items: center;">
          <view class="message_send_state">
            <u-loading-icon v-if="showSending && !isPreview" />
            <image
              @click="reSendMessage"
              v-if="isFailedMessage && !isPreview"
              src="@/static/images/chating_message_failed.png"
            />
          </view>
        </view>
        <view class="message_content_wrap" 
			@longtap="longclick">
          <text-message-render
            v-if="showTextRender"
            :message="source"
            @showInfo="showInfo"
          />
          <media-message-render v-else-if="showMediaRender" :message="source" />
		  <call-message-render v-else-if="getshowCustomMessage(callRenderTypes)" :message="source" :isSender="isSender2"></call-message-render> 
		  <error-message-render v-else />
		  <MessageTool v-if="isshowTool && source.contentType !=110" :messageDec="isSender2" :source="source"></MessageTool>
		   
        </view>
      </view>
	  <view class='quatemessage' v-if="source.quoteElem && source.quoteElem.quoteMessage">{{parseMessageByType(source.quoteElem.quoteMessage)}}</view>
	   
    </view>
	
  </view>

  <view
    v-else
    class="notice_message_container"
    :id="`auchor${source.clientMsgID}`"
  >
    <mp-html
      @linktap="navigate"
      :previewImg="false"
      :showImgMenu="false"
      :lazyLoad="false"
      :content="getNoticeContent"
    />
	<MessageTool  v-if="isshowTool"  :messageDec= "isSender2" :source="source" ></MessageTool>
	
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import IMSDK, {
  AllowType,
  IMMethods,
  MessageStatus,
  MessageType,
  SessionType,
} from "openim-uniapp-polyfill";
import MyAvatar from "@/components/MyAvatar/index.vue";
import ChatingList from "../ChatingList.vue";
import TextMessageRender from "./TextMessageRender.vue";
import MediaMessageRender from "./MediaMessageRender.vue";
import CallMessageRender from "./CallMessageRender.vue";
import ErrorMessageRender from "./ErrorMessageRender.vue";
import MessageTool from "./MessageTool.vue";
import { CustomType } from "@/constant/im";
import {
  noticeMessageTypes,
  PageEvents,
  UpdateMessageTypes,
} from "@/constant";
import { tipMessaggeFormat, offlinePushInfo, parseMessageByType,formatMessageTime } from "@/util/imCommon";

const textRenderTypes = [
  MessageType.TextMessage,
  MessageType.AtTextMessage,
  MessageType.QuoteMessage,
];
const mediaRenderTypes = [MessageType.VoiceMessage, MessageType.VideoMessage, MessageType.PictureMessage];

export default {
  components: {
    MyAvatar,
    TextMessageRender,
    MediaMessageRender,
    ErrorMessageRender,
	MessageTool,
	CallMessageRender
  },
  props: {
    source: Object,
    isSender: {
      type: Boolean,
      default: false,
    },
	index:{
		type: Number,
		default: -1,
	},
    isPreview: Boolean,
    isActive: Boolean,
	isshowTool:{
		type: Boolean,
		default: false,
	},
  },
  data() {
    return {
      timer: null,
      conversationID: "",
	  parseMessageByType:parseMessageByType,
	  customType: 0,
	  callRenderTypes:  [CustomType.CallingReject,CustomType.CallingCancel,CustomType.CallingHungup ]
    };
  },
  mounted() {
  	let _this = this;
  	uni.$on('hiddentool', function(){
  		_this.isshowTool =false
  	})
	console.log('source',this.source)
  },
  computed: {
    ...mapGetters(["storeCurrentConversation", "storeSelfInfo"]),
    isSingle() {
      return this.storeCurrentConversation.conversationType === SessionType.Single;
    },
	isSender2(){
		if(this.source.contentType == 110){
			let data = JSON.parse(this.source.customElem.data)
			if(this.callRenderTypes.includes(data.customType)){
				
				if( this.storeSelfInfo.userID == data.inviterUserID  ){
					return true;
				}else{
					return false;
				}
			}
		}else{
			return this.storeSelfInfo.userID == this.source.sendID
		}
	},
    formattedMessageTime() {
      return formatMessageTime(this.source.sendTime);
    },
    showTextRender() {
      return textRenderTypes.includes(this.source.contentType);
    },
    showMediaRender() {
      return mediaRenderTypes.includes(this.source.contentType) ;
    },
    getNoticeContent() {
      const isNoticeMessage = noticeMessageTypes.includes(
        this.source.contentType,
      );
      return !isNoticeMessage
        ? ""
        : tipMessaggeFormat(
            this.source,
            this.$store.getters.storeCurrentUserID,
          );
    },
    isSuccessMessage() {
      return this.source.status === MessageStatus.Succeed;
    },
    isFailedMessage() {
      return this.source.status === MessageStatus.Failed;
    },
    showSending() {
      return this.source.status === MessageStatus.Sending && !this.sendingDelay;
    },
  },
  mounted() {
    this.$emit("messageItemRender", this.source.clientMsgID);
    this.isReadObserver();
    this.setSendingDelay();
    this.conversationID =
      this.$store.getters.storeCurrentConversation.conversationID;
  },
  methods: {
	  longclick(){
		  this.$emit('longclick', this.index)
	  },
	getshowCustomMessage(types){
		if(this.source.contentType == 110){
			let data = JSON.parse(this.source.customElem.data)
			this.customType = data.customType;
			if(types.includes(this.customType) && this.customType != 0){
				return true;
			}else{
				return false;
			}
		}else{
			return false
		}
	},
    navigate(link) {
      this.showInfo(link.href);
    },
    reSendMessage() {
      this.$store.dispatch("message/updateOneMessage", {
        message: this.source,
        type: UpdateMessageTypes.KeyWords,
        keyWords: [
          {
            key: "status",
            value: MessageStatus.Sending,
          },
        ],
      });
      IMSDK.asyncApi(IMMethods.SendMessage, IMSDK.uuid(), {
        recvID: this.storeCurrentConversation.userID,
        groupID: this.storeCurrentConversation.groupID,
        message: this.source,
        offlinePushInfo,
      })
        .then(({ data }) => {
          this.$store.dispatch("message/updateOneMessage", {
            message: data,
            isSuccess: true,
          });
        })
        .catch(({ data, errCode, errMsg }) => {
          this.$store.dispatch("message/updateOneMessage", {
            message: data,
            type: UpdateMessageTypes.KeyWords,
            keyWords: [
              {
                key: "status",
                value: MessageStatus.Failed,
              },
              {
                key: "errCode",
                value: errCode,
              },
            ],
          });
        });
    },
    setSendingDelay() {
      if (this.source.status === MessageStatus.Sending) {
        setTimeout(() => {
          this.sendingDelay = false;
        }, 2000);
      }
    },
    isReadObserver() {
      const isNoticeMessage = noticeMessageTypes.includes(
        this.source.contentType,
      );
      if (
        this.isPreview ||
        (this.isSender && !isNoticeMessage) ||
        this.source.isRead === true ||
        this.source.sessionType === SessionType.Notification
      ) {
        return;
      }

      const observer = uni.createIntersectionObserver(ChatingList);
      observer
        .relativeTo("#scroll_view")
        .observe(
          `#auchor${this.source.clientMsgID}`,
          ({ intersectionRatio }) => {
            if (intersectionRatio > 0) {
              if (this.source.isAppend) {
                this.$store.dispatch("message/updateOneMessage", {
                  message: this.source,
                  type: UpdateMessageTypes.KeyWords,
                  keyWords: {
                    key: "isAppend",
                    value: false,
                  },
                });
              }
              observer.disconnect();
            }
          },
        );
    },
    atUser() {
      if (!this.isSender && this.source.groupID && !this.isPreview) {
        uni.$emit(PageEvents.AtSomeOne, {
          userID: this.source.sendID,
          nickname: this.source.senderNickname,
        });
      }
    },
    showInfo(userID) {
      if (this.isPreview) {
        return;
      }

      const sourceID = userID ?? this.source.sendID;

      if (this.source.sessionType === SessionType.Single) {
        uni.navigateTo({
          url: `/pages/common/userCard/index?sourceID=${sourceID}`,
        });
      } else {
        if (
          this.$store.getters.storeCurrentGroup.lookMemberInfo ===
          AllowType.NotAllowed
        ) {
          return;
        }
        IMSDK.asyncApi(
          IMSDK.IMMethods.GetSpecifiedGroupMembersInfo,
          IMSDK.uuid(),
          {
            groupID: this.source.groupID,
            userIDList: [sourceID],
          },
        ).then(({ data }) => {
          const member = data[0];
          uni.$u.route("/pages/common/userCard/index", {
            sourceID,
            memberInfo: member ? JSON.stringify(member) : "",
            disableAdd:
              this.$store.getters.storeCurrentGroup.applyMemberFriend ===
              AllowType.NotAllowed,
          });
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.message_item {
  display: flex;
  flex-direction: row;
  padding: 16rpx 44rpx;
  // padding-top: 48rpx;
  position: relative;

  .check_wrap {
    @include centerBox();
    box-sizing: border-box;
    width: 40rpx;
    min-width: 40rpx;
    height: 40rpx;
    min-height: 40rpx;
    border: 2px solid #979797;
    border-radius: 50%;
    margin-top: 16rpx;
    margin-right: 24rpx;

    &_active {
      background-color: #1d6bed;
      border: none;
    }

    &_disabled {
      background-color: #c8c9cc;
    }
  }

  .message_container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20rpx;
    // text-align: start;
    max-width: 80%;
    position: relative;

    .message_sender {
      @include nomalEllipsis();
      display: flex;
      max-width: 480rpx;
      // font-size: 24rpx;
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 6rpx;
    }

    .message_content_wrap {
      @include vCenterBox();
      text-align: start;
      // font-size: 14px;
      color: $uni-text-color;
      width: fit-content;
      max-width: 100%;
	  position:relative;
      .bg_container {
        padding: 16rpx 24rpx;
        border-radius: 0rpx 12rpx 12rpx 12rpx;
        background-color: #f0f0f0;
      }
    }
  }

  .message_send_state_box{
    display: flex;
    flex-direction: row-reverse;
  }

  .message_send_state {
    @include centerBox();
    margin-left: 12rpx;
    // margin-top: 48rpx;
    width: 48rpx;
    height: 48rpx;

    .read_limit_count {
      // font-size: 24rpx;
      font-size: 0.85rem;
      color: #999;
    }

    image {
      width: 16px;
      height: 16px;
    }
  }

  /deep/.emoji_display {
    width: 24px;
    height: 18px;
    vertical-align: sub;
  }

  &_self {
    flex-direction: row-reverse;

    .check_wrap {
      margin-right: 0;
      margin-left: 24rpx;
    }

    .message_container {
      margin-left: 0;
      margin-right: 20rpx;
      // text-align: end;
      align-items: flex-end;

      .message_content_wrap {
        flex-direction: row-reverse;
		position:relative;
        .bg_container {
          border-radius: 12rpx 0 12rpx 12rpx;
          background-color: #dcebfe !important;
        }
      }
    }

    .message_send_state_box{
      flex-direction: row;
    }

    .message_send_state {
      margin-left: 0rpx;
      margin-right: 12rpx;
    }
  }

  &_active {
    background-color: #fdf5e9;
  }
}

.notice_message_container {
  @include ellipsisWithLine(2);
  text-align: center;
  margin: 24rpx 48rpx;
  // font-size: 24rpx;
  font-size: 0.85rem;
  color: #999;
  position: relative;
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.quatemessage{
		margin-top:5px;
		background:rgba(0,0,0,0.04);
		border-radius:3px;
		padding:10px;
		font-size:10px;
		margin-bottom: 20px;
	}
</style>
