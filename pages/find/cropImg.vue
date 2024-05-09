<template>
	<view class="content">
		<view class="cropper-wrapper" style="height:617px;display: flex;align-items: center;justify-content: center;"
			:style="{height:allHeight+'px'}">
			<canvas class="cropper" disable-scroll="true" @touchstart="touchStart" @touchmove="touchMove"
				@touchend="touchEnd" :style="{ width: cropperOpt.width, height: cropperOpt.height }"
				canvas-id="cropper"></canvas>
		</view>
		<view class="cropper-buttons">
			<view class="upload" @tap="uploadTap" style="color: #fff;">重新选择</view>
			<view class="getCropperImage" @tap="getCropperImage" style="color: #fff;">确定</view>
		</view>
	</view>
</template>

<script>
	import weCropper from '@/common/weCropper.js';
	const device = uni.getSystemInfoSync();
	const width = device.windowWidth;
	const height = device.windowHeight - 50;
	import * as fileUtil from '@/utils/file.js'
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				cropperOpt: {
					id: 'cropper',
					width: width,
					height: height,
					scale: 2.5,
					zoom: 8,
					cut: {
						x: (width - 295) / 2,
						y: (height - 398) / 2,
						width: 295,
						height: 398
					}
				},
				weCropper: '',
				allHeight: null,
				fileData: {}
			};
			// 295/x 172/232
		},
		computed: {
			...mapState('user', ['topPicFileData'])
		},
		methods: {

			touchStart(e) {
				this.weCropper.touchStart(e);
			},
			touchMove(e) {
				this.weCropper.touchMove(e);
			},
			touchEnd(e) {
				this.weCropper.touchEnd(e);
			},
			convertBase64UrlToBlob(dataURI, type) {
				var binary = atob(dataURI.split(',')[1]);
				var array = [];
				for (var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {
					type: type
				}, {
					filename: '1111.jpg'
				});
			},
			blobToDataURL(blob) {
				var a = new FileReader();
				a.readAsDataURL(blob); //读取文件保存在result中
				a.onload = function(e) {
					var getRes = e.target.result; //读取的结果在result中
					console.log(getRes);
				};
			},
			detailImage(path, callback) {
				let self = this;
				// #ifdef APP-PLUS
				plus.io.resolveLocalFileSystemURL(path, function(entry) {
					entry.file(function(file) {
						var fileReader = new plus.io.FileReader();
						//alert("getFile:" + JSON.stringify(file));
						fileReader.readAsDataURL(file);
						fileReader.onloadend = function(evt) {
							// console.log(JSON.stringify(evt.target.result)); base64字符串  
							callback(evt.target.result);
						}
					})
				})
				// #endif


				// #ifdef H5
				var img = new Image();
				img.src = path;
				img.onload = function() {
					//默认按比例压缩
					var w = self.cropperOpt.cut.width,
						h = self.cropperOpt.cut.height;
					var quality = 0.95; // 默认图片质量为0.7

					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');

					// 创建属性节点
					canvas.setAttribute("width", w);
					canvas.setAttribute("height", h);

					ctx.drawImage(self, 0, 0, w, h);
					// quality值越小，所绘制出的图像越模糊
					var base64 = canvas.toDataURL('image/jpeg', quality);
					// 回调函数返回base64的值
					callback(base64);
				};
				// #endif
			},
			// 将base64字符串转为文件对象
			base64ToFile(urlData) {
				var arr = urlData.split(",");
				var type = arr[0].match(/:(.*?);/)[1];
				var fileExt = type.split("/")[1];
				var bstr = atob(arr[1]);
				var n = bstr.length;
				var u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], `${"filename"}.` + fileExt, {
					type: type,
				});
			},
			getCropperImage() {
				let _this = this;
				//let pathurl = url + '/user/upload';上传服务器地址
				this.weCropper.getCropperImage(async avatar => {
					if (avatar) {
						//  获取到裁剪后的图片
						//  获取到裁剪后的图片
						// console.log(this.fileData.name, 'fileData')
						console.log(avatar, 'avatar')
						// const {
						// 	tempFilePaths: [avatar],
						// 	tempFiles:[avatar]
						// } = await fileUtil.chooseImage({
						// 	count: 1
						// });
						uni.showLoading({
							title: '上传中...'
						})
						let newUrl = avatar;
						// #ifdef H5
						newUrl = _this.base64ToFile(avatar);
						// #endif
						// let fileUrl = await base64ToPath(avatar);
						// console.log(fileUrl, 'fileUrl')
						// let fileData = {
						// 	name: _this.fileData.name,
						// 	lastModified: _this.fileData.lastModified,
						// 	lastModifiedDate: _this.fileData.lastModifiedDate,
						// 	size: _this.fileData.size,
						// 	type: _this.fileData.type,
						// 	webkitRelativePath: _this.fileData.webkitRelativePath,
						// 	path: fileUrl
						// };
						// const formData = new FormData();
						// formData.append(
						// 	"file",
						// 	new Blob([JSON.stringify(fileData)])
						// );
						// console.log(formData, 'fileData')
						let imgUrl = await fileUtil.uploadFile({
							file: newUrl,
							onProgressUpdate: ({
								progress
							}) => {
								console.log(progress, 'progress')
							}
						})
						console.log(imgUrl, 'imgUrl')
						uni.hideLoading();
						uni.$emit('cropImgUrl',imgUrl)
						setTimeout(()=>{
							uni.navigateBack()
						},100)
						// wx.redirectTo({
						//   url: '../index/index?avatar=' + avatar
						// })
						//下面是上传到服务器的方法
						// 					uni.uploadFile({
						// 						url: pathurl,
						// 						filePath: avatar,
						// 						name: 'file',
						// 						formData: { token: token, userId: userId},
						// 						success: res => {
						// 							console.log('uploadImage success, res is:', res);
						// 								uni.showToast({
						// 								title: '上传成功',
						// 								icon: 'success',
						// 								duration: 1000
						// 							});
						// 						},
						// 						ail: err => {
						// 							console.log('uploadImage fail', err);
						// 							uni.showModal({
						// 								content: err.errMsg,
						// 								showCancel: false
						// 							});
						// 							uni.hideLoading();
						// 						},
						// 						complete: () => {
						// 							console.log('complate');
						// 						}
						// 					});
					} else {
						console.log('获取图片失败，请稍后重试');
					}
				});
			},
			uploadTap() {
				const self = this;

				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success(res) {
						let src = res.tempFilePaths[0];
						//  获取裁剪图片资源后，给data添加src属性及其值

						self.weCropper.pushOrign(src);
					}
				});
			}
		},
		onLoad(option) {

			let systemInfo = uni.getSystemInfoSync();
			let statusBarHeight = systemInfo.statusBarHeight;
			console.log(statusBarHeight, 'statusBarHeight')
			this.allHeight = systemInfo.screenHeight - statusBarHeight - 44 - 50;
			console.log(this.allHeight, 'this.allHeight')
			// do something
			const cropperOpt = this.cropperOpt;
			const src = option.src;
			if (src) {
				Object.assign(cropperOpt, {
					src
				});

				this.weCropper = new weCropper(cropperOpt)
					.on('ready', function(ctx) {})
					.on('beforeImageLoad', ctx => {
						uni.showToast({
							title: '上传中',
							icon: 'loading',
							duration: 3000
						});
					})
					.on('imageLoad', ctx => {
						uni.hideToast();
					});
			}
			// console.log(this.topPicFileData,'dddddddddddd')
			this.fileData = this.topPicFileData

		}
	};
