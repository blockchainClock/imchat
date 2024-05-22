<script>
import { mapGetters, mapActions } from "vuex";
import IMSDK, {
  IMMethods,
  MessageReceiveOptType,
  MessageType,
  SessionType,
} from "openim-uniapp-polyfill";
    const floatWin = uni.requireNativePlugin('Ba-FloatWinNotification')
import config from "./common/config";
import { getDbDir, toastWithCallback } from "@/util/common.js";
import { conversationSort } from "@/util/imCommon";
import { PageEvents, UpdateMessageTypes } from "@/constant";
import { checkUpdateFormPgyer } from "@/api/checkUpdate";
import NotificationUtil from "./util/notification";
import { CustomType } from "@/constant/im";
import { callEvent,notify } from "@/util/call.js";
import permision from "@/util/permission.js";
import {formatInputHtml} from "@/util/common.js"
const syczuanNotice = uni.requireNativePlugin("syczuan-notice");
let cacheConversationList = [];
let updateDownloadTask = null;
let notificationIntance = null;
let pausing = false;
let shownotice = false;
var info = plus.push.getClientInfo();
 // floatWin.show({
 // 		title: "kechat",
 // 		content: ': 你有一条新消息' ,
 // 		time: "1s",
 // 		iconBase64: "data:image/png;base64,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"
 // 	},
 // 	(res) => {
 // });
 // setTimeout(()=>{
 // 	floatWin.hide();
 // }, 6000)
