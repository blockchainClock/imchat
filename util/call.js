import IMSDK, {
	  GroupMemberRole,
	  GroupStatus,
	  IMMethods,
	  MessageStatus,
	  MessageType,
	  SessionType,
	} from "openim-uniapp-polyfill";
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import { CustomType } from "@/constant/im";
import { parseMessageByType, offlinePushInfo } from "@/util/imCommon";
import { UpdateMessageTypes } from "@/constant";

export const notify =  {
	          noticeId: 1,
	          channalId: "Default_id",
	          channalName: "Default",
	          title: "消息通知",
	          content: "通知内容",
	          subText: "通知栏附加文本",
	          largeIcon: true,
	          smallColor: "#000000",
	          bigPicture: "static/logo.png",
	          autoCancel: true,
	          noticeTime: true,
	          import: 0,
	          ongoing: false,
	          badge: 1,
	          trigger: 1,
	          bigText: "",
	          customButton: "查看",
	          // 自定义数据
	          payload: {
	            pages: "/pages/conversation/conversationList/index",
	            type: "default",
	          },
	        }
export const callWebView = () => {
	let css = {
		'padding':'5px',
		'width':'60px',
		'height':'60px',
		'line-height':'25px'
	}
	let params = {
		webUrl: "file:///android_asset/index.html?css=" + JSON.stringify(css),//网页地址
		width:90,//宽度 px
		height: 110,//高度 px
		xRatio: 0.75,//x轴偏移量（屏幕宽度比例）
		yRatio: 0,//y轴偏移量（屏幕高度比例）
	}
	uni.$openWebview.show(params,
	   (res) => {
	});
}
export const callEvent = async(customType, callBack)=>{
	let  userid =store.getters.storeSelfInfo.userID;
	let params = JSON.parse(store.getters.storeCallingInfo);
	console.log('......', params)
	try{
		let messagedata = {
			data:{
				customType: customType,
				inviterUserID: params.sendID,
				inviteeUserIDList: params.inviteeUserIDList,
				groupID:"",
				roomID: IMSDK.uuid(),
				timeout: 60,
				mediaType:  params.mediaType,
				sessionType: SessionType.Single,
				platformID: 2,
				token: params.token,
				conversationID: params.conversationID,
				time: params.time ? params.time:0
			}
		}
		let message;
		try{
			message = await IMSDK.asyncApi(
			 IMMethods.CreateCustomMessage,
			 IMSDK.uuid(),
			 JSON.stringify(messagedata)
			)
		}catch(e){
			console.log('error', e)
			return;
			//TODO handle the exception
		}
		IMSDK.asyncApi(IMMethods.SendMessage, IMSDK.uuid(), {
		  recvID: userid == params.sendID ? params.inviteeUserIDList[0] : params.sendID,
		  groupID: '',
		  message,
		  offlinePushInfo,
		}).then(({ data }) => {
			
			if(customType == CustomType.CallingReject ||
				customType == CustomType.CallingCancel ||
				customType == CustomType.CallingHungup
			){
				store.dispatch("message/pushNewMessage", data)
			}
			
			 callBack()
			 
		}).catch(res=>{
			console.log(res)
		})
	}catch(e){
		console.log('error',e)
		//TODO handle the exception
	}
}


