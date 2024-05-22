<template>
	<!-- <view> -->
		<view class="text_message_container ">
			<view class="meeting">
				<view>{{content.createUserName}} 发起的会议</view>
				<view style="height: 8px;"></view>
				<view>会议号：{{content.meetingId}}</view>
				<view style="height: 8px;"></view>
				<view class="join" @click="join">进入会议></view>
			</view>
			
		  
		</view>
	<!-- </view> -->
  
</template>

<script>
import { parseBr } from "@/util/common";
import { parseAt, parseLink,parseMessageByType } from "@/util/imCommon";
import { MessageType } from "openim-uniapp-polyfill";

export default {
  name: "MeetingMessageRender",
  components: {},
  props: {
    message: Object,
  },
  
  data() {
    return {
		parseMessageByType:parseMessageByType,
		content: JSON.parse(this.message.customElem.data)
	};
  },
  methods: {
    navigate(link) {
      if (link.innerText.includes("@")) {
        this.$emit("showInfo", link.href);
      }
    },
	join(){
		uni.navigateTo({
			url:'/pages/meeting/joinMeeting/joinMeeting?meetingId=' +this.content.meetingId
		})
	}
  },
};
</script>

<style lang="scss" scoped>
	.meeting{
		padding: 15px;
		background: #fff;
		border: solid 1px rgba(0, 0, 0, 0.2);
		font-size: 14px;
	}
	.join{
		color: royalblue;
		text-align: center;
	}
</style>
