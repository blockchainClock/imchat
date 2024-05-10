<template>
  <view class="">
	  <!-- <button @click="startCall">语音</button> -->
	
    <view class="forbidden_footer" v-if="getPlaceholder.length > 0">
      <image style="margin-right: 8rpx" src="/static/images/forbidden_footer.png" />
      <text>{{ getPlaceholder }}</text>
    </view>
    <view v-else :style="{ 'pointer-events': getPlaceholder ? 'none' : 'auto' }">
      <view class="chat_footer">
		<view @click="changeMike">
			<image class="mike-btn"  v-if="mike.show"  src="/static/images/chating_footer_audio.png" ></image>
			<image class="mike-btn"  v-else src="/static/images/chating_footer_audio_recording.png" ></image>
		</view>
        <view class="input_content">
          <CustomEditor :placeholder="getPlaceholder" class="custom_editor" ref="customEditor" @ready="editorReady"
            @focus="editorFocus" @blur="editorBlur" @input="editorInput" />
		  <view v-if="!!this.storeQuoteMessage" class='reply-content'>
			  <view style="padding:5px;">{{getQuotedContent}}</view>
			  <image @click="delectQuoteMessage" class='deleteQuatedMessage' src='/static/images/chating_footer_quote_close.png'></image>
			  
		  </view>
        </view>

        <view class="footer_action_area">
          <image v-show="!hasContent" @click.prevent="updateActionBar" src="@/static/images/chating_footer_add.png" alt=""
            srcset="" />
          <image v-show="hasContent" @click="sendTextMessage" src="@/static/images/send_btn.png" alt=""
            srcset="" />
        </view>
		
		
		
      </view>
	  <view class="mike-wrap area-b" :class="{show:mike.show}" >
	  	<view class="mask" :class="{running:mike.running || !mike.running}" @tap="hideMike">
	  		
	  	</view>
	  	<view class="mike-box">
	  		<view class="mike-tip">
	  			{{mike.running?`松开即可发送，上划取消 ${mike.second}″`:'按住说话'}}
	  		</view>
	  		<view 
	  			@touchstart="voiceStart" 
	  			@touchmove.stop="voiceMove"
	  			@touchend="voiceEnd" 
	  			class="mike-circle cuIcon-voicefill"
	  			:class="{running:mike.running,cancel:mike.cancel}"
	  		>
	  		</view>
	  	</view>
	  </view>
      <chating-action-bar @sendMessage="sendMessage" @prepareMediaMessage="prepareMediaMessage"
        v-show="actionBarVisible" />
      <u-action-sheet :safeAreaInsetBottom="true" round="12" :actions="actionSheetMenu" @select="selectClick"
        :closeOnClickOverlay="true" :closeOnClickAction="true" :show="showActionSheet" @close="showActionSheet = false">
      </u-action-sheet>
    </view>
	
	
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import permision from "@/util/permission.js";
import { formatInputHtml, getPurePath, html2Text, getPicInfo, getFileType, getVideoSnshot, base64toFile, uploadForm, getFileSize } from "@/util/common";
import { parseMessageByType, offlinePushInfo } from "@/util/imCommon";
import {
  ChatingFooterActionTypes,
  UpdateMessageTypes,
} from "@/constant";
import IMSDK, {
  GroupMemberRole,
  GroupStatus,
  IMMethods,
  MessageStatus,
  MessageType,
  SessionType,
} from "openim-uniapp-polyfill";
import UParse from "@/components/gaoyia-parse/parse.vue";
import CustomEditor from "./CustomEditor.vue";
import ChatingActionBar from "./ChatingActionBar.vue";
const recorderManager = uni.getRecorderManager();
const needClearTypes = [
  MessageType.TextMessage,
  MessageType.AtTextMessage,
  MessageType.QuoteMessage,
];
const systemInfo = uni.getSystemInfoSync()
const albumChoose = [
  {
    name: "图片",
    type: ChatingFooterActionTypes.Album,
    idx: 0,
  },
  {
    name: "视频",
    type: ChatingFooterActionTypes.Album,
    idx: 1,
  },
];
const cameraChoose = [
  {
    name: "拍照",
    type: ChatingFooterActionTypes.Camera,
    idx: 0,
  },
  {
    name: "录制",
    type: ChatingFooterActionTypes.Camera,
    idx: 1,
  },
];

