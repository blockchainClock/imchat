// // import { SessionType } from 'open-im-sdk-wasm'
// import { InviteData } from './data'
// // import type { GroupMemberItem } from 'open-im-sdk-wasm/lib/types/entity'
// // import useUserStore from '@/store/modules/user'
// import IMSDK, {
//   GroupStatus,
//   IMMethods,
//   SessionType,
//   MessageStatus,
//   GroupMemberItem
// } from "openim-uniapp-polyfill";
// import { ComputedRef, Ref, computed, onUnmounted, ref, watch } from 'vue'
// import store from "@/store";
// export default function useInviteData(inviteData: InviteData) {
//   const userStore = store.getters.storeSelfInfo;

//   const groupID = computed(() => inviteData?.invitation?.groupID ?? '')
//   const isVideo = computed(() => inviteData?.invitation?.mediaType === 'video')
//   const isGroup = computed(
//     () => inviteData.invitation?.sessionType !== SessionType.Single,
//   )
//   const inviteeUserIDList = computed(
//     () => inviteData?.invitation?.inviteeUserIDList ?? [],
//   )
//   const isRecv = computed(
//     () => userStore.selfInfo.userID !== inviteData.invitation?.inviterUserID,
//   )
//   const memberInfo = computed(
//     () => inviteData?.participant?.groupMemberInfo ?? ({} as GroupMemberItem),
//   )

//   return {
//     isRecv,
//     groupID,
//     isVideo,
//     isGroup,
//     inviteeUserIDList,
//     memberInfo,
//   }
// }
