<template>
	<view>
		<u-navbar :border-bottom="false">
		</u-navbar>
		<view class="u-m-x-30 u-p-b-20 lurk">
			<text class="u-font-50">选择群聊</text>
		</view>
		<view class="search-bar"></view>
		<view class="head" :style="{top:`${navBar}px`}">
			<view class="u-m-x-30 u-p-b-20">
				<text class="u-font-50 text-bold">选择群聊</text>
			</view>
			<view class="search-bar">
				<u-search v-model="key" placeholder="搜索" :show-action="false" @change="changeName"></u-search>
			</view>
		</view>
		<view class="bg-white u-flex u-p-x-30 u-p-y-20 u-border-bottom"
			v-for="(item,index) in list" 
			:key="index"
			@tap="pick(item)"
		>
			<u-avatar :src="item.avatar" mode="square" size="110"></u-avatar>
			<view class="u-m-l-20">
				<view>
					<text class="u-font-36">{{item.name}}</text>
				</view>
				<view class="u-flex u-m-t-10">
					<text v-if="userId == item.userId" class="cu-tag sm bg-orange radius u-m-r-10">群主</text>
					<!-- <text class="u-font-24 text-gray">{{item.userCount}}人</text> -->
				</view>
			</view>
		</view>
		<u-popup v-model="ask.show" mode="center" :border-radius="20" width="550rpx">
			<view class="u-p-30">
				<view class="u-font-36 text-bold">
					群聊分享
				</view>
				<view class="u-flex u-m-t-40 u-p-20 bg-gray radius">
					<u-avatar :src="cur.avatar" mode="square" size="90"></u-avatar>
					<view class="u-m-l-20">
						<text class="u-font-32">{{cur.name}}</text>
					</view>
				</view>
				<view class="u-flex u-m-t-40">
					<view class="u-flex-1 u-p-20 bg-gray radius u-text-center u-font-28" @tap="cancel()">
						取消
					</view>
					<view class="u-m-l-30 u-flex-1 u-p-20 bg-theme radius u-text-center u-font-28" @tap="confirm()">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex';
	import chat, {
		msgTypes,
		dictateTypes
	} from "@/IM/index.js"
	import { goback } from "@/utils/util";
	export default {
		data() {
			return {
				key:'',
				ask:{
					show:false
				},
				cur:{},
				eventChannel:null,
				list:[],
				logList:[]
			};
		},
		computed:{
			...mapGetters('chat',['conversations','unread','online']),
			...mapGetters('user',['userId']),
			...mapGetters('addr',['groups']),
			// list(){
			// 	return this.groups.filter(({name})=>name.includes(this.key))
			// },
			// list(){
			// 	return this.conversations.filter((item)=>{
			// 		return item.type==1
			// 	})
			// },
			...mapGetters('user', ['userInfo','isReal']),
			...mapGetters('wallet', ['assets']),
			...mapGetters('system',['examine']),
			curUser(){
				return {
					avatarUrl:this.conversation.avatar,
					userName:this.conversation.name,
					userId:this.id
				}
			},
			systemInfo(){
				return getApp().globalData.systemInfo
			},
		},
		onLoad() {
			console.log(11111111)
			console.log(this.list,'list') 
			this.eventChannel = this.getOpenerEventChannel();
			let list=this.conversations;
			let newList= list.filter((item)=>{
					return item.type==1
				})
				this.logList=newList;
				this.list=newList;
		},
		methods:{
			...mapMutations('chat',['setChannel']),
			...mapActions('chat', ['sendMessage','saveHistory','setConversation','fetchConversation']),
			changeName(){
					this.list=this.logList.filter(({name})=>name.includes(this.key))
			},
			pick(item){
				this.cur = item
				this.showAsk()
			},
			showAsk(){
				this.ask.show = true
			},
			closeAsk(){
				this.ask.show = false
			},
			async confirm(){
				console.log(this.cur.id,'this.cur.userId')
				let articleData=uni.getStorageSync('articleItemData')
				const msg = chat.createMessage({
					chatType:1,
					groupId:this.cur.id,
					content: '[发现文章]',
					msgType: msgTypes.STUDY,
					extras:articleData
				})
				msg.readBody = {readCount:0,unreadCount:1}
				msg.avatar = this.userInfo.avatarUrl
				msg.nick = this.userInfo.userName
				msg.status = 'loading';
				msg.errMsg = ''
				
				await this.sendMessage({
					message: msg,
					id: this.cur.id//this.cur.userId
				})
				await chat.send(msg)
				msg.status = 'success';
				this.saveHistory()
				uni.showToast({
					title:'分享成功',
					icon:'none'
				})
				setTimeout(()=>{
					uni.navigateBack()
				},230)
				
			},
			cancel(){
				this.closeAsk()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lurk{
		opacity: 0;
	}
	.head{
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #FFFFFF;
	}
	.search-bar{
		height: 90rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}
</style>