export default {
  components: {
    CustomEditor,
    ChatingActionBar,
    UParse,
  },
  props: {
    footerOutsideFlag: Number,
  },
  data() {
    return {
      customEditorCtx: null,
      inputHtml: "",
      actionBarVisible: false,
      isInputFocus: false,
      actionSheetMenu: [],
      showActionSheet: false,
	  mike:{
	  	show:false,
	  	running:false ,
	  	cancel:false, 
	  	startTime:0,
	  	startY:0, 
	  	timer:null,
	  	second:0,
	  },
    };
  },
  computed: {
    ...mapGetters([
      "storeQuoteMessage",
      "storeCurrentConversation",
      "storeCurrentGroup",
      "storeCurrentMemberInGroup",
      "storeBlackList",
    ]),
    getQuotedContent() {
		console.log(this.storeQuoteMessage)
      if (!this.storeQuoteMessage) {
        return "";
      }
      return `回复${parseMessageByType(this.storeQuoteMessage)}`;
    },
    hasContent() {
      return html2Text(this.inputHtml) !== "";
    },
    getPlaceholder() {
      const isSingle =
        this.storeCurrentConversation.conversationType === SessionType.Single;
      if (!isSingle && this.storeCurrentGroup.status === GroupStatus.Muted) {
        return this.storeCurrentMemberInGroup.roleLevel !==
          GroupMemberRole.Nomal
          ? ""
          : "群主或管理员已开启全体禁言";
      }
      if (
        !isSingle &&
        (this.storeCurrentGroup.status === GroupStatus.Dismissed ||
          this.storeCurrentMemberInGroup.groupID !==
          this.storeCurrentGroup.groupID)
      ) {
        return "您已不在该群组";
      }
      if (
        !isSingle &&
        this.storeCurrentMemberInGroup.muteEndTime > Date.now()
      ) {
        return `你已被禁言`;
      }
      if (
        isSingle &&
        this.storeBlackList.find(
          (black) => black.userID === this.storeCurrentConversation.userID,
        )
      ) {
        return "对方已被拉入黑名单";
      }
      return "";
    },
  },
  watch: {
    footerOutsideFlag(newVal) {
      this.onClickActionBarOutside();
    },
  },
  mounted() {
    // this.setSendMessageListener();
    this.setKeyboardListener();
	recorderManager.onStart(()=>{
		console.log("开始录音了")
		this.mike.startTime = Date.now()
		this.mike.running = true
		this.mike.cancel = false
		this.mike.second = 0
		this.mike.timer = setInterval(()=>{
			this.mike.second ++
		},1000)
	})
	recorderManager.onStop(({
		tempFilePath
	}) => {
		try{
			this.mike.show = false;
			const long = Date.now() - this.mike.startTime;
			if (this.mike.cancel) {
				return toast('取消录音')
			}
			if (long < 1000) {
				return toast('说话时间太短')
			}
			this.sendVoice(tempFilePath, long)
		}finally{
			this.mike.running = false
			this.mike.cancel = false
			this.mike.second = 0
			this.mike.startTime = 0
			clearInterval(this.mike.timer)
		}
	});
  },
  beforeDestroy() {
    // this.disposeSendMessageListener();
    this.disposeKeyboardListener();
  },
  methods: {
    ...mapActions("message", ["pushNewMessage", "updateOneMessage"]),
    getEl(el) {
      return new Promise((resolve) => {
        const query = uni.createSelectorQuery().in(this);
        query
          .select(el)
          .boundingClientRect((data) => {
            resolve(data);
          })
          .exec();
      });
    },
	openMike(){
		this.foot = 'mike'
		this.mike.show = true
	},
	changeMike(){
		this.mike.show = !this.mike.show 
	},
	hideMike(){
		this.foot = ''
		this.mike.show = false
	},
	async voiceStart({
		changedTouches
	}) {
		console.log('触摸开始')
		const touche = changedTouches[0];
		this.mike.startY = touche.clientY
		console.log(systemInfo.platform)
		if(systemInfo.platform=='android'){
			await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
		}
		// #ifndef H5
		recorderManager.start()
		// #endif
	},
	async voiceMove({
		changedTouches
	}) {
		const touche = changedTouches[0];
		if (this.mike.startY - touche.clientY > 50) {
			this.mike.cancel = true;
		} else {
			this.mike.cancel = false;
		}
	},
	async voiceEnd() {
		console.log('触摸结束')
		// #ifndef H5
		recorderManager.stop()
		// #endif
	},
	async sendVoice(file, long) { 
		
		let path = getPurePath(file);
		const message = await IMSDK.asyncApi(
		  IMMethods.CreateSoundMessageFromFullPath,
		  IMSDK.uuid(),
		  {
		    soundPath:path,
		    duration: long,
		  }
		);
		this.sendMessage(message);
	},
    async createTextMessage() {
      let message = "";
      const { text, atUserList } = formatInputHtml(this.inputHtml);
      if (atUserList.length === 0) {
        if (this.storeQuoteMessage) {
          message = await IMSDK.asyncApi(
            IMMethods.CreateQuoteMessage,
            IMSDK.uuid(),
            {
              text,
              message: this.storeQuoteMessage,
            },
          );
        } else {
          message = await IMSDK.asyncApi(
            IMMethods.CreateTextMessage,
            IMSDK.uuid(),
            text,
          );
          console.log(message);
        }
      } else {
        const quoteMessage = this.storeQuoteMessage
          ? this.storeQuoteMessage
          : "";
        message = await IMSDK.asyncApi(
          IMMethods.CreateTextAtMessage,
          IMSDK.uuid(),
          {
            text,
            atUserIDList: atUserList.map((item) => item.atUserID),
            atUsersInfo: atUserList,
            message: quoteMessage,
          },
        );
      }
      console.log(message);
      return message;
    },
    async sendTextMessage() {
      if (!this.hasContent) return;
      const message = await this.createTextMessage();
      this.sendMessage(message);
    },
    sendMessage(message) {
      this.pushNewMessage(message);
      if (needClearTypes.includes(message.contentType)) {
        // #ifdef H5 || APP-PLUS
        this.customEditorCtx.clear();
        // #endif
      }
      this.$emit("scrollToBottom");
	  console.log('message', message)
      IMSDK.asyncApi(IMMethods.SendMessage, IMSDK.uuid(), {
        recvID: this.storeCurrentConversation.userID,
        groupID: this.storeCurrentConversation.groupID,
        message,
        offlinePushInfo,
      })
        .then(({ data }) => {
          this.updateOneMessage({
            message: data,
            isSuccess: true,
          });
        })
        .catch(({ data, errCode, errMsg }) => {
          this.updateOneMessage({
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
      if (this.storeQuoteMessage) {
        this.$store.commit("message/SET_QUOTE_MESSAGE", undefined);
      }
    },
	delectQuoteMessage(){
		this.$store.commit("message/SET_QUOTE_MESSAGE", undefined);
	},
    // action
    onClickActionBarOutside() {
      if (this.actionBarVisible) {
        this.actionBarVisible = false;
      }
    },
    updateActionBar() {
      this.actionBarVisible = !this.actionBarVisible;
    },
    editorReady(e) {
      // #ifdef H5 || APP-PLUS
      this.customEditorCtx = e.context;
      this.customEditorCtx.clear();
      // #endif
    },
    editorFocus() {
      this.isInputFocus = true;
    },
    editorBlur() {
      this.isInputFocus = false;
    },
    editorInput(e) {
      this.inputHtml = e.detail.html;
    },
    backspace() {
      this.customEditorCtx.undo();
    },

    prepareMediaMessage(type) {
      if (type === ChatingFooterActionTypes.Album) {
        this.actionSheetMenu = [...albumChoose];
		this.showActionSheet = true;
      } else if(type === ChatingFooterActionTypes.Camera) {
        this.actionSheetMenu = [...cameraChoose];
		this.showActionSheet = true;
      }
    },

    // from comp
    batchCreateImageMesage({ tempFilePaths, tempFiles }) {
      // #ifdef APP-PLUS
      tempFilePaths.forEach(async (path) => {
        const message = await IMSDK.asyncApi(
          IMMethods.CreateImageMessageFromFullPath,
          IMSDK.uuid(),
          getPurePath(path),
        );
        this.sendMessage(message);
      });
      // #endif
      // #ifdef H5
      tempFiles.forEach(async (file) => {
        const { width, height } = await getPicInfo(file);
        const baseInfo = {
          uuid: IMSDK.uuid(),
          type: getFileType(file.name),
          size: file.size,
          width,
          height,
          url: file,
        }
        const options = {
          sourcePicture: baseInfo,
          bigPicture: baseInfo,
          snapshotPicture: baseInfo,
          sourcePath: "",
          file: file,
        };
        const { data } = await IMSDK.asyncApi(
          'createImageMessageByFile',
          IMSDK.uuid(),
          options,
        );
        this.sendMessage(data);
      });
      // #endif
      // #ifdef MP-WEIXIN
      tempFiles.forEach(async (file) => {
        const { width, height } = await getPicInfo(file);
        const url = await uploadForm(file)
        const baseInfo = {
          uuid: IMSDK.uuid(),
          type: getFileType(file.path),
          size: file.size,
          width,
          height,
          url,
        }
        const options = {
          sourcePicture: baseInfo,
          bigPicture: baseInfo,
          snapshotPicture: baseInfo,
          sourcePath: url,
        };
        const message = await IMSDK.asyncApi(
          'createImageMessageByURL',
          IMSDK.uuid(),
          options,
        );
        this.sendMessage(message);
      });
      // #endif
    },
    selectClick({ idx }) {
      if (idx === 0) {
        if (this.actionSheetMenu[0].type === ChatingFooterActionTypes.Album) {
          this.chooseOrShotImage(["album"]).then((paths) =>
            this.batchCreateImageMesage(paths),
          );
        } else {
          this.chooseOrShotImage(["camera"]).then((paths) =>
            this.batchCreateImageMesage(paths),
          );
        }
      } else {
        const whenGetFile = async (data) => {
          // #ifdef H5
          const snapShotFile = await getVideoSnshot(URL.createObjectURL(data.path));
          const { width, height } = await getPicInfo(snapShotFile);
          const options = {
            videoFile: data.path,
            snapshotFile: snapShotFile,
            videoPath: "",
            duration: Number(data.duration.toFixed()),
            videoType: getFileType(data.path.name),
            snapshotPath: "",
            videoUUID: IMSDK.uuid(),
            videoUrl: "",
            videoSize: data.path.size,
            snapshotUUID: IMSDK.uuid(),
            snapshotSize: snapShotFile.size,
            snapshotUrl: URL.createObjectURL(snapShotFile),
            snapshotWidth: width,
            snapshotHeight: height,
            snapShotType: getFileType(data.path.name),
          };
          const { data: msg } = await IMSDK.asyncApi(
            'createVideoMessageByFile',
            IMSDK.uuid(),
            options,
          );
          this.sendMessage(msg);
          // #endif

          // #ifdef MP-WEIXIN
          const videoUrl = await uploadForm({
            path: data.tempFilePath,
            size: data.size
          })
          const snapshotSize = await getFileSize(data.thumbTempFilePath)
          const snapshotUrl = await uploadForm({
            path: data.thumbTempFilePath,
            size: snapshotSize
          })
          const mpOptions = {
            videoPath: '',
            duration: Number(data.duration.toFixed()),
            videoType: getFileType(data.tempFilePath),
            snapshotPath: '',
            videoUUID: IMSDK.uuid(),
            videoUrl,
            videoSize: data.size,
            snapshotUUID: IMSDK.uuid(),
            snapshotSize: 1024,
            snapshotUrl,
            snapshotWidth: data.width,
            snapshotHeight: data.height,
            snapShotType: getFileType(data.thumbTempFilePath),
          }
          const message = await IMSDK.asyncApi(
            'createVideoMessageByURL',
            IMSDK.uuid(),
            mpOptions,
          );
          this.sendMessage(message);
          // #endif

          // #ifdef APP-PLUS
          const purePath = getPurePath(data.path);
          IMSDK.getVideoCover(purePath).then(async ({ path }) => {
            console.log(getPurePath(path));
            const message = await IMSDK.asyncApi(
              IMMethods.CreateVideoMessageFromFullPath,
              IMSDK.uuid(),
              {
                videoPath: purePath,
                videoType: data.videoType,
                duration: Number(data.duration.toFixed()),
                snapshotPath: getPurePath(path),
              },
            );
            this.sendMessage(message);
          });
          // #endif
        };
        if (this.actionSheetMenu[0].type === ChatingFooterActionTypes.Album) {
          this.chooseOrShotVideo(["album"]).then(whenGetFile);
        } else {
          this.chooseOrShotVideo(["camera"]).then(whenGetFile);
        }
      }
    },
    chooseOrShotImage(sourceType) {
      return new Promise((resolve, reject) => {
        uni.chooseImage({
          count: 9,
          sizeType: ["compressed"],
          sourceType,
          success: function ({ tempFilePaths, tempFiles }) {
            resolve({ tempFilePaths, tempFiles });
          },
          fail: function (err) {
            console.log(err);
            reject(err);
          },
        });
      });
    },
    chooseOrShotVideo(sourceType) {
      return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.chooseMedia({
          mediaType: ['video'],
          compressed: true,
          sourceType,
          success: function ({ tempFiles }) {
            resolve(tempFiles[0]);
          },
          fail: function (err) {
            reject(err);
          },
        });
        // #endif
        // #ifdef APP-PLUS || H5
        uni.chooseVideo({
          compressed: true,
          sourceType,
          extension: ["mp4"],
          success: function ({ tempFilePath, duration, tempFile }) {
            const idx = tempFilePath.lastIndexOf(".");
            const videoType = tempFilePath.slice(idx + 1);
            if (tempFilePath.includes("_doc/")) {
              tempFilePath = `file://${plus.io.convertLocalFileSystemURL(
                tempFilePath,
              )}`;
            }
            console.log(tempFilePath);
            // #ifdef APP-PLUS
            resolve({
              path: tempFilePath,
              videoType,
              duration,
            });
            // #endif
            // #ifdef H5
            resolve({
              path: tempFile,
              videoType,
              duration,
            });
            // #endif
          },
          fail: function (err) {
            console.log(err);
            reject(err);
          },
        });
        // #endif
      });
    },

    // message status
    sendProgressHandler({ data: { progress, message } }) {
      this.updateOneMessage({
        message,
        type: UpdateMessageTypes.KeyWords,
        keyWords: {
          key: "uploadProgress",
          value: progress,
        },
      });
    },
    setSendMessageListener() {
      IMSDK.subscribe(
        IMSDK.IMEvents.SendMessageProgress,
        this.sendProgressHandler,
      );
    },
    disposeSendMessageListener() {
      IMSDK.unsubscribe(
        IMSDK.IMEvents.SendMessageProgress,
        this.sendProgressHandler,
      );
    },

    // keyboard
    keyboardChangeHander({ height }) {
      if (height > 0) {

        if (this.actionBarVisible) {
          this.actionBarVisible = false;
        }
      }
    },
    setKeyboardListener() {
      uni.onKeyboardHeightChange(this.keyboardChangeHander);
    },
    disposeKeyboardListener() {
      uni.offKeyboardHeightChange(this.keyboardChangeHander);
    },
  },
};
</script>

<style lang="scss" scoped>
	

.mike-wrap{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 101;
		display: flex;
		width: 100%;
		height: 100vh;
		
		flex-direction: column;
		transform: translateY(200%);
		&.show{
			transform: translateY(0%);
			.mike-box{
				transform: translateY(0%);
			}
		}
		.mask{
			flex: 1;
			&.running{
				background-color: rgba($color: #000000, $alpha: 0.2);
			}
		}
		.mike-box{
			height: 400rpx;
			background-color: #FFFFFF;
			transform: translateY(100%);
			transition: transform 300ms ease-out;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		.mike-tip{
			position: absolute;
			top: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 28rpx;
			color: #999999;
		}
		.mike-circle{
			width: 200rpx;
			height: 200rpx;
			background-color: #F5F5F5;
			border-radius: 50%;
			line-height: 200rpx;
			text-align: center;
			font-size: 100rpx;
			color: #0081ff;
			&.running{
				background-color: #0081ff;
				color: #FFFFFF;
			}
			&.cancel{
				background-color: #e54d42;
				color: #FFFFFF;
			}
		}
	}	

.custom_editor {
  img {
    vertical-align: sub;
  }
}
.mike-btn{
	width:25px ;
	height: 25px;
}
.reply-content{
	background:#fff;
	border-radius:4px;
	margin-top:3px;
	font-size:12px;
	min-height:20px;
	display:flex;
	justify-content:space-between;
	align-items:center;
}
.deleteQuatedMessage{
	width: 20px;
	height: 20px;
	padding:0 10px;
	position:absolute;
	right:0px;
}
.forbidden_footer {
  width: 100%;
  min-height: 112rpx;
  color: #8e9ab0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f0f2f6;
}

.chat_footer {
  display: flex;
  align-items: center;
  // background-color: #e9f4ff;
  background: #f0f2f6;
  // height: 50px;
  max-height: 120px;
  padding: 24rpx 20rpx;

  .input_content {
    flex: 1;
    /*  #ifdef  MP-WEIXIN  */
    height: 30px;
    word-break: break-all;
    overflow: auto;
    /*  #endif  */
    min-height: 30px;
    max-height: 120px;
    margin: 0 24rpx;
    border-radius: 8rpx;
    position: relative;

    // .record_btn {
    //   // background-color: #3c9cff;
    //   background: #fff;
    //   color: black;
    //   height: 30px;
    //   font-size: 24rpx;
    // }
  }

  .quote_message {
    @include vCenterBox();
    justify-content: space-between;
    margin-top: 12rpx;
    padding: 8rpx;
    // padding-top: 20rpx;
    border-radius: 6rpx;
    background-color: #fff;
    color: #666;

    .content {
      /deep/ uni-view {
        @include ellipsisWithLine(2);
      }
    }
  }

  .footer_action_area {
    display: flex;
    align-items: center;

    // .emoji_action {
    //   margin-right: 24rpx;
    // }

    image {
      width: 26px;
      height: 26px;
    }
  }

  .send_btn {
    height: 30px;
    line-height: 30px;
    background-color: #4a9cfc;
    padding: 0 8px;
    border-radius: 4px;
    color: #fff;
  }
}

</style>
