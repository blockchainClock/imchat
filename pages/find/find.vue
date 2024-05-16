<template>
	<view class="page">
		<!-- <view class="status-bar-height header-fixed"></view>
		<view class="status-bar-height"></view> -->
		<view class="header-wrap">
			<view class="status-bar-height"></view>
			<view style="height: 580rpx;">
				<view style="padding: 0 54rpx;">
					<view class="box1 base-flex-between">
						<view class="inner1">
							<view class="text1">发现</view>
							<view class="text2">Discover</view>
						</view>
						<view class="inner2 flex-cetner">
							<image @tap="navRankInfo" class="wrap1" src="/static/images/find/frame.png" mode=""></image>
							<image @tap="navMyInfo" class="wrap2" src="/static/images/find/message.png" mode=""></image>
						</view>
					</view>
					<view class="flex-center box2">
						<image @tap="confirmSearch" class="inner1" src="/static/images/find/search.png" mode=""></image>
						<input @confirm="confirmSearch" v-model="name" class="inner2" type="text" placeholder="SEARCH"
							placeholder-style="color: rgba(0, 0, 0, 0.40);font-size:26rpx;font-weight:500;">
					</view>
				</view>
				<view style="padding-left: 54rpx;margin-bottom: 48rpx;flex-wrap: nowrap;width: 100%;"
					class="flex-center box3">
					<image class="inner1" src="/static/images/find/fenlei.png" mode="" style="flex-shrink: 0;"></image>
					<scroll-view :scroll-left="scrollLeft" scroll-x="true" class="inner2" style="width: 608rpx;"
						id="scrollContainer">
						<view class="flex-center" style="flex-wrap: nowrap;">
							<view @tap="changeTag(i)" class="wrap1 v-tabs__container-item"
								:class="{'wrap1-a':tagIndex==i}" v-for="(item,i) in tagsList" :key="i">{{item.value}}
							</view>
							<view style="width: 2rpx;flex-shrink: 0;height: 68rpx;"></view>
						</view>
					</scroll-view>
				</view>
				<view style="padding: 0 54rpx;">
					<swiper @change="swiperChange" style="width: 100%;height: 356rpx;" circular :indicator-dots="false"
						:autoplay="true" :interval="5000">
						<swiper-item style="width: 100%;height: 356rpx;" v-for="(item,i) in swiperList" :key="i">
							<image :src="item.img" style="width: 100%;height: 356rpx;" mode="aspectFill"></image>
						</swiper-item>

					</swiper>
					<view class="flex-item-center" style="margin-top: 28rpx;">
						<view class="flex-center">
							<view v-for="(item,i) in swiperList" :key="i">
								<view style="width: 40rpx;height: 8rpx;border-radius: 8rpx;background-color: #000000;"
									:style="{'margin-right':i==swiperList.length-1?'0':'14rpx'}" v-if="i==swiperIndex">
								</view>
								<view v-else
									style="width:8rpx;height: 8rpx;background-color: #999999;border-radius: 50%;"
									:style="{'margin-right':i==swiperList.length-1?'0':'14rpx'}"></view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view style="height: 230rpx;"></view>
		<view @tap="navDetails(item)" v-for="(item,i) in listData" :key="i"
			style="display: flex;padding: 50rpx 54rpx;border-bottom: 10rpx solid #F5F6FA;">
			<image :src="item.banner" style="width: 172rpx;height: 232rpx;flex-shrink: 0;margin-right: 28rpx;"
				mode="aspectFill"></image>
			<view style="width: 440rpx;padding-top: 14rpx;">
				<view style="font-size: 30rpx;color: #020202;font-weight: 500;width: 440rpx;margin-bottom: 20rpx;"
					class="text-one-line">{{item.title}}</view>
				<view class="text-two-line"
					style="width: 440rpx;font-size: 24rpx;color: color: rgba(0, 0, 0, 0.40);line-height: 30rpx;">
					{{item.brief}}
				</view>
				<view class="base-flex-between" style="margin-top: 16rpx;">
					<view
						style="height: 48rpx;background-color: #F5F6FA;border-radius: 6rpx;padding: 0 12rpx;font-size: 24rpx;color: #999;line-height: 48rpx;max-width: 300rpx;"
						class="text-one-line">
						发布者：{{item.name}}
					</view>
					<image src="/static/images/find/bofang.png" style="width: 64rpx;height: 64rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<!-- <view v-if="listData.length==0" class="flex-item-center" -->
			<!-- style="font-size: 30rpx;color: #999999;padding-top: 80rpx;">暂无数据</view> -->
		<image @tap="navReseaseTopic" src="/static/images/find/addGroup.png"
			style="position: fixed;left: 50%;transform: translateX(-50%);height: 108rpx;width: 108rpx;bottom: calc(50px + 40rpx);"
			mode=""></image>

		
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
				tagsList: [],
				tagIndex: 0,
				swiperList: [{
					img: '/static/images/find/banner1.png'
				}, {
					img: '/static/images/find/banner1.png'
				}, {
					img: '/static/images/find/banner1.png'
				}, {
					img: '/static/images/find/banner1.png'
				}],
				swiperIndex: 0,
				listData: [],
				page: 1,
				name: '',

				scrollLeft: 0, // 距离左边的位置
				containerWidth: 0, // 容器的宽度
				currentWidth: 0, // 当前选项的宽度
				lineLeft: 0, // 滑块距离左侧的位置
				pillsLeft: 0, // 胶囊距离左侧的位置
			}
		},
		methods: {
			// 获取左移动位置
			getTabItemWidth() {
				let query = uni
					.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(this)
				// #endif
				// 获取容器的宽度
				query
					.select(`#scrollContainer`)
					.boundingClientRect((data) => {
						if (!this.containerWidth && data) {
							this.containerWidth = data.width
						}
					})
					.exec()
				// 获取所有的 tab-item 的宽度
				query
					.selectAll('.v-tabs__container-item')
					.boundingClientRect((data) => {
						if (!data) {
							return
						}
						let lineLeft = 0
						let currentWidth = 0
						if (data) {
							for (let i = 0; i < data.length; i++) {
								if (i < this.tagIndex) {
									lineLeft += data[i].width
								} else if (i == this.tagIndex) {
									currentWidth = data[i].width
								} else {
									break
								}
							}
						}
						// 当前滑块的宽度
						this.currentWidth = currentWidth
						// 滑块作移动的位置
						this.lineLeft = lineLeft + currentWidth / 2
						// 胶囊距离左侧的位置
						this.pillsLeft = lineLeft
						// 计算滚动的距离左侧的位置
						this.scrollLeft = this.lineLeft - this.containerWidth / 2
					})
					.exec()
			},
			confirmSearch() {
				this.page = 1;
				this.getTypeList(1);
			},
			load() {
				this.getTypeList(1);
				uni.$on('update_find_list', () => {
					this.page = 1;
					this.name = "";
					this.getTypeList(1);
				})
			},
			pullDownRefresh() {
				this.page = 1;
				this.name = "";
				this.getArticleList(1);
			},
			onReachBottom() {
				if (this.listData.length >= this.page * 20) {
					this.page += 1;
					this.getArticleList(2);
				}
			},
			getTypeList() {
				let params = {
					id: 'query_column',
					token: uni.getStorageSync('findToken'),
					type: 'column'
				};
				userData(params).then(res => {
					if (res.code == 0) {
						if (res.data && res.data.length > 0) {
							let list = res.data.sort(this.$mHelper.compare("name"))
							console.log(list, 'list')
							this.tagsList = list;
						} else {
							this.tagsList = [];
						}
						this.getArticleList(1)
						this.getTabItemWidth();
					} else {
						//code 0 成功 -1 失败 -2token失效
						// this.$mHelper.toast(res.msg);
					}
				})
			},
			getArticleList(type) {
				let params = {
					id: 'query_column_info',
					token: uni.getStorageSync('findToken'),
					search: '',
					name: this.tagsList[this.tagIndex].value,
					type: 1,
					page: this.page,
					limit: 20
				};
				if (this.name) {
					params.search = this.name;
				} else {
					delete params.search;
				}
				userData(params).then(res => {
					if (res.code == 0) {

						if (type == 1) {
							if (res.data.data && res.data.data.length > 0) {
								this.listData = res.data.data;
							} else {
								this.listData = [];
							}
						} else {
							this.listData = this.listData.concat(res.data.data ? res.data.data : [])
						}
					} else {
						this.$mHelper.toast(res.msg);
					}
				})
			},
			navReseaseTopic() {
				uni.navigateTo({
					url: '/pages/find/releaseTopic'
				})
			},
			changeTag(index) {
				this.tagIndex = index;
				this.page = 1;
				this.getArticleList(1);
				this.getTabItemWidth();
			},
			swiperChange(e) {
				// console.log(e,'eee')
				this.swiperIndex = e.detail.current;
			},
			navDetails(item) {
				uni.navigateTo({
					url: '/pages/find/mp3?id=' + item.id
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
			navMyInfo() {
				uni.navigateTo({
					url: '/pages/find/myInfo'
				})
			},
			navRankInfo() {
				uni.navigateTo({
					url: '/pages/find/studyRank'
				})
			}
		}

	}
</script>
<style>
	page {
		background-color: #FFFFFF;

	}
</style>
<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background-color: #fff;
		overflow: hidden;
	}

	.header-fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		// background-color: #D9D9D9;
		z-index: 50;
	}

	.header-wrap {
		// background-color: #D9D9D9;
		background: url(../../static/images/find/beijing1.png) no-repeat 100% 100%;
		background-size: 100% 100%;
		position: relative;

		padding: 42rpx 0 0;

		.box1 {
			margin-bottom: 40rpx;
			width: 100%;

			.inner1 {
				.text1 {
					color: #12131B;
					font-family: PingFang HK;
					font-size: 38rpx;
					font-weight: 500;
				}

				.text2 {
					color: rgba(0, 0, 0, 0.40);
					font-family: PingFang HK;
					font-size: 22rpx;
					font-weight: 500;
					text-transform: uppercase;
				}
			}

			.inner2 {

				.wrap1,
				.wrap2 {
					width: 68rpx;
					height: 68rpx;
				}

				.wrap1 {
					margin-right: 40rpx;
				}
			}
		}

		.box2 {
			background-color: #fff;
			border-radius: 20rpx;
			margin-bottom: 32rpx;
			padding: 0 28rpx;
			height: 100rpx;

			.inner1 {
				flex-shrink: 0;
				width: 44rpx;
				height: 44rpx;
				margin-right: 14rpx;
			}

			.inner2 {
				width: 100%;
				font-size: 26rpx;
				color: #000;
				font-weight: 500;
				width: 100%;
			}
		}

		.box3 {
			margin-bottom: 48rpx;

			.inner1 {
				width: 68rpx;
				height: 68rpx;
				margin-right: 20rpx;
				flex-shrink: 0;
			}

			.inner2 {
				width: 100%;

				.wrap1 {
					min-width: 100rpx;
					height: 68rpx;
					padding: 0 24rpx;
					border-radius: 16rpx;
					background-color: #fff;
					font-size: 28rpx;
					color: #12131B;
					font-weight: 500;
					margin-right: 20rpx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
				}

				.wrap1-a {
					background-color: #FFD600;
					color: #000;
				}
			}
		}
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