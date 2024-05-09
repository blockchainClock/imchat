<template>
	<view :class="!messageDec ? 'message-tool' : 'message-tool2'" @tap.stop="clickE">
		<div v-if="messageDec" @click="toolEvent(0)">
			<image src="../../../../../static/messageMenu/revoke.png" ></image>
			<div>撤回</div>
		</div>
		<div @click="toolEvent(1)">
			<image src="../../../../../static/messageMenu/copy.png" ></image>
			<div>复制</div>
		</div>
		<div @click="toolEvent(2)">
			<image src="../../../../../static/messageMenu/forward.png" ></image>
			<div>转发</div>
		</div>
		<div @click="toolEvent(3)">
			<image src="../../../../../static/messageMenu/reply.png" ></image>
			<div>引用</div>
		</div>
		<div @click="toolEvent(4)">
			<image src="../../../../../static/messageMenu/remove.png" ></image>
			<div>删除</div>
		</div>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import IMSDK, {
	  GroupMemberRole,
	  GroupStatus,
	  IMMethods,
	  MessageStatus,
	  MessageType,
	  SessionType,
	} from "openim-uniapp-polyfill";
	import { ContactChooseTypes, PageEvents } from "@/constant";
	let menupath = "../../../../../static/messageMenu/"
	export default {
		name:"MessageTool",
		props:{
			messageDec: {
			  type: Boolean,
			  default: false,
			},
			source:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				toolMenu:['撤回', '复制', '转发', '回复', '删除'],
			}
		},
		computed:{
			...mapGetters([
			  "storeQuoteMessage",
			  "storeCurrentConversation",
			  "storeCurrentGroup",
			  "storeCurrentMemberInGroup",
			  "storeBlackList",
			]),
		},
		methods:{
			...mapActions("message", ["pushNewMessage", "deleteMessages"]),
			clickE(){},
			toolEvent:function(type){
				switch (type){
					case 0:
						// 撤回
						
						IMSDK.asyncApi(
						  IMMethods.RevokeMessage,
						  IMSDK.uuid(), {
							conversationID: this.$store.getters.storeCurrentConversation.conversationID,
							clientMsgID: this.source.clientMsgID
						}).then(({ data }) => {
							this.deleteMessages([this.source]);
						})
						break;
					case 1:
						uni.setClipboardData({
							data: this.source.textElem.content,
							success: function () {
								
							}
						});
						break;
					case 2:
						
					    uni.navigateTo({
						    url: `/pages/common/contactChoose/index?type=${ContactChooseTypes.ForWard}&forwardMessage=${JSON.stringify(this.source)}`,
					    });
						
						break;
					case 3:
						this.$store.commit("message/SET_QUOTE_MESSAGE", this.source);
						break;
					case 4:
						IMSDK.asyncApi(
							IMMethods.DeleteMessage,
							IMSDK.uuid(),{
								conversationID: this.$store.getters.storeCurrentConversation.conversationID,
								clientMsgID: this.source.clientMsgID
							}
						) .then(({ data }) => {
							this.deleteMessages([this.source]);
						})
						break;
					default:
						break;
				}
				
				uni.$emit('resetTool')
			}
		}
		
	}
</script>

<style scoped>
	.message-tool, .message-tool2{
		position: absolute;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: flex-start;
		color: #fff;
		width: 160px;
		z-index: 9999;
		padding: 0 5px;
		border-radius: 5px;
	}
	.message-tool2{
		bottom: -120px;
		right: 70px;
	}
	.message-tool{
		bottom: -60px;
		left: 50px;
	}
	.message-tool div,.message-tool2 div{
		font-size: 10px;
		border: solid 0px #000;
		background: none;
		color: #fff;
		padding: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	image{
		width: 28px;
		height: 28px;
		padding: 0;
	}
	
</style>