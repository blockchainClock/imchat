<template>
	<view class="page">
		<view class="header-wrap">
			<view class="status-bar-height">

			</view>
			<view style="height: 372rpx;padding: 20rpx 54rpx 0;">
				<view class="base-flex-between">
					<image @tap="navBack" src="/static/images/find/backIcon.png" style="width: 68rpx;height: 68rpx;"
						mode=""></image>
					<view style="text-align: center;font-size: 38rpx;color: #020202;font-weight: 500;">
						{{articleInfo.title}}
					</view>
					<image @tap="sharePopup" src="/static/images/find/shareIcon.png" style="width: 68rpx;height: 68rpx;"
						mode=""></image>
				</view>
			</view>
		</view>
		<view style="height: 200rpx;" class="flex-item-center">
			<view style="margin-top: -250rpx;display: flex;flex-direction: column;align-items: center;">
				<image :src="articleInfo.banner" style="width: 224rpx;height: 302rpx;" mode=""></image>
				<view style="font-size: 30rpx;color: #020202;font-weight: 500;margin: 30rpx 0 10rpx;">
					{{articleInfo.title}}</view>
				<view style="font-size: 24rpx;color: #999999;">发布者：{{articleInfo.name}}</view>
			</view>
		</view>
		<view style="padding: 0 54rpx 50rpx;border-bottom: 8rpx solid #F5F6FA;">
			<view style="width: 100%;border-radius: 16rpx;background: #FFF;box-shadow: 0px 0px 56rpx 0px #DDDFE6;
