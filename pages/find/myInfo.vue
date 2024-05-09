<template>
	<view class="page">
		<view class="header-wrap">
			<view class="status-bar-height">

			</view>
			<view style="height:88rpx;padding:0 54rpx;">
				<view class="base-flex-between" style="height:88rpx;">
					<image @tap="navBack" src="/static/images/find/backIcon.png" style="width: 68rpx;height: 68rpx;"
						mode=""></image>
					<view style="text-align: center;font-size: 38rpx;color: #020202;font-weight: 500;">GEORGE ORWELL
					</view>
					<image @tap="navReseaseTopic" src="/static/images/find/fabu.png" style="width: 68rpx;height: 68rpx;"
						mode=""></image>
				</view>
			</view>
		</view>
		<view class="status-bar-height">

		</view>
		<view style="height:88rpx;">

		</view>
		<view style="padding: 42rpx 54rpx 20rpx;">
			<view @tap="navDetails(item)" class="flex-center"
				style="margin-bottom: 24rpx;background-color: #fff;border-radius: 16rpx;padding: 34rpx;"
				v-for="(item,i) in listData" :key="i">
				<image :src="item.banner" style="width: 172rpx;height: 232rpx;margin-right: 24rpx;flex-shrink: 0"
					mode=""></image>
				<view style="width: 372rpx;">
					<view style="font-size: 30rpx;color: #020202;font-weight: 500;">{{item.title}}</view>
					<view
						style="width: 372rpx;font-size: 24rpx;color: color: rgba(0, 0, 0, 0.40);margin: 12rpx 0 24rpx;line-height: 34rpx;"
						class="text-two-line">{{item.brief}}</view>
					<view class="base-flex-between">
						<view v-if="item.status==1" class="flex-center">
							<image src="/static/images/find/checked.png"
								style="width: 28rpx;height: 28rpx;margin-right: 12rpx;" mode=""></image>
							<text style="font-size: 24rpx;color: #000;font-weight: 500;">已发布成功</text>
						</view>
						<view v-else class="flex-center">
							<image src="/static/images/find/closeIcon1.png"
								style="width: 28rpx;height: 28rpx;margin-right: 12rpx;" mode=""></image>
							<text
								style="font-size: 24rpx;color: rgba(2, 2, 2, 0.40);font-weight: 500;">{{item.status==0?'未发布成功':item.status==-1?'未发布成功':''}}</text>
						</view>
						<view @tap.stop="deleteAudit(item)" class="flex-center" style="padding: 16rpx 0 10rpx 34rpx;">
							<image v-if="item.status==1" src="/static/images/find/deleteIcon.png"
								style="width: 32rpx;height: 32rpx;" mode=""></image>
							<image v-else src="/static/images/find/shangchuan.png" style="width: 32rpx;height: 32rpx;"
								mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		toast,
		delay,
		goback,
		jumpTo
	} from '@/utils/util.js'
	import * as userAPI from '@/api/user.js'
	import {
		userData
	} from "@/api/find.js"
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				listData: []
			}
		},
		onLoad() {
			this.getArticleList();
			uni.$on('update_find_list',()=>{
				this.getArticleList();
			})
		},
		computed: {
			...mapGetters('user', ['userInfo']),
		},
		methods: {
			navDetails(item) {
				uni.setStorageSync('articleItemData',item)
				uni.navigateTo({
					url: '/pages/find/mp3?id='+item.id
				})
				// if(item.type==1){
				// 	uni.navigateTo({
				// 		url:'/pages/find/mp3'
				// 	})
				// }else if(item.type==2){
				// 	uni.navigateTo({
				// 		url:'/pages/find/mp4'
				// 	})
				// }
			},
			navBack() {
				uni.navigateBack()
			},
			addPopup() {},
			navReseaseTopic() {
				uni.navigateTo({
					url: '/pages/find/releaseTopic'
				})
			},
			getArticleList() {
				let params = {
					id: 'query_column_info',
					token: uni.getStorageSync('findToken'),
					uuid: this.userInfo.userId,
					search: '',
					name: '',
					page: 1,
					limit: 2000
				};
				userData(params).then(res => {
					if (res.code == 0) {

						if (res.data.data && res.data.data.length > 0) {
							this.listData = res.data.data;
						} else {
							this.listData = [];
						}
					} else {
						this.$mHelper.toast(res.msg);
					}
				})
			},
			deleteAudit(item) {
				if(item.status!=1)return;
				uni.showModal({
					title: '提示',
					content: '确定要删除'+item.title+'?',
					success: (res)=> {
						if (res.confirm) {
							uni.showLoading({
								title:'加载中...'
							})
							let params = {
								id: 'del_article_user',
								token: uni.getStorageSync('findToken'),
								base_id: item.id,
							};
							userData(params).then(res => {
								uni.hideLoading()
								if (res.code == 0) {
									this.getArticleList();
									this.$mHelper.toast('删除成功');
									
								} else {
									this.$mHelper.toast(res.msg);
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
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

	.header-wrap {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
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