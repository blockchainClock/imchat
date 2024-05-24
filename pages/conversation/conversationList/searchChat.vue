<template>
	<view style="background-color: rgba(0, 0, 0, 0.04);height: 100vh;">
		<view style="height: 30rpx;"></view>
		<view class="header-search">
			<view class="search">
				<input @input="inputName" placeholder="搜索" focus="true" />
				<view class="cancle" @click="cancle">取消</view>
				<image class="icon-search" src="@/static/images/common_search.png"></image>
			</view>
		</view>
		<view style="height: 15px;"></view>
		<view v-if="searchData.length > 0">
			<view v-for="(item, index) in searchData"  @tap.prevent="clickConversationItem(item)" class="conversation_item">
				<view class="left_info">
					<my-avatar
					  :isGroup="item.conversationType === SessionType.WorkingGroup"
					  :isNotify="item.conversationType === SessionType.Notification"
					  :src="item.faceURL"
					  :desc="item.showName"
					  size="46"
					/>
					<view class="details">
					  <text class="conversation_name">{{ item.showName }}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import IMSDK, {
	  GroupAtType,
	  MessageReceiveOptType,
	  SessionType,
	} from "openim-uniapp-polyfill";
	import CustomNavBar from "@/components/CustomNavBar/index.vue";
	import { mapGetters } from "vuex";
	import MyAvatar from "@/components/MyAvatar/index.vue";
	import {
	  prepareConversationState
	} from "@/util/imCommon";
	export default {
	  name: "searchChat",
	  components: {
	    MyAvatar,
		CustomNavBar,
	  },
	  data(){
		return {
			searchData:[],
			SessionType:SessionType
		}  
	  },
	  computed: {
	    ...mapGetters(["storeConversationList"]),
	  },
	  methods:{
		  cancle(){
			uni.navigateBack()  
		  },
		  inputName(e){
			  let _this = this;
			  let keyWord = e.detail.value
			  setTimeout(()=>{
				  _this.searchKey(keyWord)
			  },1000)
		  },
		  searchKey(keyWord){
			  let chatList = this.storeConversationList;
			  let data = chatList.filter(x=>x.showName.includes(keyWord) );
			  this.searchData = data;
		  },
		  clickConversationItem(item){
			  prepareConversationState(item);
		  }
	  }
	}
</script>

<style lang="scss" scoped>
	.search{
		   // padding: 0 20rpx 16rpx 20rpx;
		   display: flex;
		   align-items: center;
		   position: relative;
	  }
	  .icon-search{
		  position: absolute;
		  left:5px;
		  width: 20px;
		  height: 20px;
	  }
	  .search input{
		   background: #fff;
		   border-radius: 3px;
		   font-size: 28rpx;
		   width:100%;
		   line-height: 60rpx;
		   height: 60rpx;
		   text-align: left;
		   text-indent: 2em;
	  }
	  .header-search{
		  padding: 0 24rpx 8rpx 24rpx;
		  margin-top: var(--status-bar-height);
	  }
	  .cancle{
		  color: blue;
		  padding: 0 0 0 10px;
		  white-space: nowrap;
	  }
	.conversation_item {
	  @include btwBox();
	  
	  background: #fff;
	  flex-direction: row;
	  padding: 12rpx 30rpx 20rpx;
	  position: relative;
	  border-bottom: solid 1px rgba(0, 0, 0, 0.02);
	  &_active {
	    background-color: #f3f3f3;
	  }
	
	  .left_info {
		display: flex;
		align-items: center;
	    .details {
	      margin-left: 24rpx;
	      color: $uni-text-color;
		  .conversation_name {
		    @include nomalEllipsis();
		    max-width: 40vw;
		    font-size: 30rpx;
		  }
		}
	  }
	}
</style>