">
				<view style="height: 122rpx;padding: 0 36rpx;border-bottom: 8rpx solid #F0F1F7;" class="flex-center">
					<image src="/static/images/find/voiceAction1.png"
						style="width: 106rpx;height: 40rpx;margin-right: 4rpx;" mode=""></image>
					<view class="sliderBar" style="width: 384rpx;position: relative;height: 44rpx;">
						<view
							style="width: 340rpx;height: 4rpx;background: rgba(217, 217, 217, 0.26);border-radius: 4rpx;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
						</view>

						<view :style="{left:x+'px'}" @touchstart="audioTouchstart" @touchmove="audioTouchmove"
							@touchend="audioTouchend"
							style="width: 44rpx;height: 44rpx;display: flex;align-items: center;justify-content: center;position: absolute;top: 0;"
							@change="onChange">
							<view style="width: 16rpx;height: 16rpx;border-radius: 50%;background-color: #12131B;">
							</view>
						</view>
					</view>
					<!-- <movable-area class="sliderBar" style="width: 384rpx;position: relative;height: 44rpx;">
						<view
							style="width: 340rpx;height: 4rpx;background: rgba(217, 217, 217, 0.26);border-radius: 4rpx;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
						</view>
					
						<movable-view style="width: 44rpx;height: 44rpx;display: flex;align-items: center;justify-content: center;"
							direction="horizontal" :x="x" @change="onChange">
							<view
								style="width: 16rpx;height: 16rpx;border-radius: 50%;background-color: #12131B;">
							</view>
						</movable-view>
					</movable-area> -->
					<!-- <view style="position: relative;width: 342rpx;">
						<view
							style="width: 100%;height: 4rpx;background: rgba(217, 217, 217, 0.26);border-radius: 4rpx;">
						</view>
						<view :style="{left:left+'%'}"
							style="position: absolute;top:50%;transform: translate(-50%,-50%);width: 16rpx;height: 16rpx;border-radius: 50%;background-color: #12131B;">
						</view>
					</view> -->
					<view style="font-size: 26rpx;color: rgba(0, 0, 0, 0.40);margin-left: 6rpx;">{{videoTimeStr}}
					</view>
				</view>
				<view class="base-flex-between" style="height: 148rpx;padding: 0 100rpx;">
					<view @tap="seekAction(0)" class="flex-item-center" style="padding: 10rpx 18rpx;height: 76rpx;">
						<image style="width: 44rpx;height: 44rpx" src="/static/images/find/leftAction.png" mode="">
						</image>
					</view>
					<image v-if="!videoPlayBtn" @tap="playVoice" src="/static/images/find/video.png"
						style="width: 76rpx;height: 76rpx;" mode=""></image>
					<image v-else @tap="pauseVoice" src="/static/images/find/pauseIcon.png"
						style="width: 76rpx;height: 76rpx;" mode=""></image>
					<view @tap="seekAction(1)" class="flex-item-center" style="padding: 10rpx 18rpx;height: 76rpx;">
						<image style="width: 44rpx;height: 44rpx" src="/static/images/find/rightAction.png" mode="">
						</image>
					</view>
				</view>
			</view>
			<view style="margin-top: 46rpx;font-size: 24rpx;color: #999999;line-height: 32rpx;">
				{{articleInfo.brief}}
			</view>
		</view>

		<view style="padding:40rpx 0 40rpx 54rpx;">
			<view style="font-size: 36rpx;color: #12131B;font-weight: 500;margin-bottom: 32rpx;">相关推荐</view>
			<scroll-view scroll-x="true">
				<view class="flex-center" style="flex-wrap: nowrap;">
					<view @tap="navDetails(item)" v-for="(item,i) in listData" :key="i"
						style="width: 286rpx;flex-shrink: 0;margin-right: 24rpx;display: flex;flex-direction: column;align-items: center;padding-top: 134rpx;position: relative;">
						<image :src="item.banner"
							style="position: absolute;left: 50%;transform: translateX(-50%);top: 0;width: 152rpx;height: 204rpx;"
							mode="aspectFill"></image>
						<view
							style="width: 100%;height: 180rpx;background-color: #F5F6FA;border-radius: 16rpx;padding-top: 86rpx;display: flex;flex-direction: column;align-items: center;">
							<view
								style="font-size: 26rpx;color: #020202;font-weight: 500;text-align: center;width: 260rpx;"
								class="text-one-line">{{item.title}}</view>
							<view
								style="font-size: 22rpx;color: #999999;text-align: center;width: 260rpx;margin-top: 6rpx;"
								class="text-one-line">发布者：{{item.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<view style="background-color: #fff;border-radius: 40rpx 40rpx 0 0;padding: 44rpx 54rpx 92rpx;">
				<view class="base-flex-between" style="margin-bottom: 56rpx;">
					<view style="font-size: 36rpx;color: #12131B;font-weight: 500;">分享至</view>
					<image @tap="hidePopup" src="/static/images/find/guanbiIcon.png" style="width: 68rpx;height: 68rpx;"
						mode=""></image>

				</view>
				<view class="base-flex-between" style="padding: 0 126rpx;">
					<view @tap="navChoose(0)"
						style="display: flex;flex-direction: column;align-items: center;padding: 0 20rpx;">
						<image src="/static/images/find/haoyouIcon.png"
							style="width: 112rpx;height: 112rpx;margin-bottom: 12rpx;" mode=""></image>
						<text style="font-size: 28rpx;color: #999;">好友</text>
					</view>
					<view @tap="navChoose(1)"
						style="display: flex;flex-direction: column;align-items: center;padding: 0 20rpx;">
						<image src="/static/images/find/haoyouIcon.png"
							style="width: 112rpx;height: 112rpx;margin-bottom: 12rpx;" mode=""></image>
						<text style="font-size: 28rpx;color: #999;">群聊</text>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="showOne" mode="center">
			<scroll-view scroll-y="true" style="width: 650rpx;background-color: #fff;border-radius: 16rpx;height: 800rpx;">
				<view style="width: 650rpx;background-color: #fff;border-radius: 16rpx;position: relative;">
					<image @tap="hidePopupTwo" src="/static/images/find/guanbiIcon.png" style="width: 68rpx;height: 68rpx;position: absolute;right: 20rpx;top: 20rpx;"
						mode=""></image>
					<view style="background-color: #FFD600;">
						<view style="padding: 8rpx 46rpx 0;">
							<view style="font-size: 64rpx;font-weight: bold;color: #12131B;margin: 20rpx 0 4rpx;">学习排行榜
							</view>
							<view style="font-size: 22rpx;color: #12131B;text-transform: uppercase;">Learning Ranking</view>
							<view
								style="margin-top: 80rpx;background-color: #fff;border-radius: 16rpx 16rpx 0 0;height: 170rpx;padding: 38rpx 40rpx 0;position: relative;">
								<view style="position: absolute;right: 50rpx;top: 0;transform: translateY(-50%);">
									<view
										style="width: 180rpx;height: 180rpx;position: relative;background-color: #fff;border-radius: 50%;"
										class="flex-item-center">
										<image src="/static/images/find/huangguan.png"
											style="width: 80rpx;height: 80rpx;position: absolute;left: -36rpx;top: -34rpx;"
											mode=""></image>
										<image :src="curUserInfo.img"
											style="width: 168rpx;height: 168rpx;border-radius: 50%;" mode="aspectFill">
										</image>
									</view>
								</view>
								<view class="flex-center" style="margin-bottom: 12rpx;">
									<image src="/static/images/find/rank3.png"
										style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
									<text
										style="font-size: 32rpx;color: #12131B;font-weight: 600;">第{{curUserInfo.rank==1?'一':curUserInfo.rank==2?'二':curUserInfo.rank==3?'三':curUserInfo.rank}}名</text>
								</view>
								<view style="font-size: 28rpx;color: #12131B;font-weight: 600;">
									{{curUserInfo.name}}：{{curUserInfo.study}}分钟</view>
							</view>
						</view>
					</view>
					<view style="padding: 12rpx 46rpx 54rpx;">
						<view style="background-color: #fff;border-radius: 16rpx 16rpx 0 0;padding: 0 32rpx 10rpx;">
							<view v-for="(item,i) in rankData" :key="i"
								style="height: 100rpx;border-bottom: 1px solid #F5F6FA;" class="flex-center">
								<view style="width: 30%;" class="flex-center">
									<image v-if="i==0" src="/static/images/find/rank1.png"
										style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
									<image v-if="i==1" src="/static/images/find/rank2.png"
										style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
									<image v-if="i==2" src="/static/images/find/rank3.png"
										style="width: 48rpx;height: 48rpx;margin-right: 8rpx;" mode=""></image>
									<view>
										<text v-if="i==0" style="font-size: 22rpx;color: #12131B;;">第一名</text>
										<text v-if="i==1" style="font-size: 22rpx;color: #12131B;;">第二名</text>
										<text v-if="i==2" style="font-size: 22rpx;color: #12131B;;">第三名</text>
										<text v-if="i!=0 && i!=1 && i!=2">第{{i+1}}名</text>
									</view>
								</view>
								<view class="flex-item-center" style="width: 40%;">
									<view class="flex-center">
										<image :src="item.img"
											style="width: 40rpx;height: 40rpx;margin-right: 4rpx;border-radius: 50%"
											mode="aspectFill"></image>
										<text style="font-size: 22rpx;color: #12131B;">{{item.name}}</text>
									</view>
								</view>
								<view style="width: 30%;text-align: right;font-size:22rpx;color: #12131B;">{{item.study}}分钟
								</view>
							</view>
						</view>
				
					</view>
				</view>
			</scroll-view>
			
		</u-popup>
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
				left: 0,
				listData: [],
				show: false,
				AUDIO: uni.createInnerAudioContext(),
				videoPlayBtn: false,
				videoDuration: null,
				videoTimeStr: '',

				minScore: 0,
				maxScore: 100,
				score: 0,
				x: 0,
				y: 0,
				start: 0,
				logX: 0,
				isTouch: false,
				articleInfo: {},
				timer: null,
				id: '',
				isAudio: false,
				showOne:false,
				rankData: [],
				curUserInfo: {}
			}
		},
		destroyed() {
			// this.$nextTick(()=>{
			// 	this.AUDIO.pause();
			// 	this.AUDIO.offTimeUpdate(()=>{})
			// 	this.AUDIO.onEnded(()=>{})
			// 	this.AUDIO.offPlay(()=>{})
			// 	this.AUDIO.offPause(()=>{})
			// 	this.AUDIO.destroy();
			// 	this.AUDIO=null;
			// })
			if (this.AUDIO) {
				try {
					this.AUDIO.pause();
					this.AUDIO.destroy()
					this.AUDIO = null
				} catch (e) {
					//TODO handle the exception
				}
			}
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		onLoad(opt) {
			// let data=uni.getStorageSync('articleItemData');
			// if(data){
			// 	this.articleInfo=data;
			// 	this.AUDIO.src =data.audio;
			// 	this.videoChangeEvent()
			// 	// this.getRecommendList();
			// 	if(data.recommend && data.recommend.length>0){
			// 		this.listData=data.recommend;
			// 	}
			// }
			this.id = opt.id;
			this.getRecommendList();
			// this.getRankList();
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
							this.rankData = res.data.data.slice(0, 10)
							this.curUserInfo = res.data.user
						} else {
							this.rankData = [];
						}
						this.showOne=true;
					} else {
						//code 0 成功 -1 失败 -2token失效
						// this.$mHelper.toast(res.msg);
					}
				})
			},
			getRecommendList() {
				let params = {
					id: 'query_article',
					token: uni.getStorageSync('findToken'),
					base_id: this.id
				};
				userData(params).then(res => {
					if (res.code == 0) {
						this.articleInfo = res.data;
						this.AUDIO.src = this.articleInfo.audio;
						this.videoChangeEvent()

						if (res.data.recommend && res.data.recommend.length > 0) {
							this.listData = res.data.recommend;
						}
					} else {
						//code 0 成功 -1 失败 -2token失效
						// this.$mHelper.toast(res.msg);
					}
				})
			},

			recordAudioDuration() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
				this.getAudioDuration();
				this.timer = setInterval(() => {
					this.getAudioDuration();
				}, 5000)
			},
			getAudioDuration() {
				let params = {
					id: 'read_status',
					token: uni.getStorageSync('findToken'),
					base_id: this.articleInfo.id
				};
				userData(params).then(res => {
					if (res.code == 0) {

					} else {
						//code 0 成功 -1 失败 -2token失效
						// this.$mHelper.toast(res.msg);
					}
				})
			},
			navChoose(type) {
				let url = ""
				if (type == 0) {
					url = "/pages/find/chooseFriend"
				} else {
					url = "/pages/find/chooseGroup"
				}
				uni.navigateTo({
					url
				})
				this.hidePopup();
			},
			audioTouchstart(e) {
				if (!this.isAudio) {
					this.$mHelper.toast('正在加载请稍候...')
					return;
				}
				console.log(e.touches[0].pageX, 'start')
				this.isTouch = true;
				this.start = e.touches[0].pageX;
			},
			audioTouchmove(e) {
				console.log(e.touches[0].pageX, 'move')
				let move = e.touches[0].pageX;
				if (move > this.start) {
					let moveX = move - this.start;
					let curMoveX = uni.upx2px(340);
					if (this.x >= uni.upx2px(340)) {
						this.x = uni.upx2px(340)
					} else {
						this.x = this.logX + moveX;
					}

					console.log(this.x, 'xxxxxxx')
				} else {
					let moveX = this.start - move;
					if (this.x <= 0) {
						this.x = 0
					} else {
						this.x = this.logX - moveX;
					}
				}

			},
			audioTouchend(e) {
				this.logX = this.x;
				if (this.x >= uni.upx2px(340)) {
					this.AUDIO.seek(this.videoDuration);
				} else {
					// let num=(this.x*100/uni.upx2px(340)).toFixed(0);
					let seeknum = (this.x * this.videoDuration / uni.upx2px(340)).toFixed(0);
					this.AUDIO.seek(seeknum);
					// this.AUDIO.play();
				}
				setTimeout(() => {
					this.isTouch = false;
				}, 1000)
			},
			onChange(e) {
				// 手动拖动才生效 
				if (e.detail.source === 'touch') {
					this.AUDIO.pause();
					this.x = e.detail.x;
					let barWidth = uni.upx2px(340) || 0;
					let num = parseInt(this.x / barWidth * this.maxScore);

					num = num > this.maxScore ? this.maxScore : num;
					num = num < this.minScore ? this.minScore : num;
					this.score = num;
					console.log(this.score, 'this.score')
					// 100 368.2 347 100
					// 57 200.2 347 100
					console.error("拖拽条：", this.score)
					console.log(this.videoDuration, 'this.videoDuration')
					if (this.score == 100) {
						this.AUDIO.seek(this.videoDuration);
					} else if (this.score == 0) {
						this.AUDIO.seek(0);
					} else {
						let time = (this.score * this.videoDuration / 100).toFixed(0)
						this.AUDIO.seek(time);
						this.AUDIO.play();
					}

				}
			},
			videoChangeEvent() {
				this.$nextTick(() => {
					this.AUDIO.onCanplay(() => {
						this.isAudio = true;
						console.log(this.AUDIO.duration, 'this.AUDIO')
						this.videoDuration = (this.AUDIO.duration).toFixed(0);
						let minute = parseInt(this.videoDuration / 60);
						minute = minute < 10 ? ('0' + minute) : minute;
						let second = this.videoDuration % 60
						second = second < 10 ? ('0' + second) : second;
						this.videoTimeStr = minute + ':' + second;
					})
				})
				//语音自然播放结束
				this.AUDIO.onEnded((res) => {
					this.videoPlayBtn = false;
					this.AUDIO.seek(0);
					this.left = 0;
					this.x = 0;
					this.logX = 0;
				});
				//播放事件
				this.AUDIO.onPlay((res) => {
					console.log('监听播放事件')
					this.videoPlayBtn = true;
					this.recordAudioDuration();
				});
				//暂停事件
				this.AUDIO.onPause((res) => {
					console.log('暂停事件')
					this.videoPlayBtn = false;
					if (this.timer) {
						clearInterval(this.timer);
						this.timer = null;
					}
				});
				//播放进度更新事件
				this.AUDIO.onTimeUpdate((res) => {
					if (this.videoDuration != null) {
						if (this.AUDIO) {
							if (!this.isTouch) {
								let curTime = (this.AUDIO.currentTime).toFixed(2);
								// console.log(curTime,'curTime')
								if (curTime == this.videoDuration) {
									this.left = 100;
									this.x = uni.upx2px(340)
								} else {
									this.left = (curTime / this.videoDuration * 100).toFixed(2)
									this.x = (uni.upx2px(340) * this.left / 100).toFixed(2)
								}
							}

							console.log(this.left, 'left')
						}
						// console.log(this.left,'left')
					}
				});
			},
			// 播放语音
			playVoice() {
				if (!this.isAudio) {
					this.$mHelper.toast('正在加载请稍候...')
					return;
				}
				//startTime 开始播放的位置（单位：s），默认 0
				//loop  是否循环播放，默认 false
				//currentTime  当前音频的播放位置 s
				// this.AUDIO.src = 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/zzzzzmp3/2016aJan/18X/18d_DeH/01.mp3';
				// console.log('播放')
				this.$nextTick(() => {
					this.AUDIO.play();
				});
			},
			pauseVoice() {
				this.$nextTick(() => {
					this.AUDIO.pause();
				});
			},
			seekAction(type) {
				console.log(this.AUDIO.currentTime, 'this.AUDIO.currentTime')
				if (!this.isAudio) {
					this.$mHelper.toast('正在加载请稍候...')
					return;
				}
				if (this.videoDuration != null) {
					if (type == 0) {
						let curTime = (this.AUDIO.currentTime).toFixed(2);
						if (curTime > 10) {
							this.AUDIO.seek(curTime * 1 - 10);
						} else {
							this.AUDIO.seek(0);
						}

					} else if (type == 1) {
						let curTime = (this.AUDIO.currentTime).toFixed(2);
						console.log(curTime, 'curTime')
						console.log(this.videoDuration - 10)
						if (curTime > (this.videoDuration - 10)) {
							console.log(1)
							this.AUDIO.seek(this.videoDuration);
						} else {
							this.AUDIO.seek(curTime * 1 + 10);
						}
					}
				}

			},
			navBack() {
				uni.navigateBack()
			},
			sharePopup() {
				this.show = true;
			},
			hidePopup() {
				this.show = false;
			},
			hidePopupTwo(){
				this.showOne=false;
			},
			navDetails(item) {
				uni.setStorageSync('articleItemData', item)
				if (this.AUDIO) {
					this.AUDIO.pause();
				}
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
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
		}

	}
</script>
<style lang="scss" scoped>
	::v-deep .u-drawer-bottom {
		border-radius: 40rpx 40rpx 0 0;
	}

	.page {
		min-height: 100vh;
		background-color: #fff;
		overflow: hidden;
	}

	.header-wrap {
		background: url(../../static/images/find/mp3Bg.png) no-repeat 100% 100%;
		background-size: 100% 100%;
		position: relative;
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