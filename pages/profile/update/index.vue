<!-- 版本更新 -->
<template>
	<view class="mask" @click="closed">
		<view class="mask-con">
			<image src="/static/baseIcon/update.png" mode="aspectFit" class="update-bg"></image>
			<view style="position: relative; z-index: 1;">
				<view class="content">
					<view class="title">
						获取最新版本
					</view>
					<view class="update-con" v-html="content"></view>
				</view>
			</view>
			<view v-if="isUpdate" class="update-btn-wrap">
				<view class="base-flex-between" style="width: 100%;" v-if="is_file_update==0">
					<view class="btn1 flex-item-center" @tap.stop="closed">
						取消
					</view>
					<view class="btn2 flex-item-center" @click.stop="downLoad">
						立即升级
					</view>
				</view>
				<view class="update-btn" v-if="is_file_update==1" @click.stop="downLoad">
					立即升级
				</view>
			</view>
			
			<view v-else
				style="display: flex;flex-direction: row;align-items: center;margin-top: 52rpx;padding-left: 50rpx;padding-right: 50rpx;">
				<view class="progress-wrap">
					<!-- <text style="color: #FFFFFF;font-size: 12px;font-weight: bold;">{{downNum}}</text> -->
					<view class="progress-inner" :style="{'width':downNum+'%'}"><text v-if="downNum!=0"
							style="font-size: 12px;color: #FFFFFF;font-weight: bold;">{{downNum}}%</text></view>
				
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'Update',
		data() {
			return {
				downNum: 0,
				isUpdate: true,
				version: '',
				content: '',
				link: '',
				is_file_update:1,
				updateInfo: {
				  msg:"新版本更新内容",
				  force: 0,
				  number: "版本号",
				  ios:"http://kechat.keynes.pro/__UNI__F845BC8.wgt",
				  android: "http://kechat.keynes.pro/__UNI__F845BC8.wgt"
				  
			  }
			}
		},
		computed:{
		},
		onLoad() {
			this.content=this.updateInfo.msg;
			console.log(this.updateInfo,'this.updateInfo')
			// this.version = `${this.updateInfo.version||''}`
			this.is_file_update=this.updateInfo.force//0 非强制，1 强制|
			this.version=this.updateInfo.number;
			if(uni.getSystemInfoSync().platform=='ios'){
				this.link=this.updateInfo.ios;
			}else{
				this.link=this.updateInfo.android;
			}
			
		},
		onBackPress(options) {
		   if (options.from == 'backbutton') {
		       return true;
		   } else if (options.from == 'navigateBack') {
		       return false;
		   }
		},
		methods: {
			closed:function(){
				this.$emit('closeUpdate')
			},
			navBack(){
				uni.navigateBack()
			},
			downLoad() {
				if(uni.getSystemInfoSync().platform=='ios'){
					this.link=this.updateInfo.ios;
				}else{
					this.link=this.updateInfo.android;
				}
				let self=this;
				console.log(this.link,this.updateInfo)
				if(!this.link) {
					uni.showToast({
						title: '下载地址为空',
						icon: 'none'
					})
					return
				}
				this.isUpdate = false 
				plus.nativeUI.showWaiting('正在下载');
				var dtask = plus.downloader.createDownload(this.link, {
						// filename: "_doc/update/" + new Date().getTime() + '/'
					},
					function(d, status) {
						plus.nativeUI.closeWaiting();
						//console.log(status, '下载完成')
						if (status == 200) {
							uni.showToast({
								title: '正在准备环境，请稍后！', //'正在准备环境，请稍后！'
								icon: 'none'
							})
							setTimeout(function() {
								var path = d.filename; //下载apk
								console.log(path);
								//plus.runtime.install()
								plus.runtime.install(path, {
									force: true
								}, function() {
									var str = '更新成功,请手动重启'; //'更新成功,请手动重启'
									if (plus.os.name.toLowerCase() == 'ios') {
										str = '更新成功，将自动重启' //'更新成功，将自动重启'
									}
									plus.nativeUI.alert(str, function() {
										if (plus.os.name.toLowerCase() == 'ios') {
											plus.runtime.restart();
										} else {
											console.log('更新完成')
											plus.runtime.quit();
										}
									});
								}, function(ttt) { //"更新失败"
									plus.nativeUI.toast("更新失败", {
										verticalAlign: 'center'
									});
								}); // 自动安装apk文件
							}, 100);
						} else {
							plus.nativeUI.alert('资源包下载失败:' + status); //'资源包下载失败:'
						}
					});
				dtask.addEventListener('statechanged', (task) => {
							console.log(task,'task')
					// if(task.state==3){
					if (task.totalSize != 0) {
						self.downNum = parseInt((task.downloadedSize / task.totalSize) * 100);
						// console.log(self.downNum,'self.downNum')
					}
							
				}, false)
							
				dtask.start();
			}
		}
	}
</script>

<style lang="scss">
page {
	background: transparent;
}
.mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	background: rgba(23, 26, 28, 0.6);
}
.mask-con {
	min-height: 836rpx;
	width: 100%;
	margin: 0 72rpx;
	background: #fff;
	border-radius: 18rpx;
	position: relative;
	.update-bg {
		width: 100%;
		height: 836rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
	}
	.content {
		padding-top: 386rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
		.title {
			font-size: 32rpx;
			color: #171A1C;
			line-height: 100%;
			text-align: center;
			font-weight: 700;
		}
		.update-con {
			max-height: 210rpx;
			margin: 32rpx 0;
			overflow-y: auto;
			font-size: 24rpx;
			color: #3E4246;
			box-sizing: border-box;
			
		}
	}
	.update-btn {
		position: absolute;
		bottom: 56rpx;
		left: 72rpx;
		right: 72rpx;
		height: 80rpx;
		background: linear-gradient(135deg, #FF855F 0%, #FF5F5F 100%);
		border-radius: 74rpx;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 28rpx;
	}
	.update-btn-wrap {
		position: absolute;
		bottom: 56rpx;
		left: 50%;
		transform: translateX(-50%);
		height: 80rpx;
		width: 606rpx;
		padding: 0 40rpx;
		.btn1{
			width: 230rpx;
			height: 80rpx;
			border: 1px solid #999;
			font-size: 28rpx;
			color: #666;
			border-radius: 40rpx;
		}
		.btn2{
			width: 230rpx;
			height: 80rpx;
			background: linear-gradient(135deg, #FF855F 0%, #FF5F5F 100%);
			border-radius: 74rpx;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 28rpx;
		}
	}
	.progress-wrap {
		width: 100%;
		height: 30rpx;
		border-radius: 15rpx;
		position: relative;
		background-color: #EFEFEF;
	}
	
	.progress-inner {
		position: absolute;
		left: 0;
		top: 0;
		height: 30rpx;
		border-radius: 15rpx;
		background: linear-gradient(360deg, #FF855F 0%, #FF5F5F 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		color: #FFFFFF;
		font-weight: bold;
	}
}
</style>