<template>
	<view class="page_container">
		 <custom-nav-bar title="会议" />
		 <view class="action-tab">
			 <view class="action-item">
				  <image src="@/static/images/contact_my_group.png"></image>
				  <text>创建会议</text>
			 </view>
			 <view class="action-item">
				  <image src="@/static/images/contact_my_group.png"></image>
				  <text>加入会议</text>
			 </view>
		 </view>
		<!-- contact_my_group -->
	</view>
</template>

<script>
	import CustomNavBar from "@/components/CustomNavBar/index.vue";
	export default {
		components: {
		  CustomNavBar
		},
		data(){
			return{
				
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
</style>