export default {
  onLaunch: function () {
	
    this.$store.dispatch("user/getAppConfig");
    this.launchCheck();
    this.setGlobalIMlistener();
    this.setPageListener();
    this.tryLogin();
    console.warn(`建议开发前先查看接入文档（https://docs.openim.io/zh-Hans/sdks/quickstart/uniapp）。`);
    // #ifdef H5 || MP-WEIXIN
    console.warn(`运行H5或微信小程序，需要注意额外部署 OIMWS 服务，默认端口为 10003，当前 WsUrl 为${config.getWsUrl()}，文档地址https://docs.openim.io/zh-Hans/guides/gettingStarted/jssdk`);
    // #endif
  },
  onShow: function () {
    console.log("App Show");
	floatWin.hide()
	shownotice = false;
	 // IMSDK.asyncApi(IMSDK.IMMethods.SetAppBackgroundStatus, IMSDK.uuid(), false);
	
	IMSDK.asyncApi(IMSDK.IMMethods.SetAppBackgroundStatus, IMSDK.uuid(), true);
  },
  onHide: function () {
    console.log("App Hide");
	shownotice = true;	
  },
  computed: {
    ...mapGetters([
      "storeConversationList",
      "storeCurrentConversation",
      "storeCurrentUserID",
      "storeSelfInfo",
      "storeRecvFriendApplications",
      "storeRecvGroupApplications",
      "storeHistoryMessageList",
      "storeIsSyncing",
    ]),
    contactBadgeRely() {
      return {
        recvFriendApplications: this.storeRecvFriendApplications,
        recvGroupApplications: this.storeRecvGroupApplications,
        userKey: this.storeCurrentUserID,
      };
    },
  },
  methods: {
    ...mapActions("message", [
      "pushNewMessage",
      "updateOneMessage",
      "updateQuoteMessageRevoke",
      "updateMessageNicknameAndFaceUrl",
    ]),
    ...mapActions("conversation", ["updateCurrentMemberInGroup"]),
    ...mapActions("contact", [
      "updateFriendInfo",
      "pushNewFriend",
      "updateBlackInfo",
      "pushNewBlack",
      "pushNewGroup",
      "updateGroupInfo",
      "pushNewRecvFriendApplition",
      "updateRecvFriendApplition",
      "pushNewSentFriendApplition",
      "updateSentFriendApplition",
      "pushNewRecvGroupApplition",
      "updateRecvGroupApplition",
      "pushNewSentGroupApplition",
      "updateSentGroupApplition",
    ]),
    setGlobalIMlistener() {
      console.log("setGlobalIMlistener");
      // init
	  uni.$on('callsend',(data)=>{
		  console.log('customType,params, userid',data)
		  callEvent(data.customType,data, data.userID,()=>{
			  uni.navigateBack()
		  })
	  })
      const kickHander = (message) => {
        toastWithCallback(message, () => {
          uni.removeStorage({
            key: "IMToken",
          });
          uni.removeStorage({
            key: "BusinessToken",
          });
          // Igexin.unbindAlias(this.storeCurrentUserID)
          uni.$u.route("/pages/login/index");
        });
      };
      IMSDK.subscribe(IMSDK.IMEvents.OnConnectFailed, ({ errCode }) => {
        console.log('OnConnectFailed', errCode)
      });
      IMSDK.subscribe(IMSDK.IMEvents.OnConnecting, (data) => {
        console.log('OnConnecting', data)
      });
      IMSDK.subscribe(IMSDK.IMEvents.OnConnectSuccess, (data) => {
        console.log('OnConnectSuccess', data)
      });
      IMSDK.subscribe(IMSDK.IMEvents.OnKickedOffline, (data) => {
        console.log('OnKickedOffline', data)
        kickHander("您的账号在其他设备登录，请重新登陆！");
      });
      IMSDK.subscribe(IMSDK.IMEvents.OnUserTokenExpired, (data) => {
        console.log('OnUserTokenExpired', data)
        kickHander("您的登录已过期，请重新登陆！");
      });

      // sync
      const syncStartHandler = () => {
        uni.showLoading({
          title: "同步中",
          mask: true,
        });
        this.$store.commit("user/SET_IS_SYNCING", true);
      };
      const syncFinishHandler = () => {
        uni.hideLoading();
        this.$store.dispatch("conversation/getConversationList");
        this.$store.dispatch("conversation/getUnReadCount");
        this.$store.commit("user/SET_IS_SYNCING", false);
      };
      const syncFailedHandler = () => {
        uni.hideLoading();
        uni.$u.toast("同步消息失败");
        this.$store.dispatch("conversation/getConversationList");
        this.$store.dispatch("conversation/getUnReadCount");
        this.$store.commit("user/SET_IS_SYNCING", false);
      };
      IMSDK.subscribe(IMSDK.IMEvents.OnSyncServerStart, syncStartHandler);
      IMSDK.subscribe(IMSDK.IMEvents.OnSyncServerFinish, syncFinishHandler);
      IMSDK.subscribe(IMSDK.IMEvents.OnSyncServerFailed, syncFailedHandler);
	   
      // self
      const selfInfoUpdateHandler = ({ data }) => {
        this.$store.commit("user/SET_SELF_INFO", {
          ...this.storeSelfInfo,
          ...data,
        });
      };

      IMSDK.subscribe(IMSDK.IMEvents.OnSelfInfoUpdated, selfInfoUpdateHandler);

      // message
      const newMessagesHandler = ({ data }) => {
		  
        if (this.storeIsSyncing) {
          return;
        }
        data.forEach(this.handleNewMessage);
      };
      const c2cReadReceiptHandler = ({ data: receiptList }) => {
        if (receiptList[0].userID !== this.storeCurrentConversation.userID) {
          return;
        }

        receiptList.forEach((item) => {
          item.msgIDList.forEach((msgID) => {
            this.updateOneMessage({
              message: {
                clientMsgID: msgID,
              },
              type: UpdateMessageTypes.KeyWords,
              keyWords: {
                key: "isRead",
                value: true,
              },
            });
          });
        });
      };
      const groupReadReceiptHandler = ({ data: receiptList }) => {
        if (receiptList[0].groupID !== this.storeCurrentConversation.groupID) {
          return;
        }

        receiptList.forEach((item) => {
          item.msgIDList.forEach((msgID) => {
            const inlineMessage = this.storeHistoryMessageList.find(
              (message) => message.clientMsgID === msgID,
            );
            if (inlineMessage) {
              inlineMessage.attachedInfoElem.groupHasReadInfo.hasReadUserIDList =
                [
                  ...(inlineMessage.attachedInfoElem.groupHasReadInfo
                    .hasReadUserIDList ?? []),
                  item.userID,
                ];
              // Members who join later in the workgroup will also send read receipts. Need filter.
              if (
                inlineMessage.attachedInfoElem.groupHasReadInfo
                  .groupMemberCount -
                  inlineMessage.attachedInfoElem.groupHasReadInfo.hasReadCount >
                1
              ) {
                inlineMessage.attachedInfoElem.groupHasReadInfo.hasReadCount += 1;
              }

              console.log({
                ...inlineMessage,
              });
              this.updateOneMessage({
                message: {
                  ...inlineMessage,
                },
              });
            }
          });
        });
      };
      const newRecvMessageRevokedHandler = ({ data: revokedMessage }) => {
        if (!this.storeCurrentConversation.conversationID) {
          return;
        }

        this.updateOneMessage({
          message: {
            clientMsgID: revokedMessage.clientMsgID,
          },
          type: UpdateMessageTypes.KeyWords,
          keyWords: [
            {
              key: "contentType",
              value: MessageType.RevokeMessage,
            },
            {
              key: "notificationElem",
              value: {
                detail: JSON.stringify(revokedMessage),
              },
            },
          ],
        });
        this.updateQuoteMessageRevoke({
          clientMsgID: revokedMessage.clientMsgID
        })
      };
	  

      IMSDK.subscribe(IMSDK.IMEvents.OnRecvNewMessages, newMessagesHandler);
	  // IMSDK.subscribe(IMSDK.IMEvents.OnRecvOfflineNewMessages, (data)=>{
		 //  console.log('新离线消息', data)
	  // 	uni.vibrateLong();
	  // 	let noticedata = notify;
	  // 	noticedata.content =  '11'
	  // 	syczuanNotice.send(
			// notify
		 //   ,
			// (e) => {
			//   console.log('',e);
			// }
	  // 	);
	  // });
      IMSDK.subscribe(
        IMSDK.IMEvents.OnRecvC2CReadReceipt,
        c2cReadReceiptHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnRecvGroupReadReceipt,
        groupReadReceiptHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnNewRecvMessageRevoked,
        newRecvMessageRevokedHandler,
      );

      // friend
      const friendInfoChangeHandler = ({ data }) => {
        console.log(data);
        if (data.userID === this.storeCurrentConversation?.userID) {
          this.updateMessageNicknameAndFaceUrl({
            sendID: data.userID,
            senderNickname: data.nickname,
            senderFaceUrl: data.faceURL,
          });
          this.$store.commit(
            "conversation/SET_CURRENT_CONVERSATION",
            {...this.storeCurrentConversation, showName: data.nickname},
          );
        }
        console.log(this.storeConversationList)
        this.updateFriendInfo({
          friendInfo: data,
        });
      };
      const friendAddedHandler = ({ data }) => {
        this.pushNewFriend(data);
      };
      const friendDeletedHander = ({ data }) => {
        this.updateFriendInfo({
          friendInfo: data,
          isRemove: true,
        });
      };

      IMSDK.subscribe(
        IMSDK.IMEvents.OnFriendInfoChanged,
        friendInfoChangeHandler,
      );
      IMSDK.subscribe(IMSDK.IMEvents.OnFriendAdded, friendAddedHandler);
      
      IMSDK.subscribe(IMSDK.IMEvents.OnFriendDeleted, friendDeletedHander);

      // blacklist
      const blackAddedHandler = ({ data }) => {
        this.pushNewBlack(data);
      };
      const blackDeletedHandler = ({ data }) => {
        this.updateBlackInfo({
          blackInfo: data,
          isRemove: true,
        });
      };

      IMSDK.subscribe(IMSDK.IMEvents.OnBlackAdded, blackAddedHandler);
      IMSDK.subscribe(IMSDK.IMEvents.OnBlackDeleted, blackDeletedHandler);

      // group
      const joinedGroupAddedHandler = ({ data }) => {
        this.pushNewGroup(data);
      };
      const joinedGroupDeletedHandler = ({ data }) => {
        this.updateGroupInfo({
          groupInfo: data,
          isRemove: true,
        });
      };
      const groupInfoChangedHandler = ({ data }) => {
        this.updateGroupInfo({
          groupInfo: data,
        });
      };
      const groupMemberInfoChangedHandler = ({ data }) => {
        if (data.groupID === this.storeCurrentConversation?.groupID) {
          this.updateMessageNicknameAndFaceUrl({
            sendID: data.userID,
            senderNickname: data.nickname,
            senderFaceUrl: data.faceURL,
          });
          this.updateCurrentMemberInGroup(data);
        }
      };

      IMSDK.subscribe(
        IMSDK.IMEvents.OnJoinedGroupAdded,
        joinedGroupAddedHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnJoinedGroupDeleted,
        joinedGroupDeletedHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnGroupInfoChanged,
        groupInfoChangedHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnGroupMemberInfoChanged,
        groupMemberInfoChangedHandler,
      );

      // application
      const friendApplicationNumHandler = ({ data }) => {
        const isRecv = data.toUserID === this.storeCurrentUserID;
        if (isRecv) {
          this.pushNewRecvFriendApplition(data);
        } else {
          this.pushNewSentFriendApplition(data);
        }
      };
      const friendApplicationAccessHandler = ({ data }) => {
        const isRecv = data.toUserID === this.storeCurrentUserID;
        if (isRecv) {
          this.updateRecvFriendApplition({
            application: data,
          });
        } else {
          this.updateSentFriendApplition({
            application: data,
          });
        }
      };
      const groupApplicationNumHandler = ({ data }) => {
        const isRecv = data.userID !== this.storeCurrentUserID;
        if (isRecv) {
          this.pushNewRecvGroupApplition(data);
        } else {
          this.pushNewSentGroupApplition(data);
        }
      };
      const groupApplicationAccessHandler = ({ data }) => {
        const isRecv = data.userID !== this.storeCurrentUserID;
        if (isRecv) {
          this.updateRecvGroupApplition({
            application: data,
          });
        } else {
          this.updateSentGroupApplition({
            application: data,
          });
        }
      };

      IMSDK.subscribe(
        IMSDK.IMEvents.OnFriendApplicationAdded,
        friendApplicationNumHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnFriendApplicationAccepted,
        friendApplicationAccessHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnFriendApplicationRejected,
        friendApplicationAccessHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnGroupApplicationAdded,
        groupApplicationNumHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnGroupApplicationAccepted,
        groupApplicationAccessHandler,
      );
      IMSDK.subscribe(
        IMSDK.IMEvents.OnGroupApplicationRejected,
        groupApplicationAccessHandler,
      );

      // conversation
      const totalUnreadCountChangedHandler = ({ data }) => {
        if (this.storeIsSyncing) {
          return;
        }
        this.$store.commit("conversation/SET_UNREAD_COUNT", data);
      };
      const newConversationHandler = ({ data }) => {
        if (this.storeIsSyncing) {
          return;
        }
        const result = [...data, ...this.storeConversationList];
        this.$store.commit(
          "conversation/SET_CONVERSATION_LIST",
          conversationSort(result),
        );
      };
      const conversationChangedHandler = ({ data }) => {
        if (this.storeIsSyncing) {
          return;
        }
        let filterArr = [];
        console.log(data);
        const chids = data.map((ch) => ch.conversationID);
        filterArr = this.storeConversationList.filter(
          (tc) => !chids.includes(tc.conversationID),
        );
        const idx = data.findIndex(
          (c) =>
            c.conversationID === this.storeCurrentConversation.conversationID,
        );
        if (idx !== -1)
          this.$store.commit(
            "conversation/SET_CURRENT_CONVERSATION",
            data[idx],
          );
        const result = [...data, ...filterArr];
        this.$store.commit(
          "conversation/SET_CONVERSATION_LIST",
          conversationSort(result),
        );
      };

      IMSDK.subscribe(
        IMSDK.IMEvents.OnTotalUnreadMessageCountChanged,
        totalUnreadCountChangedHandler,
      );
      IMSDK.subscribe(IMSDK.IMEvents.OnNewConversation, newConversationHandler);
      IMSDK.subscribe(
        IMSDK.IMEvents.OnConversationChanged,
        conversationChangedHandler,
      );
    },

    setPageListener() {
      uni.$on(PageEvents.CheckForUpdate, this.checkVersion);
    },
    tryLogin() {
      const initStore = () => {
        this.$store.dispatch("user/getSelfInfo");
        this.$store.dispatch("conversation/getConversationList");
        this.$store.dispatch("conversation/getUnReadCount");
        this.$store.dispatch("contact/getFriendList");
        this.$store.dispatch("contact/getGrouplist");
        this.$store.dispatch("contact/getBlacklist");
        this.$store.dispatch("contact/getRecvFriendApplications");
        this.$store.dispatch("contact/getSentFriendApplications");
        this.$store.dispatch("contact/getRecvGroupApplications");
        this.$store.dispatch("contact/getSentGroupApplications");
        uni.switchTab({
          url: "/pages/conversation/conversationList/index?isRedirect=true",
        });
      };
      let platformID;
      // #ifdef H5
      platformID = 5
      // #endif
      // #ifdef MP-WEIXIN
      platformID = 6
      // #endif
			// #ifdef H5 || MP-WEIXIN
			const IMToken = uni.getStorageSync("IMToken");
			const IMUserID = uni.getStorageSync("IMUserID");
			 if (IMToken && IMUserID) {
				IMSDK.asyncApi(IMSDK.IMMethods.Login, IMSDK.uuid(), {
					userID: IMUserID,
					token: IMToken,
					platformID,
					wsAddr: config.getWsUrl(),
					apiAddr: config.getApiUrl(),
				})
					.then((res) => {
						initStore()
						console.log("success", res);
					})
					.catch((err) => {
						console.log("error", err);
						uni.removeStorage({
							key: "IMToken",
						});
						uni.removeStorage({
							key: "BusinessToken",
						});
					});
			}
			// #endif
			// #ifdef APP-PLUS
      getDbDir()
        .then(async (path) => {
          const flag = await IMSDK.asyncApi(IMMethods.InitSDK, IMSDK.uuid(), {
            platformID: uni.$u.os() === "ios" ? 1 : 2,
            apiAddr: config.getApiUrl(),
            wsAddr: config.getWsUrl(),
            dataDir: path, // 数据存储路径
            logLevel: 6,
            logFilePath: path,
            isLogStandardOutput: true,
            isExternalExtensions: false,
          });
          if (!flag) {
            plus.navigator.closeSplashscreen();
            uni.$u.toast("初始化IMSDK失败！");
            return;
          }
          const status = await IMSDK.asyncApi(
            IMSDK.IMMethods.GetLoginStatus,
            IMSDK.uuid(),
          );
          if (status === 3) {
            initStore();
            return;
          }

          const IMToken = uni.getStorageSync("IMToken");
          const IMUserID = uni.getStorageSync("IMUserID");
          if (IMToken && IMUserID) {
            IMSDK.asyncApi(IMSDK.IMMethods.Login, IMSDK.uuid(), {
              userID: IMUserID,
              token: IMToken,
            })
              .then(initStore)
              .catch((err) => {
                console.log(err);
                uni.removeStorage({
                  key: "IMToken",
                });
                uni.removeStorage({
                  key: "BusinessToken",
                });
                plus.navigator.closeSplashscreen();
              });
          } else {
            plus.navigator.closeSplashscreen();
          }
        })
        .catch((err) => {
          console.log("get dir failed", err);
          plus.navigator.closeSplashscreen();
        });
				// #endif
    },

    launchCheck() {
      // #ifdef APP-PLUS
      plus.globalEvent.addEventListener("newintent", (e) => {
        console.log(plus.runtime.arguments);
		  floatWin.hide()
        let launchData = {};
        try {
          launchData = JSON.parse(plus.runtime.arguments);
        } catch (e) {}
        switch (launchData.type) {
          case "updateDownloadFinish":
            break;
          case "updateProgress":
            if (pausing) return;

            if (updateDownloadTask?.state === 5) {
              updateDownloadTask?.resume();
            } else {
              updateDownloadTask?.pause();
              this.updateNotification("暂停中");
              pausing = true;
            }
            break;
          default:
            break;
        }
      });
      // #endif
    },
    checkVersion(initiative = false) {
      if (uni.$u.os() === "ios") {
        return;
      }
      // #ifdef APP-PLUS
      plus.runtime.getProperty(plus.runtime.appid, ({ version }) => {
        checkUpdateFormPgyer(version)
          .then(
            async ({
              buildHaveNewVersion,
              needForceUpdate,
              downloadURL,
              buildUpdateDescription,
              buildVersion,
            }) => {
              if (buildHaveNewVersion) {
                const hasDownloadedPath =
                  await this.checkDownloadedPkg(buildVersion);
                uni.showModal({
                  title: "检测到新版本",
                  content: hasDownloadedPath
                    ? "新版本已下载完毕，是否立即更新？"
                    : buildUpdateDescription || "",
                  showCancel: !needForceUpdate,
                  confirmText: hasDownloadedPath ? "立即更新" : "立即升级",
                  cancelText: "下次再说",
                  success: (res) => {
                    if (res.confirm) {
                      if (hasDownloadedPath) {
                        plus.runtime.install(hasDownloadedPath);
                      } else {
                        this.downloadApk(downloadURL, buildVersion);
                      }
                    } else {
                      if (needForceUpdate) {
                        plus.runtime.quit();
                      }
                    }
                  },
                });
              }

              if (initiative && !buildHaveNewVersion) {
                uni.$u.toast("当前已是最新版本！");
              }
            },
          )
          .catch((err) => {
            console.log(err);
            if (initiative) {
              uni.$u.toast("获取版本信息失败！");
            }
          })
          .finally(
            () => initiative && uni.$emit(PageEvents.CheckForUpdateResp),
          );
      });
      // #endif
    },
    async checkDownloadedPkg(buildVersion) {
      const versionMap = uni.getStorageSync("IMVersionMap") || {};
      const filePath = versionMap[buildVersion];
      const [err] = await uni.getSavedFileInfo({
        filePath,
      });
      return err ? "" : filePath;
    },
    downloadApk(downloadURL, buildVersion) {
      notificationIntance = new NotificationUtil();
      updateDownloadTask = plus.downloader.createDownload(downloadURL);

      updateDownloadTask.addEventListener("statechanged", (task, status) => {
        if (task.state === 3) {
          uni.$u.throttle(() => this.updateNotification("正在下载..."), 1000);
        }

        if (task.state === 5) {
          this.updateNotification("已暂停", true);
          pausing = false;
        }

        if (task.state === 4) {
          if (status === 200) {
            this.updateNotification("正在下载...");
            setTimeout(() => this.downloadFinish(buildVersion), 200);
          }
        }
      });
      updateDownloadTask.start();
    },
    updateNotification(content, isPause = false) {
      const progress = parseInt(
        (updateDownloadTask.downloadedSize / updateDownloadTask.totalSize) *
          100,
      );
      const config = {
        progress,
        isPause,
        title: "KeChat",
        content: `${content}${progress}%`,
        intentList: [["type", "updateProgress"]],
      };
      notificationIntance.createProgress(config);
    },
    downloadFinish(buildVersion) {
      notificationIntance.clearNotification(1000);
      notificationIntance.compProgressNotification({
        title: "KeChat",
        content: "下载完成",
        notifyId: 1001,
      });
      uni.showModal({
        title: "准备更新",
        content: "安装包已下载完毕，是否立即更新？",
        showCancel: false,
        confirmText: "立即更新",
        success: (res) => {
          const pkgPath = plus.io.convertLocalFileSystemURL(
            updateDownloadTask.filename,
          );
          if (res.confirm) {
            plus.runtime.install(pkgPath);
          } else {
            const versionMap = uni.getStorageSync("IMVersionMap") || {};
            versionMap[buildVersion] = pkgPath;
            uni.setStorage({
              key: "IMVersionMap",
              data: versionMap,
            });
          }
        },
      });
    },

    async newMessageNotify(newServerMsg) {
      if (this.storeIsSyncing) {
        return;
      }

      const disableNotify = uni.getStorageSync(
        `${this.storeCurrentUserID}_DisableNotify`,
      );
      if (
        disableNotify ||
        this.storeSelfInfo.globalRecvMsgOpt !== MessageReceiveOptType.Nomal
      ) {
        return;
      }

      let cveItem = [
        ...this.storeConversationList,
        ...cacheConversationList,
      ].find((conversation) => {
        if (newServerMsg.sessionType === SessionType.WorkingGroup) {
          return newServerMsg.groupID === conversation.groupID;
        }
        return newServerMsg.sendID === conversation.userID;
      });

      if (!cveItem) {
        try {
          const { data } = await IMSDK.asyncApi(
            IMSDK.IMMethods.GetOneConversation,
            IMSDK.uuid(),
            {
              sourceID: newServerMsg.groupID || newServerMsg.sendID,
              sessionType: newServerMsg.sessionType,
            },
          );
          cveItem = data;
          cacheConversationList = [...cacheConversationList, data];
        } catch (e) {
          return;
        }
      }

      if (cveItem.recvMsgOpt !== MessageReceiveOptType.Nomal) {
        return;
      }

      // uni.createPushMessage({
      // 	content: `${newServerMsg.senderNickname}: ${parseMessageByType(newServerMsg)}`,
      // 	payload: {
      // 		sessionType: newServerMsg.sessionType,
      // 		sourceID: newServerMsg.groupID || newServerMsg.sendID,
      // 	}
      // })
    },
    async handleNewMessage(newServerMsg) {
		// 自定义消息
		console.log('新消息')
	  if(newServerMsg.contentType == 110){
		  let customData = JSON.parse(newServerMsg.customElem.data);
		  customData.avatar = newServerMsg.senderFaceUrl;
		  customData.userName = newServerMsg.senderNickname;
		  customData.sendID = newServerMsg.sendID;
		  uni.setStorageSync('videoToken',customData.token ) //
		  // uni.setStorageSync('videoUser',customData.inviterUserID ) 
		  
		  if(customData.customType == CustomType.CallingInvite){
			 uni.vibrateLong();
			 
			
			  uni.navigateTo({
				  url: '/pages/conversation/chating/receive?data=' + encodeURIComponent(JSON.stringify(customData))
			  })
		  }else {
			  console.log('call' + customData.customType)
			  uni.$emit('call' + customData.customType)
		  }
		 
		  if(customData.customType == CustomType.CallingReject ||
		  	customData.customType == CustomType.CallingCancel ||
		  	customData.customType == CustomType.CallingHungup
		  ){
		  	 this.pushNewMessage(newServerMsg)
		  }
		  return;
	  }
	  
      if (this.inCurrentConversation(newServerMsg)) {
        const isSingleMessage = newServerMsg.sessionType === SessionType.Single;

        if (isSingleMessage) {
          uni.$u.throttle(() => uni.$emit(PageEvents.OnlineStateCheck), 2000);
        }
		

        if (newServerMsg.contentType === MessageType.TypingMessage) {
          if (isSingleMessage) {
            uni.$emit(PageEvents.TypingUpdate);
          }
        } else {
          if (newServerMsg.contentType === MessageType.RevokeMessage) {
          } else {
            newServerMsg.isAppend = true;
			let noticedata = notify;
			 noticedata.content = newServerMsg.senderNickname+ '发来一条新消息'
			 syczuanNotice.send(
			 		notify
			 	   ,
			 		(e) => {
			 		  console.log('',e);
			 		}
			 );
            this.pushNewMessage(newServerMsg);
            setTimeout(() => uni.$emit(PageEvents.ScrollToBottom, true));
          }
          uni.$u.debounce(this.markConversationAsRead, 2000);
        }
      } else {
        if (newServerMsg.contentType !== MessageType.TypingMessage) {
			uni.vibrateLong();
			uni.createPushMessage({
				content: `${newServerMsg.senderNickname}: 新消息`,
				payload: {
					sessionType: newServerMsg.sessionType,
					sourceID: newServerMsg.groupID || newServerMsg.sendID,
				}
			})
          uni.$u.throttle(() => this.newMessageNotify(newServerMsg), 1000);
        }
      }
    },
    inCurrentConversation(newServerMsg) {
      switch (newServerMsg.sessionType) {
        case SessionType.Single:
          return (
            newServerMsg.sendID === this.storeCurrentConversation.userID ||
            (newServerMsg.sendID === this.storeCurrentUserID &&
              newServerMsg.recvID === this.storeCurrentConversation.userID)
          );
        case SessionType.WorkingGroup:
          return newServerMsg.groupID === this.storeCurrentConversation.groupID;
        case SessionType.Notification:
          return newServerMsg.sendID === this.storeCurrentConversation.userID;
        default:
          return false;
      }
    },
    markConversationAsRead() {
      IMSDK.asyncApi(
        IMSDK.IMMethods.MarkConversationMessageAsRead,
        IMSDK.uuid(),
        this.storeCurrentConversation.conversationID,
      );
    },
  },
  watch: {
    storeCurrentUserID(newVal) {
      if (newVal) {
        cacheConversationList = [];
      }
    },
    contactBadgeRely: {
      handler(newValue) {
        const { recvFriendApplications, recvGroupApplications, userKey } =
          newValue;
        if (!userKey) return;
        const accessedFriendApplications =
          uni.getStorageSync(`${userKey}_accessedFriendApplications`) || [];
        let unHandleFriendApplicationNum = recvFriendApplications.filter(
          (application) =>
            application.handleResult === 0 &&
            !accessedFriendApplications.includes(
              `${application.fromUserID}_${application.createTime}`,
            ),
        ).length;
        const accessedGroupApplications =
          uni.getStorageSync(`${userKey}_accessedGroupApplications`) || [];
        let unHandleGroupApplicationNum = recvGroupApplications.filter(
          (application) =>
            application.handleResult === 0 &&
            !accessedGroupApplications.includes(
              `${application.userID}_${application.createTime}`,
            ),
        ).length;
        const total =
          unHandleFriendApplicationNum + unHandleGroupApplicationNum;
        if (total) {
          uni.setTabBarBadge({
            index: 1,
            text: total < 99 ? total + "" : "99+",
          });
        } else {
          uni.removeTabBarBadge({
            index: 1,
          });
        }
        this.$store.commit(
          "contact/SET_UNHANDLE_FRIEND_APPLICATION_NUM",
          unHandleFriendApplicationNum,
        );
        this.$store.commit(
          "contact/SET_UNHANDLE_GROUP_APPLICATION_NUM",
          unHandleGroupApplicationNum,
        );
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uview-ui/index.scss";
@import "@/styles/login.scss";
@import "@/styles/global.scss";

uni-page-body {
  height: 100vh;
  overflow: hidden;
}

.uni-tabbar .uni-tabbar__icon {
  width: 28px !important;
  height: 28px !important;
}
</style>
