<template>
	<view class="page">
		<view class="header-wrap">
			<view class="status-bar-height">

			</view>
			<view style="height:88rpx;padding:0 54rpx;">
				<view class="base-flex-between" style="height:88rpx;">
					<image @tap="navBack" src="/static/images/find/backIcon.png" style="width: 68rpx;height: 68rpx;"
						mode=""></image>
					<view style="text-align: center;font-size: 38rpx;color: #020202;font-weight: 500;">上传我的音频
					</view>
					<view style="width: 68rpx;height: 68rpx;"></view>
				</view>
			</view>
		</view>
		<view class="status-bar-height">

		</view>
		<view style="height:88rpx;">

		</view>
		<view style="padding: 32rpx 54rpx 40rpx;">
			<view class="floor-one"
				style="background-color: #fff;border-radius: 16rpx;padding: 40rpx 14rpx 16rpx 32rpx;margin-bottom: 24rpx;">
				<view class="flex-center">
					<text style="font-size: 30rpx;color: #020202;font-weight: 500;margin-right: 8rpx;">作品分类</text>
					<image src="/static/images/find/checkedOne.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
				</view>
				<view class="flex-center" style="margin: 4rpx 0 32rpx;">
					<image src="/static/images/find/tipsIcon.png"
						style="width: 24rpx;height: 24rpx;margin-right: 8rpx;"></image>
					<text style="font-size: 26rpx;color: rgba(0, 0, 0, 0.40);">只可添加一种分类</text>
				</view>
				<view class="flex-center" style="flex-wrap: wrap;">
					<view @tap="changeTag(i)" class="wrap1" :class="{'wrap1-a':tagIndex==i}"
						v-for="(item,i) in tagsList" :key="i">{{item.value}}</view>
				</view>
			</view>
			<view class="floor-two"
				style="background-color: #fff;border-radius: 16rpx;padding: 30rpx 32rpx 32rpx;margin-bottom: 24rpx;">
				<view style="font-size: 30rpx;color: #020202;font-weight: 500;margin-bottom: 22rpx;">创作者名称</view>
				<input v-model="formData.name" type="text" placeholder="请输入10字以内文字" maxlength="10"
					placeholder-style="font-size:24rpx;color:rgba(0, 0, 0, 0.40);"
					style="font-size: 24rpx;color: #000;width: 100%;">
				<view style="width: 100%;height: 1px;background-color: #F5F6FA;margin-top: 10rpx;"></view>
			</view>
			<view class="floor-two"
				style="background-color: #fff;border-radius: 16rpx;padding: 30rpx 32rpx 32rpx;margin-bottom: 24rpx;">
				<view style="font-size: 30rpx;color: #020202;font-weight: 500;margin-bottom: 22rpx;">作品标题</view>
				<input v-model="formData.title" type="text" placeholder="请输入10字以内文字" maxlength="10"
					placeholder-style="font-size:24rpx;color:rgba(0, 0, 0, 0.40);"
					style="font-size: 24rpx;color: #000;width: 100%;">
				<view style="width: 100%;height: 1px;background-color: #F5F6FA;margin-top: 10rpx;"></view>
			</view>
			<view class="floor-two"
				style="background-color: #fff;border-radius: 16rpx;padding: 30rpx 32rpx 32rpx;margin-bottom: 24rpx;">
				<view style="font-size: 30rpx;color: #020202;font-weight: 500;margin-bottom: 22rpx;">作品简介</view>
				<textarea v-model="formData.brief" type="text" placeholder="请输入50字以内文字" maxlength="50"
					:auto-height="true" placeholder-style="font-size:24rpx;color:rgba(0, 0, 0, 0.40);"
					style="font-size: 24rpx;color: #000;width: 100%;" />
				<view style="width: 100%;height: 1px;background-color: #F5F6FA;margin-top: 10rpx;"></view>
			</view>
			<view class="base-flex-between">
				<view @tap="chooseImg"
					style="width: 254rpx;height: 316rpx;background-color: #fff;border-radius: 16rpx;padding: 32rpx 32rpx 0;">
					<view style="font-size:30rpx;color: #020202;font-weight: 500;margin-bottom: 18rpx;">选择封面</view>
					<view
						style="width: 190rpx;height: 190rpx;border-radius: 12rpx;background-color: #F5F6FA;display: flex;flex-direction: column;align-items: center;padding-top: 40rpx;position: relative;">
						<image v-if="!coverUrl" src="/static/images/find/imgIcon.png"
							style="width: 72rpx;height: 72rpx;margin-bottom: 12rpx;" mode=""></image>
						<text v-if="!coverUrl" style="font-size: 20rpx;color: rgba(0, 0, 0, 0.40);">支持JPG/PNG</text>
						<image :src="coverUrl" v-if="coverUrl" mode="aspectFill"
							style="width: 190rpx;height: 190rpx;border-radius: 12rpx;position: absolute;left: 0;top: 0;">
						</image>
					</view>
				</view>
				<view
					style="width: 294rpx;height: 316rpx;background-color: #fff;border-radius: 16rpx;padding: 32rpx 32rpx 0;">
					<view style="font-size:30rpx;color: #020202;font-weight: 500;margin-bottom: 18rpx;">选择文件内容</view>

					<lsj-upload ref="lsjUpload" childId="upload" :width="width" :height="height" :option="option"
						:size="size" :showFile="showFile" :multiple="multiple" :formats="formats" :debug="debug"
						:instantly="instantly" @change="onChange" @progress="onprogress" @uploadEnd="onuploadEnd">
						<view
							style="width: 230rpx;height: 190rpx;border-radius: 12rpx;background-color: #F5F6FA;display: flex;flex-direction: column;align-items: center;padding-top: 40rpx;">
							<image src="/static/images/find/uploadFile.png"
								style="width: 72rpx;height: 72rpx;margin-bottom: 12rpx;" mode=""></image>
							<text style="font-size: 20rpx;color: rgba(0, 0, 0, 0.40);">支持MP3{{filePath?'(已上传)':''}}</text>
						</view>
					</lsj-upload>
				</view>
			</view>
			<view @tap="releaseTopPic" class="flex-item-center"
				style="margin-top: 54rpx;width: 100%;height: 112rpx;background-color: #FFD600;border-radius: 112rpx;font-size: 38rpx;color: #12131B;font-weight: 500;">
				发布</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view style="width: 500rpx;height: 300rpx;" class="flex-item-center">上传中，请稍候...({{uploadNum}}%)</view>
		</u-popup>
	</view>
