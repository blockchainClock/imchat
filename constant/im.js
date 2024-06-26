import { MessageType } from "openim-uniapp-polyfill";

export const CustomType = {
  VideoCall: "c100",
  VoiceCall: "c101",
  Call: 901,
  MassMsg: 903,
  CallingInvite: 200,
  CallingAccept: 201,
  CallingReject: 202,
  CallingCancel: 203,
  CallingHungup: 204
};

export const SendMessageFailedType = {
  Unknown: 302,
 // Blacked: 600,
  Blacked: 1302,
  NotFriend: 601,
};

export const Platform = {
  1: 'iOS',
  2: 'Android',
  3: 'PC',
  4: 'PC',
  5: 'Web'
};

export const noticeMessageTypes = [
  MessageType.RevokeMessage,
  MessageType.FriendAdded,
  MessageType.GroupCreated,
  MessageType.GroupInfoUpdated,
  MessageType.MemberQuit,
  MessageType.GroupOwnerTransferred,
  MessageType.MemberKicked,
  MessageType.MemberInvited,
  MessageType.MemberEnter,
  MessageType.GroupDismissed,
  MessageType.GroupMemberMuted,
  MessageType.GroupMuted,
  MessageType.GroupCancelMuted,
  MessageType.GroupMemberCancelMuted,
  MessageType.GroupNameUpdated,
  MessageType.BurnMessageChange,
];