</script>

<style>
	.content {
		background: rgba(255, 255, 255, 1);
	}

	.head-list {
		height: 43px;
		width: 100%;
		background: #ffffff;
		justify-content: center;
		align-items: center;
		display: flex;
		border-bottom: 1px solid rgba(244, 244, 244, 1);
	}

	.head-info {
		text-align: center;
		font-size: 18px;
		color: #000000;
		font-weight: bold;
	}

	.save-box {
		position: absolute;
		right: 0px;
		width: 50px;
		height: 43px;
		line-height: 43px;
	}

	.save {
		color: rgba(98, 111, 252, 1);
		font-size: 16px;
		font-weight: 400;
	}

	.icon-back {
		margin-top: 11px;
		width: 10px;
		height: 18px;
		color: #000000;
		margin-left: 6px;
	}

	.icon-back-box {
		display: block;
		position: absolute;
		left: 6px;
		height: 43px;
		width: 30px;
		align-items: center;
	}

	.cropper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.cropper-buttons {
		background-color: rgba(0, 0, 0, 0.95);
		color: #04b00f;
	}

	.cropper-wrapper {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background-color: #F0F0F0;
	}

	.cropper-buttons {
		width: 100vw;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		line-height: 50px;
	}

	.cropper-buttons .upload,
	.cropper-buttons .getCropperImage {
		width: 50%;
		text-align: center;
	}
</style>