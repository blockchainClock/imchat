<template>
	<view>
		<view class="page_container">
			 <custom-nav-bar title="会议" />
			 <view class="action-tab">
				 <view class="action-item" @click="createMeeting">
					  <image src="@/static/images/contact_my_group.png"></image>
					  <text>创建会议</text>
				 </view>
				 <view class="action-item">
					  <image src="@/static/images/contact_my_group.png"></image>
					  <text>加入会议</text>
				 </view>
			 </view>
			 <view style="padding: 20px;background: rgba(0, 0, 0, 0.01);">
			 	<view style="font-size: 14px;margin-bottom:10px;"><text>会议主题</text> <text style="padding:2px 5px;background: seagreen;color: #fff;font-size: 10px;margin-left: 10px;">进行中</text></view>
				<view style="color: #888;font-size: 12px;"><text>5月22日 13:00-15:00</text><text>发起人：aini</text></view>
				<view class="meeting-btn">
					<text @click="joinMeeting">进入会议</text>
					<text @click="shareMeeting">分享会议</text>
				</view>
			 </view>
			<!-- contact_my_group -->
		</view>
		
	</view>
	
</template>

<script>
	import { ContactChooseTypes, PageEvents } from "@/constant";
	import CustomNavBar from "@/components/CustomNavBar/index.vue";
	import {CustomType} from "@/constant/im.js"
	import IMSDK, {
	  GroupMemberRole,
	  GroupStatus,
	  IMMethods,
	  MessageStatus,
	  MessageType,
	  SessionType,
	} from "openim-uniapp-polyfill";
	import { mapGetters, mapActions } from "vuex";
	import {getRtcConnectData} from "@/api/imApi.js"
	export default {
		components: {
		  CustomNavBar
		},
		data(){
			return{
				
			}
		},
		computed: {
		  ...mapGetters([
			"storeSelfInfo",
		  ]),
		},
		methods:{
			joinMeeting(){
				uni.navigateTo({
					url:'/pages/meeting/joinMeeting/joinMeeting?meetingId=' + this.storeSelfInfo.userID
				})
			},
			shareMeeting(){
				let meetingInfo = {
					id: this.storeSelfInfo.userID,
					create_user: this.storeSelfInfo.nickname,
					
				}
				uni.navigateTo({
					url:'/pages/common/contactChoose/index?type=' + ContactChooseTypes.InviteMeeting + '&meetingInfo=' +JSON.stringify(meetingInfo)
				})
			},
			async createMeeting(){
				let messagedata = {
					data:{
						customType: CustomType.Meeting,
						roomID: IMSDK.uuid(),
						meetingId: this.storeSelfInfo.userID,
						sessionType: SessionType.Single,
						platformID: 2
					}
				}
				let meetingInfo = {
					id: this.storeSelfInfo.userID,
					create_user: this.storeSelfInfo.nickname,
					
				}
				uni.navigateTo({
					url:'/pages/meeting/joinMeeting/joinMeeting?meetingId=' +this.storeSelfInfo.userID
				})
			}
		}
		
	}
</script>

<style scoped>
	.page_container{
		padding: 0 10px;
	}
	.action-tab{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20px;
		padding-bottom: 30rpx;
		border-bottom: solid 1px rgba(0, 0, 0, 0.1);
	}
	.action-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.action-item image{
		width: 100rpx;
		height: 100rpx;
	}
	.action-item text{
		margin-top: 5px;
		font-size: 26rpx;
	}
	.meeting-btn{
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	.meeting-btn text{
		padding: 0;
		margin: 0;
		font-size: 12px;
		padding: 2px 5px;
		background: #fff;
	}
</style>