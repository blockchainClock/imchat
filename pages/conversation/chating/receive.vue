<template>
	<view class="container">
		<view class="info">
			<view class="photo">
				<image class="img" :src="customData.avatar"/>
			</view>
			<view class="title">
				{{customData.userName}}
			</view>
			<view class="placard">
				邀请你进行{{customData.mediaType == 'video'?'视频':'语音'}}通话...
				
			</view>
		</view>
		<view class="control">
			<view class="item" >
				<view class="btn red" @tap="refuse">
					<image style="width: 100%;height: 100%;" class="cuIcon-roundclose" src="../../../static/images/rtc/hungup.png"></image>
				</view>
				<text class="text">
					挂断
				</text>
			</view>
			<view class="item" @tap="accept">
				<view class="btn green">
					<image  style="width: 100%;height: 100%;" class="cuIcon-recordfill" src="../../../static/images/rtc/accept.png"></image>
					<!-- <text :class="channel.isAudio?'cuIcon-dianhua':'cuIcon-recordfill'"></text> -->
				</view>
				<text class="text">
					接听
				</text>
			</view>


		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters,mapMutations} from 'vuex';
	// import chat, {
	// 	dictateTypes
	// } from "@/IM/index.js"
	import player from '@/player/audio.js';
	import { CustomType } from "@/constant/im";
	import {callEvent} from "@/util/call.js"
import {getRtcConnectData} from "@/api/imApi.js"
	export default {
		data(){
			return{
				vibrateTimer:null,
				timer:null,
				customData:{}
			}
		},
		computed: {
			...mapGetters(['storeSelfInfo',"storeCurrentConversation"])
		},
		onLoad(options) {
			console.log('options.data',options.data)
			this.customData = JSON.parse( options.data)
			console.log('options.data',this.customData )
			uni.$on('call' + CustomType.CallingCancel,()=>{
				uni.navigateBack();
			})
			player.loopPlay('/static/voice/bell.mp3');
			// this.vibrateTimer = setInterval(vibrateLong,1500)
			// this.timer = setTimeout(()=>{
			// 	goback()
			// },30000)
		},
		onUnload() {
			uni.$off('callCancel')
			player.stop();
			clearInterval(this.vibrateTimer)
			clearTimeout(this.timer)
		},
		onBackPress({from}) {
			if(from=='backbutton'){
				// this.setChannel(null)
				uni.navigateBack()
			}
		},
		methods:{
			// ...mapMutations('chat',['setChannel']),
			async accept(){
				// let data2  = await getRtcConnectData(
				//   this.customData.conversationID,
				//   this.storeSelfInfo.userID
				// );
				callEvent(CustomType.CallingAccept, this.customData, this.storeSelfInfo.userID,()=>{
					uni.redirectTo({
						url:'/pages/conversation/chating/call?chainnInfo=' + JSON.stringify(this.customData)
					})
				})
			},
			async refuse(){
				callEvent(CustomType.CallingReject, this.customData, this.storeSelfInfo.userID,()=>{
					uni.navigateBack()
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.img {
		max-width: 100%;
		height: 100%;
	}

	.container {
		box-sizing: border-box;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding: 150rpx 20rpx 50rpx;
		background-color: #1fc8db;
		background-image: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
		color: #FFFFFF;

		.info {
			display: flex;
			align-items: center;
			flex-direction: column;
			margin: 50rpx;

			.photo {
				height: 150rpx;
				width: 150rpx;

				.img {
					border-radius: 10rpx;
				}
			}

			.title {
				font-size: 50rpx;
				margin-top: 20rpx;
			}

			.placard {
				margin-top: 10rpx;
			}
		}

		.control {
			display: flex;
			justify-content: space-around;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.btn {
					height: 120rpx;
					width: 120rpx;
					background-color: #008c8c;
					display: flex;
					border-radius: 50%;
					align-items: center;
					justify-content: center;
					font-size: 40rpx;
					&.red {
						background-color: #DA4A48;
					}

					&.green {
						background-color: #0EB206;
					}
				}

				.text {
					margin-top: 6rpx;
				}
			}
		}
	}
</style>
