<template>
	<view class="page">
		<view style="background-color: #FFD600;">
			<view class="status-bar-height"></view>
			<view style="padding: 48rpx 54rpx 0;">
				<image @tap="navBack" src="/static/images/find/fanhui1.png" style="width: 68rpx;height: 68rpx;" mode=""></image>
				<view style="font-size: 64rpx;font-weight: bold;color: #12131B;margin: 70rpx 0 4rpx;">学习排行榜</view>
				<view style="font-size: 22rpx;color: #12131B;text-transform: uppercase;">Learning Ranking</view>
				<view style="margin-top: 60rpx;background-color: #fff;border-radius: 16rpx 16rpx 0 0;height: 170rpx;padding: 38rpx 40rpx 0;position: relative;">
					<view style="position: absolute;right: 50rpx;top: 0;transform: translateY(-50%);">
						<view style="width: 180rpx;height: 180rpx;position: relative;background-color: #fff;border-radius: 50%;" class="flex-item-center">
							<image src="/static/images/find/huangguan.png" style="width: 80rpx;height: 80rpx;position: absolute;left: -36rpx;top: -34rpx;" mode=""></image>
							<image :src="curUserInfo.img" style="width: 168rpx;height: 168rpx;border-radius: 50%;" mode="aspectFill"></image>
						</view>
					</view>
					<view class="flex-center" style="margin-bottom: 12rpx;">
						<image src="/static/images/find/rank3.png" style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
						<text style="font-size: 32rpx;color: #12131B;font-weight: 600;">第{{curUserInfo.rank==1?'一':curUserInfo.rank==2?'二':curUserInfo.rank==3?'三':curUserInfo.rank}}名</text>
					</view>
					<view style="font-size: 28rpx;color: #12131B;font-weight: 600;">{{curUserInfo.name}}：{{curUserInfo.study}}分钟</view>
				</view>
			</view>
		</view>
		<view style="padding: 12rpx 54rpx 54rpx;">
			<view style="background-color: #fff;border-radius: 16rpx 16rpx 0 0;padding: 0 32rpx 10rpx;">
				<view v-for="(item,i) in listData" :key="i" style="height: 100rpx;border-bottom: 1px solid #F5F6FA;" class="flex-center">
					<view style="width: 30%;" class="flex-center">
						<image v-if="i==0" src="/static/images/find/rank1.png" style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
						<image v-if="i==1" src="/static/images/find/rank2.png" style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
						<image v-if="i==2" src="/static/images/find/rank3.png" style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
						<view>
							<text v-if="i==0" style="font-size: 24rpx;color: #12131B;;">第一名</text>
							<text v-if="i==1" style="font-size: 24rpx;color: #12131B;;">第二名</text>
							<text v-if="i==2" style="font-size: 24rpx;color: #12131B;;">第三名</text>
							<text v-if="i!=0 && i!=1 && i!=2">第{{i+1}}名</text>
						</view>
					</view>
					<view class="flex-item-center" style="width: 40%;">
						<view class="flex-center">
							<image :src="item.img" style="width: 40rpx;height: 40rpx;margin-right: 4rpx;border-radius: 50%" mode="aspectFill"></image>
							<text style="font-size: 24rpx;color: #12131B;">{{item.name}}</text>
						</view>
					</view>
					<view style="width: 30%;text-align: right;font-size:24rpx;color: #12131B;">{{item.study}}分钟</view>
				</view>
				<!-- <view class="flex-item-center">
					<view @tap="loadMoreData" class="flex-center" style="padding: 26rpx 50rpx;">
						<text style="font-size: 24rpx;color: #000;">查看更多</text>
						<image src="/static/images/find/xiajiantou.png" style="width: 24rpx;height: 24rpx;margin-left: 6rpx;" mode=""></image>
					</view>
				</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		userData
	} from "@/api/find.js"
	export default {
		data() {
			return {
				listData:[],
				curUserInfo:{}
			}
		},
		onLoad() {
			this.getRankList();
			console.log(this.listData,'listData')
		},
		methods: {
			getRankList() {
				let params = {
					id: 'query_rank',
					token: uni.getStorageSync('findToken')
				};
				userData(params).then(res => {
					if (res.code == 0) {
						if (res.data.data && res.data.data.length > 0) {
							// res.data.data=res.data.data.reverse()
							this.listData =res.data.data
							this.curUserInfo=res.data.user
						} else {
							this.listData = [];
						}
					} else {
						//code 0 成功 -1 失败 -2token失效
						// this.$mHelper.toast(res.msg);
					}
				})
			},
			navBack() {
				uni.navigateBack()
			},
			loadMoreData(){
				let newData=[{type:1},{type:2},{type:2},{type:1},{type:2},{type:2},{type:1},{type:2}];
				this.listData=this.listData.concat(newData)
			},
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .u-drawer-bottom {
		border-radius: 40rpx 40rpx 0 0;
	}

	.page {
		min-height: 100vh;
		background-color: #F5F6FA;
		overflow: hidden;
	}
	.header-wrap{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		z-index: 98;
		background-color: #F5F6FA;
	}

	// 隐藏scroll-view的滚动条
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>