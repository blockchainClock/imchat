export default {
  storeConversationList: (state) => state.conversation.conversationList,
  storeCurrentConversation: (state) => state.conversation.currentConversation,
  storeUnReadCount: (state) => state.conversation.unReadCount,
  storeCurrentGroup: (state) => state.conversation.currentGroup,
  storeCurrentMemberInGroup: (state) => state.conversation.currentMemberInGroup,
  storeFriendList: (state) => state.contact.friendList,
  storeBlackList: (state) => state.contact.blackList,
  storeGroupList: (state) => state.contact.groupList,
  storeRecvFriendApplications: (state) => state.contact.recvFriendApplications,
  storeSentFriendApplications: (state) => state.contact.sentFriendApplications,
  storeRecvGroupApplications: (state) => state.contact.recvGroupApplications,
  storeSentGroupApplications: (state) => state.contact.sentGroupApplications,
  storeUnHandleFriendApplicationNum: (state) =>
    state.contact.unHandleFriendApplicationNum,
  storeUnHandleGroupApplicationNum: (state) =>
    state.contact.unHandleGroupApplicationNum,
  storeHistoryMessageList: (state) => state.message.historyMessageList,
  storePreviewImageList: (state) => state.message.previewImageList,
  storeHasMoreMessage: (state) => state.message.hasMoreMessage,
  storeQuoteMessage: (state) => state.message.quoteMessage,
  storeSelfInfo: (state) => state.user.selfInfo,
  storeCurrentUserID: (state) => state.user.selfInfo.userID,
  storeAppConfig: (state) => state.user.appConfig,
  storeIsSyncing: (state) => state.user.isSyncing,
  storeAuthData: (state) => state.user.authData,
  storeRootFontSize: (state) => state.user.rootFontSize
};