</template>

<script>
	import * as fileUtil from '@/utils/file.js'
	// import lsjUpload from "@/components/lsj-upload/lsj-upload.vue"
	import * as cache from "@/utils/storage.js"
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import commonData from "@/common/config.js"
	import {
		BASE_URL
	} from "@/utils/constant.js"
	import {
		userDataPost,
		userData
	} from "@/api/find.js"
	export default {
		data() {
			return {
				listData: [{
					type: 1
				}, {
					type: 2
				}, {
					type: 2
				}],
				tagsList: [],
				tagIndex: 0,
				coverUrl: '',
				show: false,

				// 上传接口参数
				option: {
					// 上传服务器地址，需要替换为你的接口地址
					url: '', // 该地址非真实路径，需替换为你项目自己的接口地址  https://im-api.kechat.io/sysFileUpload/upload
					realurl: '', //真实地址
					// 上传附件的key
					name: 'image', //file 原类型  image矿池类型
					realname: 'file',
					// 根据你接口需求自定义请求头,默认不要写content-type,让浏览器自适配
					header: {
						// 示例参数可删除
						'Authorization': 'bearer aa',
						Token: ''
					},
					// 根据你接口需求自定义body参数
					formData: {
						Token: ''
					}
				},
				// 选择文件后是否立即自动上传，true=选择后立即上传
				instantly: true,
				// 必传宽高且宽高应与slot宽高保持一致
				width: '230rpx',
				height: '190rpx',
				// 限制允许上传的格式，空串=不限制，默认为空
				formats: 'mp3,m4a,wav',
				// 文件上传大小限制
				size: 200,
				// 文件数量限制
				count: 1,
				// 是否多选
				multiple: false,
				// 文件回显列表
				files: new Map(),
				debug: true,
				showFile: false,
				filePath: '',
				uploadNum: 0,
				formData: {
					name: '',
					column: '',
					title: '',
					brief: ''
				}
			}
		},
		components: {
			// lsjUpload
		},
		computed:{
			...mapGetters('user',['userInfo']),
		},
		async onLoad() {
			const token = await cache.get('token');
			this.option.header.Token = token;
			console.log(token, 'token')
			this.option.url = commonData.imgUrl + '/upload'
			this.option.realurl = BASE_URL + "/sysFileUpload/upload"
			this.getTypeList();
			uni.$on('cropImgUrl',data=>{
				this.coverUrl=data;
			})
		},
		methods: {
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
							let listData = list.filter(item => {
								return item.value != '推荐'
							})
							this.tagsList = listData;
						} else {
							this.tagsList = [];
						}
					} else {
						//code 0 成功 -1 失败 -2token失效
						// this.$mHelper.toast(res.msg);
					}
				})
			},
			releaseTopPic() {
				let params = {
					id:'0',
					uuid: this.userInfo.userId,
					name: this.formData.name,
					column: this.tagsList[this.tagIndex].value,
					title: this.formData.title,
					banner: this.coverUrl,
					brief: this.formData.brief,
					audio: this.filePath,
				}
				let url = "?id=input_article&token=" + uni.getStorageSync('findToken')
				if(!this.formData.name){
					this.$mHelper.toast('请输入创作者名称');
					return;
				}
				if(!this.formData.title){
					this.$mHelper.toast('请输入作品标题');
					return;
				}
				if(!this.formData.brief){
					this.$mHelper.toast('请输入作品简介');
					return;
				}
				if(!this.coverUrl){
					this.$mHelper.toast('请选择封面');
					return;
				}
				if(!this.filePath){
					this.$mHelper.toast('请选择文件内容');
					return;
				}
				uni.showLoading({
					title:'发布中...'
				})
				userDataPost(url, params).then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						uni.$emit('update_find_list',1)
						this.$mHelper.toast('已上传待审核');
						setTimeout(()=>{
							this.$mHelper.back()
						},260)
					} else {
						this.$mHelper.toast(res.data);
					}
				})
			},
			// 某文件上传结束回调(成功失败都回调)
			onuploadEnd(item) {

				if (item['responseText']) {
					let data = JSON.parse(item.responseText)
					console.log(data, '成功数据')
					if (data.code == 0) {
						this.filePath = data.data;
						console.log(this.filePath, 'this.filePath')
					} else {
						uni.showToast({
							title: data.retDesc,
							icon: "none"
						})
					}
				}

				this.showFile = false;
				this.show = false;
				this.uploadNum = 0;
			},
			// 上传进度回调
			onprogress(item) {
				
				this.files.set(item.name, item);
				// 强制更新视图
				this.$forceUpdate();
				console.log(item, '进度')
				this.uploadNum = item.progress;
			},
			// 文件选择回调
			onChange(files) {
				this.showFile = true;
				this.show = true;
				console.log(files, '上传文件')
			},
			navBack() {
				uni.navigateBack()
			},
			changeTag(index) {
				this.tagIndex = index;
			},
			async chooseImg() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success:(res)=> {
						console.log(res,'res')
						console.log(res.tempFiles[0],'res.tempFiles[0]')
						uni.setStorageSync('topPicImgData',JSON.stringify(res.tempFiles[0]))
						let topPicImgData=uni.getStorageSync('topPicImgData');
						console.log(this.$store,'this.$store')
						this.$store.commit('user/setTopPicInfo',res.tempFiles[0]);
						console.log(topPicImgData,'topPicImgData')
						const src = res.tempFilePaths[0];
						
						uni.navigateTo({
							url: '/pages/find/cropImg?src=' + src
						});
					}
				});
				return;
				const {
					tempFilePaths: [filePath],
					tempFiles: [file]
				} = await fileUtil.chooseImage({
					count: 1 
				});
				console.log(file,'file')
				uni.showLoading({
					title: '上传中...'
				})
				let imgUrl = await fileUtil.uploadFile({
					file,
					onProgressUpdate: ({
						progress
					}) => {
						console.log(progress, 'progress')
					}
				})
				this.coverUrl = imgUrl;
				uni.hideLoading();

				console.log(imgUrl, 'imgUrl')
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

	.floor-one {
		.wrap1 {
			min-width: 100rpx;
			height: 68rpx;
			padding: 0 22rpx;
			border-radius: 16rpx;
			background-color: #F5F6FA;
			font-size: 28rpx;
			color: #12131B;
			font-weight: 500;
			margin-right: 18rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			margin-bottom: 22rpx;
		}

		.wrap1-a {
			background-color: #FFD600;
		}
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