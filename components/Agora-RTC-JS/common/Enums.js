"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoiceConversionPreset = exports.ExperiencePoorReason = exports.ExperienceQualityType = exports.CloudProxyType = exports.UploadErrorReason = exports.SuperResolutionStateReason = exports.CaptureBrightnessLevelType = exports.LogLevel = exports.AudienceLatencyLevelType = exports.VoiceBeautifierPreset = exports.AudioEffectPreset = exports.AudioSessionOperationRestriction = exports.RtmpStreamingEvent = exports.StreamSubscribeState = exports.StreamPublishState = exports.VideoCodecType = exports.AudioChannel = exports.WarningCode = exports.VideoStreamType = exports.VideoRenderMode = exports.VideoRemoteStateReason = exports.VideoRemoteState = exports.VideoQualityAdaptIndication = exports.VideoOutputOrientationMode = exports.VideoMirrorMode = exports.BitRate = exports.VideoFrameRate = exports.VideoCodecProfileType = exports.UserPriority = exports.UserOfflineReason = exports.StreamFallbackOptions = exports.RtmpStreamingState = exports.RtmpStreamingErrorCode = exports.NetworkType = exports.NetworkQuality = exports.LogFilter = exports.LocalVideoStreamState = exports.LocalVideoStreamError = exports.LighteningContrastLevel = exports.LastmileProbeResultState = exports.InjectStreamStatus = exports.ErrorCode = exports.EncryptionMode = exports.DegradationPreference = exports.ConnectionStateType = exports.ConnectionChangedReason = exports.ClientRole = exports.ChannelProfile = exports.ChannelMediaRelayState = exports.ChannelMediaRelayEvent = exports.ChannelMediaRelayError = exports.CameraDirection = exports.CameraCaptureOutputPreference = exports.AudioVoiceChanger = exports.AudioScenario = exports.AudioSampleRateType = exports.AudioReverbType = exports.AudioReverbPreset = exports.AudioRemoteStateReason = exports.AudioRemoteState = exports.AudioRecordingPosition = exports.AudioRecordingQuality = exports.AudioProfile = exports.AudioOutputRouting = exports.AudioMixingStateCode = exports.AudioMixingReason = exports.AudioLocalState = exports.AudioLocalError = exports.AudioEqualizationBandFrequency = exports.AudioCodecProfileType = exports.AreaCode = void 0;


let AreaCode;


exports.AreaCode = AreaCode;

(function (AreaCode) {
  AreaCode[AreaCode["CN"] = 1] = "CN";
  AreaCode[AreaCode["NA"] = 2] = "NA";
  AreaCode[AreaCode["EU"] = 4] = "EU";
  AreaCode[AreaCode["AS"] = 8] = "AS";
  AreaCode[AreaCode["JP"] = 16] = "JP";
  AreaCode[AreaCode["IN"] = 32] = "IN";
  AreaCode[AreaCode["GLOB"] = -1] = "GLOB";
})(AreaCode || (exports.AreaCode = AreaCode = {}));

let AudioCodecProfileType;


exports.AudioCodecProfileType = AudioCodecProfileType;

(function (AudioCodecProfileType) {
  AudioCodecProfileType[AudioCodecProfileType["LCAAC"] = 0] = "LCAAC";
  AudioCodecProfileType[AudioCodecProfileType["HEAAC"] = 1] = "HEAAC";
})(AudioCodecProfileType || (exports.AudioCodecProfileType = AudioCodecProfileType = {}));

let AudioEqualizationBandFrequency;


exports.AudioEqualizationBandFrequency = AudioEqualizationBandFrequency;

(function (AudioEqualizationBandFrequency) {
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band31"] = 0] = "Band31";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band62"] = 1] = "Band62";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band125"] = 2] = "Band125";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band250"] = 3] = "Band250";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band500"] = 4] = "Band500";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band1K"] = 5] = "Band1K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band2K"] = 6] = "Band2K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band4K"] = 7] = "Band4K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band8K"] = 8] = "Band8K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band16K"] = 9] = "Band16K";
})(AudioEqualizationBandFrequency || (exports.AudioEqualizationBandFrequency = AudioEqualizationBandFrequency = {}));

let AudioLocalError;


exports.AudioLocalError = AudioLocalError;

(function (AudioLocalError) {
  AudioLocalError[AudioLocalError["Ok"] = 0] = "Ok";
  AudioLocalError[AudioLocalError["Failure"] = 1] = "Failure";
  AudioLocalError[AudioLocalError["DeviceNoPermission"] = 2] = "DeviceNoPermission";
  AudioLocalError[AudioLocalError["DeviceBusy"] = 3] = "DeviceBusy";
  AudioLocalError[AudioLocalError["RecordFailure"] = 4] = "RecordFailure";
  AudioLocalError[AudioLocalError["EncodeFailure"] = 5] = "EncodeFailure";
  AudioLocalError[AudioLocalError["Interrupted"] = 8] = "Interrupted";
})(AudioLocalError || (exports.AudioLocalError = AudioLocalError = {}));

let AudioLocalState;


exports.AudioLocalState = AudioLocalState;

(function (AudioLocalState) {
  AudioLocalState[AudioLocalState["Stopped"] = 0] = "Stopped";
  AudioLocalState[AudioLocalState["Recording"] = 1] = "Recording";
  AudioLocalState[AudioLocalState["Encoding"] = 2] = "Encoding";
  AudioLocalState[AudioLocalState["Failed"] = 3] = "Failed";
})(AudioLocalState || (exports.AudioLocalState = AudioLocalState = {}));

let AudioMixingReason;


exports.AudioMixingReason = AudioMixingReason;

(function (AudioMixingReason) {
  AudioMixingReason[AudioMixingReason["CanNotOpen"] = 701] = "CanNotOpen";
  AudioMixingReason[AudioMixingReason["TooFrequentCall"] = 702] = "TooFrequentCall";
  AudioMixingReason[AudioMixingReason["InterruptedEOF"] = 703] = "InterruptedEOF";
  AudioMixingReason[AudioMixingReason["StartedByUser"] = 720] = "StartedByUser";
  AudioMixingReason[AudioMixingReason["OneLoopCompleted"] = 721] = "OneLoopCompleted";
  AudioMixingReason[AudioMixingReason["StartNewLoop"] = 722] = "StartNewLoop";
  AudioMixingReason[AudioMixingReason["AllLoopsCompleted"] = 723] = "AllLoopsCompleted";
  AudioMixingReason[AudioMixingReason["StoppedByUser"] = 724] = "StoppedByUser";
  AudioMixingReason[AudioMixingReason["PausedByUser"] = 725] = "PausedByUser";
  AudioMixingReason[AudioMixingReason["ResumedByUser"] = 726] = "ResumedByUser";
  AudioMixingReason[AudioMixingReason["OK"] = 0] = "OK";
})(AudioMixingReason || (exports.AudioMixingReason = AudioMixingReason = {}));

let AudioMixingStateCode;


exports.AudioMixingStateCode = AudioMixingStateCode;

(function (AudioMixingStateCode) {
  AudioMixingStateCode[AudioMixingStateCode["Playing"] = 710] = "Playing";
  AudioMixingStateCode[AudioMixingStateCode["Paused"] = 711] = "Paused";
  AudioMixingStateCode[AudioMixingStateCode["Restart"] = 712] = "Restart";
  AudioMixingStateCode[AudioMixingStateCode["Stopped"] = 713] = "Stopped";
  AudioMixingStateCode[AudioMixingStateCode["Failed"] = 714] = "Failed";
})(AudioMixingStateCode || (exports.AudioMixingStateCode = AudioMixingStateCode = {}));

let AudioOutputRouting;


exports.AudioOutputRouting = AudioOutputRouting;

(function (AudioOutputRouting) {
  AudioOutputRouting[AudioOutputRouting["Default"] = -1] = "Default";
  AudioOutputRouting[AudioOutputRouting["Headset"] = 0] = "Headset";
  AudioOutputRouting[AudioOutputRouting["Earpiece"] = 1] = "Earpiece";
  AudioOutputRouting[AudioOutputRouting["HeadsetNoMic"] = 2] = "HeadsetNoMic";
  AudioOutputRouting[AudioOutputRouting["Speakerphone"] = 3] = "Speakerphone";
  AudioOutputRouting[AudioOutputRouting["Loudspeaker"] = 4] = "Loudspeaker";
  AudioOutputRouting[AudioOutputRouting["HeadsetBluetooth"] = 5] = "HeadsetBluetooth";
})(AudioOutputRouting || (exports.AudioOutputRouting = AudioOutputRouting = {}));

let AudioProfile;


exports.AudioProfile = AudioProfile;

(function (AudioProfile) {
  AudioProfile[AudioProfile["Default"] = 0] = "Default";
  AudioProfile[AudioProfile["SpeechStandard"] = 1] = "SpeechStandard";
  AudioProfile[AudioProfile["MusicStandard"] = 2] = "MusicStandard";
  AudioProfile[AudioProfile["MusicStandardStereo"] = 3] = "MusicStandardStereo";
  AudioProfile[AudioProfile["MusicHighQuality"] = 4] = "MusicHighQuality";
  AudioProfile[AudioProfile["MusicHighQualityStereo"] = 5] = "MusicHighQualityStereo";
})(AudioProfile || (exports.AudioProfile = AudioProfile = {}));

let AudioRecordingQuality;


exports.AudioRecordingQuality = AudioRecordingQuality;

(function (AudioRecordingQuality) {
  AudioRecordingQuality[AudioRecordingQuality["Low"] = 0] = "Low";
  AudioRecordingQuality[AudioRecordingQuality["Medium"] = 1] = "Medium";
  AudioRecordingQuality[AudioRecordingQuality["High"] = 2] = "High";
})(AudioRecordingQuality || (exports.AudioRecordingQuality = AudioRecordingQuality = {}));

let AudioRecordingPosition;


exports.AudioRecordingPosition = AudioRecordingPosition;

(function (AudioRecordingPosition) {
  AudioRecordingPosition[AudioRecordingPosition["PositionMixedRecordingAndPlayback"] = 0] = "PositionMixedRecordingAndPlayback";
  AudioRecordingPosition[AudioRecordingPosition["PositionRecording"] = 1] = "PositionRecording";
  AudioRecordingPosition[AudioRecordingPosition["PositionMixedPlayback"] = 2] = "PositionMixedPlayback";
})(AudioRecordingPosition || (exports.AudioRecordingPosition = AudioRecordingPosition = {}));

let AudioRemoteState;


exports.AudioRemoteState = AudioRemoteState;

(function (AudioRemoteState) {
  AudioRemoteState[AudioRemoteState["Stopped"] = 0] = "Stopped";
  AudioRemoteState[AudioRemoteState["Starting"] = 1] = "Starting";
  AudioRemoteState[AudioRemoteState["Decoding"] = 2] = "Decoding";
  AudioRemoteState[AudioRemoteState["Frozen"] = 3] = "Frozen";
  AudioRemoteState[AudioRemoteState["Failed"] = 4] = "Failed";
})(AudioRemoteState || (exports.AudioRemoteState = AudioRemoteState = {}));

let AudioRemoteStateReason;


exports.AudioRemoteStateReason = AudioRemoteStateReason;

(function (AudioRemoteStateReason) {
  AudioRemoteStateReason[AudioRemoteStateReason["Internal"] = 0] = "Internal";
  AudioRemoteStateReason[AudioRemoteStateReason["NetworkCongestion"] = 1] = "NetworkCongestion";
  AudioRemoteStateReason[AudioRemoteStateReason["NetworkRecovery"] = 2] = "NetworkRecovery";
  AudioRemoteStateReason[AudioRemoteStateReason["LocalMuted"] = 3] = "LocalMuted";
  AudioRemoteStateReason[AudioRemoteStateReason["LocalUnmuted"] = 4] = "LocalUnmuted";
  AudioRemoteStateReason[AudioRemoteStateReason["RemoteMuted"] = 5] = "RemoteMuted";
  AudioRemoteStateReason[AudioRemoteStateReason["RemoteUnmuted"] = 6] = "RemoteUnmuted";
  AudioRemoteStateReason[AudioRemoteStateReason["RemoteOffline"] = 7] = "RemoteOffline";
})(AudioRemoteStateReason || (exports.AudioRemoteStateReason = AudioRemoteStateReason = {}));

let AudioReverbPreset;


exports.AudioReverbPreset = AudioReverbPreset;

(function (AudioReverbPreset) {
  AudioReverbPreset[AudioReverbPreset["Off"] = 0] = "Off";
  AudioReverbPreset[AudioReverbPreset["Popular"] = 1] = "Popular";
  AudioReverbPreset[AudioReverbPreset["RnB"] = 2] = "RnB";
  AudioReverbPreset[AudioReverbPreset["Rock"] = 3] = "Rock";
  AudioReverbPreset[AudioReverbPreset["HipHop"] = 4] = "HipHop";
  AudioReverbPreset[AudioReverbPreset["VocalConcert"] = 5] = "VocalConcert";
  AudioReverbPreset[AudioReverbPreset["KTV"] = 6] = "KTV";
  AudioReverbPreset[AudioReverbPreset["Studio"] = 7] = "Studio";
  AudioReverbPreset[AudioReverbPreset["FX_KTV"] = 1048577] = "FX_KTV";
  AudioReverbPreset[AudioReverbPreset["FX_VOCAL_CONCERT"] = 1048578] = "FX_VOCAL_CONCERT";
  AudioReverbPreset[AudioReverbPreset["FX_UNCLE"] = 1048579] = "FX_UNCLE";
  AudioReverbPreset[AudioReverbPreset["FX_SISTER"] = 1048580] = "FX_SISTER";
  AudioReverbPreset[AudioReverbPreset["FX_STUDIO"] = 1048581] = "FX_STUDIO";
  AudioReverbPreset[AudioReverbPreset["FX_POPULAR"] = 1048582] = "FX_POPULAR";
  AudioReverbPreset[AudioReverbPreset["FX_RNB"] = 1048583] = "FX_RNB";
  AudioReverbPreset[AudioReverbPreset["FX_PHONOGRAPH"] = 1048584] = "FX_PHONOGRAPH";
  AudioReverbPreset[AudioReverbPreset["VIRTUAL_STEREO"] = 2097153] = "VIRTUAL_STEREO";
})(AudioReverbPreset || (exports.AudioReverbPreset = AudioReverbPreset = {}));

let AudioReverbType;


exports.AudioReverbType = AudioReverbType;

(function (AudioReverbType) {
  AudioReverbType[AudioReverbType["DryLevel"] = 0] = "DryLevel";
  AudioReverbType[AudioReverbType["WetLevel"] = 1] = "WetLevel";
  AudioReverbType[AudioReverbType["RoomSize"] = 2] = "RoomSize";
  AudioReverbType[AudioReverbType["WetDelay"] = 3] = "WetDelay";
  AudioReverbType[AudioReverbType["Strength"] = 4] = "Strength";
})(AudioReverbType || (exports.AudioReverbType = AudioReverbType = {}));

let AudioSampleRateType;


exports.AudioSampleRateType = AudioSampleRateType;

(function (AudioSampleRateType) {
  AudioSampleRateType[AudioSampleRateType["Type32000"] = 32000] = "Type32000";
  AudioSampleRateType[AudioSampleRateType["Type44100"] = 44100] = "Type44100";
  AudioSampleRateType[AudioSampleRateType["Type48000"] = 48000] = "Type48000";
})(AudioSampleRateType || (exports.AudioSampleRateType = AudioSampleRateType = {}));

let AudioScenario;


exports.AudioScenario = AudioScenario;

(function (AudioScenario) {
  AudioScenario[AudioScenario["Default"] = 0] = "Default";
  AudioScenario[AudioScenario["ChatRoomEntertainment"] = 1] = "ChatRoomEntertainment";
  AudioScenario[AudioScenario["Education"] = 2] = "Education";
  AudioScenario[AudioScenario["GameStreaming"] = 3] = "GameStreaming";
  AudioScenario[AudioScenario["ShowRoom"] = 4] = "ShowRoom";
  AudioScenario[AudioScenario["ChatRoomGaming"] = 5] = "ChatRoomGaming";
  AudioScenario[AudioScenario["IOT"] = 6] = "IOT";
  AudioScenario[AudioScenario["MEETING"] = 8] = "MEETING";
})(AudioScenario || (exports.AudioScenario = AudioScenario = {}));

let AudioVoiceChanger;


exports.AudioVoiceChanger = AudioVoiceChanger;

(function (AudioVoiceChanger) {
  AudioVoiceChanger[AudioVoiceChanger["Off"] = 0] = "Off";
  AudioVoiceChanger[AudioVoiceChanger["OldMan"] = 1] = "OldMan";
  AudioVoiceChanger[AudioVoiceChanger["BabyBoy"] = 2] = "BabyBoy";
  AudioVoiceChanger[AudioVoiceChanger["BabyGirl"] = 3] = "BabyGirl";
  AudioVoiceChanger[AudioVoiceChanger["ZhuBaJie"] = 4] = "ZhuBaJie";
  AudioVoiceChanger[AudioVoiceChanger["Ethereal"] = 5] = "Ethereal";
  AudioVoiceChanger[AudioVoiceChanger["Hulk"] = 6] = "Hulk";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_VIGOROUS"] = 1048577] = "BEAUTY_VIGOROUS";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_DEEP"] = 1048578] = "BEAUTY_DEEP";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_MELLOW"] = 1048579] = "BEAUTY_MELLOW";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_FALSETTO"] = 1048580] = "BEAUTY_FALSETTO";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_FULL"] = 1048581] = "BEAUTY_FULL";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_CLEAR"] = 1048582] = "BEAUTY_CLEAR";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_RESOUNDING"] = 1048583] = "BEAUTY_RESOUNDING";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_RINGING"] = 1048584] = "BEAUTY_RINGING";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_SPACIAL"] = 1048585] = "BEAUTY_SPACIAL";
  AudioVoiceChanger[AudioVoiceChanger["GENERAL_BEAUTY_VOICE_MALE_MAGNETIC"] = 2097153] = "GENERAL_BEAUTY_VOICE_MALE_MAGNETIC";
  AudioVoiceChanger[AudioVoiceChanger["GENERAL_BEAUTY_VOICE_FEMALE_FRESH"] = 2097154] = "GENERAL_BEAUTY_VOICE_FEMALE_FRESH";
  AudioVoiceChanger[AudioVoiceChanger["GENERAL_BEAUTY_VOICE_FEMALE_VITALITY"] = 2097155] = "GENERAL_BEAUTY_VOICE_FEMALE_VITALITY";
})(AudioVoiceChanger || (exports.AudioVoiceChanger = AudioVoiceChanger = {}));

let CameraCaptureOutputPreference;


exports.CameraCaptureOutputPreference = CameraCaptureOutputPreference;

(function (CameraCaptureOutputPreference) {
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Auto"] = 0] = "Auto";
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Performance"] = 1] = "Performance";
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Preview"] = 2] = "Preview";
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Manual"] = 3] = "Manual";
})(CameraCaptureOutputPreference || (exports.CameraCaptureOutputPreference = CameraCaptureOutputPreference = {}));

let CameraDirection;


exports.CameraDirection = CameraDirection;

(function (CameraDirection) {
  CameraDirection[CameraDirection["Rear"] = 0] = "Rear";
  CameraDirection[CameraDirection["Front"] = 1] = "Front";
})(CameraDirection || (exports.CameraDirection = CameraDirection = {}));

let ChannelMediaRelayError;


exports.ChannelMediaRelayError = ChannelMediaRelayError;

(function (ChannelMediaRelayError) {
  ChannelMediaRelayError[ChannelMediaRelayError["None"] = 0] = "None";
  ChannelMediaRelayError[ChannelMediaRelayError["ServerErrorResponse"] = 1] = "ServerErrorResponse";
  ChannelMediaRelayError[ChannelMediaRelayError["ServerNoResponse"] = 2] = "ServerNoResponse";
  ChannelMediaRelayError[ChannelMediaRelayError["NoResourceAvailable"] = 3] = "NoResourceAvailable";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedJoinSourceChannel"] = 4] = "FailedJoinSourceChannel";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedJoinDestinationChannel"] = 5] = "FailedJoinDestinationChannel";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedPacketReceivedFromSource"] = 6] = "FailedPacketReceivedFromSource";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedPacketSentToDestination"] = 7] = "FailedPacketSentToDestination";
  ChannelMediaRelayError[ChannelMediaRelayError["ServerConnectionLost"] = 8] = "ServerConnectionLost";
  ChannelMediaRelayError[ChannelMediaRelayError["InternalError"] = 9] = "InternalError";
  ChannelMediaRelayError[ChannelMediaRelayError["SourceTokenExpired"] = 10] = "SourceTokenExpired";
  ChannelMediaRelayError[ChannelMediaRelayError["DestinationTokenExpired"] = 11] = "DestinationTokenExpired";
})(ChannelMediaRelayError || (exports.ChannelMediaRelayError = ChannelMediaRelayError = {}));

let ChannelMediaRelayEvent;


exports.ChannelMediaRelayEvent = ChannelMediaRelayEvent;

(function (ChannelMediaRelayEvent) {
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["Disconnect"] = 0] = "Disconnect";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["Connected"] = 1] = "Connected";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["JoinedSourceChannel"] = 2] = "JoinedSourceChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["JoinedDestinationChannel"] = 3] = "JoinedDestinationChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["SentToDestinationChannel"] = 4] = "SentToDestinationChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["ReceivedVideoPacketFromSource"] = 5] = "ReceivedVideoPacketFromSource";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["ReceivedAudioPacketFromSource"] = 6] = "ReceivedAudioPacketFromSource";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannel"] = 7] = "UpdateDestinationChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelRefused"] = 8] = "UpdateDestinationChannelRefused";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelNotChange"] = 9] = "UpdateDestinationChannelNotChange";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelIsNil"] = 10] = "UpdateDestinationChannelIsNil";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["VideoProfileUpdate"] = 11] = "VideoProfileUpdate";
})(ChannelMediaRelayEvent || (exports.ChannelMediaRelayEvent = ChannelMediaRelayEvent = {}));

let ChannelMediaRelayState;


exports.ChannelMediaRelayState = ChannelMediaRelayState;

(function (ChannelMediaRelayState) {
  ChannelMediaRelayState[ChannelMediaRelayState["Idle"] = 0] = "Idle";
  ChannelMediaRelayState[ChannelMediaRelayState["Connecting"] = 1] = "Connecting";
  ChannelMediaRelayState[ChannelMediaRelayState["Running"] = 2] = "Running";
  ChannelMediaRelayState[ChannelMediaRelayState["Failure"] = 3] = "Failure";
})(ChannelMediaRelayState || (exports.ChannelMediaRelayState = ChannelMediaRelayState = {}));

let ChannelProfile;


exports.ChannelProfile = ChannelProfile;

(function (ChannelProfile) {
  ChannelProfile[ChannelProfile["Communication"] = 0] = "Communication";
  ChannelProfile[ChannelProfile["LiveBroadcasting"] = 1] = "LiveBroadcasting";
  ChannelProfile[ChannelProfile["Game"] = 2] = "Game";
})(ChannelProfile || (exports.ChannelProfile = ChannelProfile = {}));

let ClientRole;


exports.ClientRole = ClientRole;

(function (ClientRole) {
  ClientRole[ClientRole["Broadcaster"] = 1] = "Broadcaster";
  ClientRole[ClientRole["Audience"] = 2] = "Audience";
})(ClientRole || (exports.ClientRole = ClientRole = {}));

let ConnectionChangedReason;


exports.ConnectionChangedReason = ConnectionChangedReason;

(function (ConnectionChangedReason) {
  ConnectionChangedReason[ConnectionChangedReason["Connecting"] = 0] = "Connecting";
  ConnectionChangedReason[ConnectionChangedReason["JoinSuccess"] = 1] = "JoinSuccess";
  ConnectionChangedReason[ConnectionChangedReason["Interrupted"] = 2] = "Interrupted";
  ConnectionChangedReason[ConnectionChangedReason["BannedByServer"] = 3] = "BannedByServer";
  ConnectionChangedReason[ConnectionChangedReason["JoinFailed"] = 4] = "JoinFailed";
  ConnectionChangedReason[ConnectionChangedReason["LeaveChannel"] = 5] = "LeaveChannel";
  ConnectionChangedReason[ConnectionChangedReason["InvalidAppId"] = 6] = "InvalidAppId";
  ConnectionChangedReason[ConnectionChangedReason["InvalidChannelName"] = 7] = "InvalidChannelName";
  ConnectionChangedReason[ConnectionChangedReason["InvalidToken"] = 8] = "InvalidToken";
  ConnectionChangedReason[ConnectionChangedReason["TokenExpired"] = 9] = "TokenExpired";
  ConnectionChangedReason[ConnectionChangedReason["RejectedByServer"] = 10] = "RejectedByServer";
  ConnectionChangedReason[ConnectionChangedReason["SettingProxyServer"] = 11] = "SettingProxyServer";
  ConnectionChangedReason[ConnectionChangedReason["RenewToken"] = 12] = "RenewToken";
  ConnectionChangedReason[ConnectionChangedReason["ClientIpAddressChanged"] = 13] = "ClientIpAddressChanged";
  ConnectionChangedReason[ConnectionChangedReason["KeepAliveTimeout"] = 14] = "KeepAliveTimeout";
  ConnectionChangedReason[ConnectionChangedReason["ProxyServerInterrupted"] = 15] = "ProxyServerInterrupted";
})(ConnectionChangedReason || (exports.ConnectionChangedReason = ConnectionChangedReason = {}));

let ConnectionStateType;


exports.ConnectionStateType = ConnectionStateType;

(function (ConnectionStateType) {
  ConnectionStateType[ConnectionStateType["Disconnected"] = 1] = "Disconnected";
  ConnectionStateType[ConnectionStateType["Connecting"] = 2] = "Connecting";
  ConnectionStateType[ConnectionStateType["Connected"] = 3] = "Connected";
  ConnectionStateType[ConnectionStateType["Reconnecting"] = 4] = "Reconnecting";
  ConnectionStateType[ConnectionStateType["Failed"] = 5] = "Failed";
})(ConnectionStateType || (exports.ConnectionStateType = ConnectionStateType = {}));

let DegradationPreference;


exports.DegradationPreference = DegradationPreference;

(function (DegradationPreference) {
  DegradationPreference[DegradationPreference["MaintainQuality"] = 0] = "MaintainQuality";
  DegradationPreference[DegradationPreference["MaintainFramerate"] = 1] = "MaintainFramerate";
  DegradationPreference[DegradationPreference["MaintainBalanced"] = 2] = "MaintainBalanced";
})(DegradationPreference || (exports.DegradationPreference = DegradationPreference = {}));

let EncryptionMode;


exports.EncryptionMode = EncryptionMode;

(function (EncryptionMode) {
  EncryptionMode[EncryptionMode["None"] = 0] = "None";
  EncryptionMode[EncryptionMode["AES128XTS"] = 1] = "AES128XTS";
  EncryptionMode[EncryptionMode["AES128ECB"] = 2] = "AES128ECB";
  EncryptionMode[EncryptionMode["AES256XTS"] = 3] = "AES256XTS";
  EncryptionMode[EncryptionMode["SM4128ECB"] = 4] = "SM4128ECB";
  EncryptionMode[EncryptionMode["AES128GCM"] = 5] = "AES128GCM";
  EncryptionMode[EncryptionMode["AES256GCM"] = 6] = "AES256GCM";
  EncryptionMode[EncryptionMode["AES128GCM2"] = 7] = "AES128GCM2";
  EncryptionMode[EncryptionMode["AES256GCM2"] = 8] = "AES256GCM2";
})(EncryptionMode || (exports.EncryptionMode = EncryptionMode = {}));

let ErrorCode;


exports.ErrorCode = ErrorCode;

(function (ErrorCode) {
  ErrorCode[ErrorCode["NoError"] = 0] = "NoError";
  ErrorCode[ErrorCode["Failed"] = 1] = "Failed";
  ErrorCode[ErrorCode["InvalidArgument"] = 2] = "InvalidArgument";
  ErrorCode[ErrorCode["NotReady"] = 3] = "NotReady";
  ErrorCode[ErrorCode["NotSupported"] = 4] = "NotSupported";
  ErrorCode[ErrorCode["Refused"] = 5] = "Refused";
  ErrorCode[ErrorCode["BufferTooSmall"] = 6] = "BufferTooSmall";
  ErrorCode[ErrorCode["NotInitialized"] = 7] = "NotInitialized";
  ErrorCode[ErrorCode["NoPermission"] = 9] = "NoPermission";
  ErrorCode[ErrorCode["TimedOut"] = 10] = "TimedOut";
  ErrorCode[ErrorCode["Canceled"] = 11] = "Canceled";
  ErrorCode[ErrorCode["TooOften"] = 12] = "TooOften";
  ErrorCode[ErrorCode["BindSocket"] = 13] = "BindSocket";
  ErrorCode[ErrorCode["NetDown"] = 14] = "NetDown";
  ErrorCode[ErrorCode["NoBufs"] = 15] = "NoBufs";
  ErrorCode[ErrorCode["JoinChannelRejected"] = 17] = "JoinChannelRejected";
  ErrorCode[ErrorCode["LeaveChannelRejected"] = 18] = "LeaveChannelRejected";
  ErrorCode[ErrorCode["AlreadyInUse"] = 19] = "AlreadyInUse";
  ErrorCode[ErrorCode["Abort"] = 20] = "Abort";
  ErrorCode[ErrorCode["InitNetEngine"] = 21] = "InitNetEngine";
  ErrorCode[ErrorCode["ResourceLimited"] = 22] = "ResourceLimited";
  ErrorCode[ErrorCode["InvalidAppId"] = 101] = "InvalidAppId";
  ErrorCode[ErrorCode["InvalidChannelId"] = 102] = "InvalidChannelId";
  ErrorCode[ErrorCode["NoServerResources"] = 103] = "NoServerResources";
  ErrorCode[ErrorCode["TokenExpired"] = 109] = "TokenExpired";
  ErrorCode[ErrorCode["InvalidToken"] = 110] = "InvalidToken";
  ErrorCode[ErrorCode["ConnectionInterrupted"] = 111] = "ConnectionInterrupted";
  ErrorCode[ErrorCode["ConnectionLost"] = 112] = "ConnectionLost";
  ErrorCode[ErrorCode["NotInChannel"] = 113] = "NotInChannel";
  ErrorCode[ErrorCode["SizeTooLarge"] = 114] = "SizeTooLarge";
  ErrorCode[ErrorCode["BitrateLimit"] = 115] = "BitrateLimit";
  ErrorCode[ErrorCode["TooManyDataStreams"] = 116] = "TooManyDataStreams";
  ErrorCode[ErrorCode["DecryptionFailed"] = 120] = "DecryptionFailed";
  ErrorCode[ErrorCode["ClientIsBannedByServer"] = 123] = "ClientIsBannedByServer";
  ErrorCode[ErrorCode["WatermarkParam"] = 124] = "WatermarkParam";
  ErrorCode[ErrorCode["WatermarkPath"] = 125] = "WatermarkPath";
  ErrorCode[ErrorCode["WatermarkPng"] = 126] = "WatermarkPng";
  ErrorCode[ErrorCode["WatermarkInfo"] = 127] = "WatermarkInfo";
  ErrorCode[ErrorCode["WatermarkAGRB"] = 128] = "WatermarkAGRB";
  ErrorCode[ErrorCode["WatermarkRead"] = 129] = "WatermarkRead";
  ErrorCode[ErrorCode["EncryptedStreamNotAllowedPublish"] = 130] = "EncryptedStreamNotAllowedPublish";
  ErrorCode[ErrorCode["InvalidUserAccount"] = 134] = "InvalidUserAccount";
  ErrorCode[ErrorCode["PublishStreamCDNError"] = 151] = "PublishStreamCDNError";
  ErrorCode[ErrorCode["PublishStreamNumReachLimit"] = 152] = "PublishStreamNumReachLimit";
  ErrorCode[ErrorCode["PublishStreamNotAuthorized"] = 153] = "PublishStreamNotAuthorized";
  ErrorCode[ErrorCode["PublishStreamInternalServerError"] = 154] = "PublishStreamInternalServerError";
  ErrorCode[ErrorCode["PublishStreamNotFound"] = 155] = "PublishStreamNotFound";
  ErrorCode[ErrorCode["PublishStreamFormatNotSuppported"] = 156] = "PublishStreamFormatNotSuppported";
  ErrorCode[ErrorCode["ModuleNotFound"] = 157] = "ModuleNotFound";
  ErrorCode[ErrorCode["AlreadyInRecording"] = 160] = "AlreadyInRecording";
  ErrorCode[ErrorCode["LoadMediaEngine"] = 1001] = "LoadMediaEngine";
  ErrorCode[ErrorCode["StartCall"] = 1002] = "StartCall";
  ErrorCode[ErrorCode["StartCamera"] = 1003] = "StartCamera";
  ErrorCode[ErrorCode["StartVideoRender"] = 1004] = "StartVideoRender";
  ErrorCode[ErrorCode["AdmGeneralError"] = 1005] = "AdmGeneralError";
  ErrorCode[ErrorCode["AdmJavaResource"] = 1006] = "AdmJavaResource";
  ErrorCode[ErrorCode["AdmSampleRate"] = 1007] = "AdmSampleRate";
  ErrorCode[ErrorCode["AdmInitPlayout"] = 1008] = "AdmInitPlayout";
  ErrorCode[ErrorCode["AdmStartPlayout"] = 1009] = "AdmStartPlayout";
  ErrorCode[ErrorCode["AdmStopPlayout"] = 1010] = "AdmStopPlayout";
  ErrorCode[ErrorCode["AdmInitRecording"] = 1011] = "AdmInitRecording";
  ErrorCode[ErrorCode["AdmStartRecording"] = 1012] = "AdmStartRecording";
  ErrorCode[ErrorCode["AdmStopRecording"] = 1013] = "AdmStopRecording";
  ErrorCode[ErrorCode["AdmRuntimePlayoutError"] = 1015] = "AdmRuntimePlayoutError";
  ErrorCode[ErrorCode["AdmRuntimeRecordingError"] = 1017] = "AdmRuntimeRecordingError";
  ErrorCode[ErrorCode["AdmRecordAudioFailed"] = 1018] = "AdmRecordAudioFailed";
  ErrorCode[ErrorCode["AdmPlayAbnormalFrequency"] = 1020] = "AdmPlayAbnormalFrequency";
  ErrorCode[ErrorCode["AdmRecordAbnormalFrequency"] = 1021] = "AdmRecordAbnormalFrequency";
  ErrorCode[ErrorCode["AdmInitLoopback"] = 1022] = "AdmInitLoopback";
  ErrorCode[ErrorCode["AdmStartLoopback"] = 1023] = "AdmStartLoopback";
  ErrorCode[ErrorCode["AdmNoPermission"] = 1027] = "AdmNoPermission";
  ErrorCode[ErrorCode["AudioBtScoFailed"] = 1030] = "AudioBtScoFailed";
  ErrorCode[ErrorCode["AdmNoRecordingDevice"] = 1359] = "AdmNoRecordingDevice";
  ErrorCode[ErrorCode["AdmNoPlayoutDevice"] = 1360] = "AdmNoPlayoutDevice";
  ErrorCode[ErrorCode["VdmCameraNotAuthorized"] = 1501] = "VdmCameraNotAuthorized";
  ErrorCode[ErrorCode["VcmUnknownError"] = 1600] = "VcmUnknownError";
  ErrorCode[ErrorCode["VcmEncoderInitError"] = 1601] = "VcmEncoderInitError";
  ErrorCode[ErrorCode["VcmEncoderEncodeError"] = 1602] = "VcmEncoderEncodeError";
  ErrorCode[ErrorCode["VcmEncoderSetError"] = 1603] = "VcmEncoderSetError";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));

let InjectStreamStatus;


exports.InjectStreamStatus = InjectStreamStatus;

(function (InjectStreamStatus) {
  InjectStreamStatus[InjectStreamStatus["StartSuccess"] = 0] = "StartSuccess";
  InjectStreamStatus[InjectStreamStatus["StartAlreadyExists"] = 1] = "StartAlreadyExists";
  InjectStreamStatus[InjectStreamStatus["StartUnauthorized"] = 2] = "StartUnauthorized";
  InjectStreamStatus[InjectStreamStatus["StartTimedout"] = 3] = "StartTimedout";
  InjectStreamStatus[InjectStreamStatus["StartFailed"] = 4] = "StartFailed";
  InjectStreamStatus[InjectStreamStatus["StopSuccess"] = 5] = "StopSuccess";
  InjectStreamStatus[InjectStreamStatus["StopNotFound"] = 6] = "StopNotFound";
  InjectStreamStatus[InjectStreamStatus["StopUnauthorized"] = 7] = "StopUnauthorized";
  InjectStreamStatus[InjectStreamStatus["StopTimedout"] = 8] = "StopTimedout";
  InjectStreamStatus[InjectStreamStatus["StopFailed"] = 9] = "StopFailed";
  InjectStreamStatus[InjectStreamStatus["Broken"] = 10] = "Broken";
})(InjectStreamStatus || (exports.InjectStreamStatus = InjectStreamStatus = {}));

let LastmileProbeResultState;


exports.LastmileProbeResultState = LastmileProbeResultState;

(function (LastmileProbeResultState) {
  LastmileProbeResultState[LastmileProbeResultState["Complete"] = 1] = "Complete";
  LastmileProbeResultState[LastmileProbeResultState["IncompleteNoBwe"] = 2] = "IncompleteNoBwe";
  LastmileProbeResultState[LastmileProbeResultState["Unavailable"] = 3] = "Unavailable";
})(LastmileProbeResultState || (exports.LastmileProbeResultState = LastmileProbeResultState = {}));

let LighteningContrastLevel;


exports.LighteningContrastLevel = LighteningContrastLevel;

(function (LighteningContrastLevel) {
  LighteningContrastLevel[LighteningContrastLevel["Low"] = 0] = "Low";
  LighteningContrastLevel[LighteningContrastLevel["Normal"] = 1] = "Normal";
  LighteningContrastLevel[LighteningContrastLevel["High"] = 2] = "High";
})(LighteningContrastLevel || (exports.LighteningContrastLevel = LighteningContrastLevel = {}));

let LocalVideoStreamError;


exports.LocalVideoStreamError = LocalVideoStreamError;

(function (LocalVideoStreamError) {
  LocalVideoStreamError[LocalVideoStreamError["OK"] = 0] = "OK";
  LocalVideoStreamError[LocalVideoStreamError["Failure"] = 1] = "Failure";
  LocalVideoStreamError[LocalVideoStreamError["DeviceNoPermission"] = 2] = "DeviceNoPermission";
  LocalVideoStreamError[LocalVideoStreamError["DeviceBusy"] = 3] = "DeviceBusy";
  LocalVideoStreamError[LocalVideoStreamError["CaptureFailure"] = 4] = "CaptureFailure";
  LocalVideoStreamError[LocalVideoStreamError["EncodeFailure"] = 5] = "EncodeFailure";
  LocalVideoStreamError[LocalVideoStreamError["CaptureInBackground"] = 6] = "CaptureInBackground";
  LocalVideoStreamError[LocalVideoStreamError["CaptureMultipleForegroundApps"] = 7] = "CaptureMultipleForegroundApps";
  LocalVideoStreamError[LocalVideoStreamError["DeviceNotFound"] = 8] = "DeviceNotFound";
})(LocalVideoStreamError || (exports.LocalVideoStreamError = LocalVideoStreamError = {}));

let LocalVideoStreamState;


exports.LocalVideoStreamState = LocalVideoStreamState;

(function (LocalVideoStreamState) {
  LocalVideoStreamState[LocalVideoStreamState["Stopped"] = 0] = "Stopped";
  LocalVideoStreamState[LocalVideoStreamState["Capturing"] = 1] = "Capturing";
  LocalVideoStreamState[LocalVideoStreamState["Encoding"] = 2] = "Encoding";
  LocalVideoStreamState[LocalVideoStreamState["Failed"] = 3] = "Failed";
})(LocalVideoStreamState || (exports.LocalVideoStreamState = LocalVideoStreamState = {}));

let LogFilter;


exports.LogFilter = LogFilter;

(function (LogFilter) {
  LogFilter[LogFilter["Off"] = 0] = "Off";
  LogFilter[LogFilter["Debug"] = 2063] = "Debug";
  LogFilter[LogFilter["Info"] = 15] = "Info";
  LogFilter[LogFilter["Warning"] = 14] = "Warning";
  LogFilter[LogFilter["Error"] = 12] = "Error";
  LogFilter[LogFilter["Critical"] = 8] = "Critical";
})(LogFilter || (exports.LogFilter = LogFilter = {}));

let NetworkQuality;


exports.NetworkQuality = NetworkQuality;

(function (NetworkQuality) {
  NetworkQuality[NetworkQuality["Unknown"] = 0] = "Unknown";
  NetworkQuality[NetworkQuality["Excellent"] = 1] = "Excellent";
  NetworkQuality[NetworkQuality["Good"] = 2] = "Good";
  NetworkQuality[NetworkQuality["Poor"] = 3] = "Poor";
  NetworkQuality[NetworkQuality["Bad"] = 4] = "Bad";
  NetworkQuality[NetworkQuality["VBad"] = 5] = "VBad";
  NetworkQuality[NetworkQuality["Down"] = 6] = "Down";
  NetworkQuality[NetworkQuality["Unsupported"] = 7] = "Unsupported";
  NetworkQuality[NetworkQuality["Detecting"] = 8] = "Detecting";
})(NetworkQuality || (exports.NetworkQuality = NetworkQuality = {}));

let NetworkType;


exports.NetworkType = NetworkType;

(function (NetworkType) {
  NetworkType[NetworkType["Unknown"] = -1] = "Unknown";
  NetworkType[NetworkType["Disconnected"] = 0] = "Disconnected";
  NetworkType[NetworkType["LAN"] = 1] = "LAN";
  NetworkType[NetworkType["WIFI"] = 2] = "WIFI";
  NetworkType[NetworkType["Mobile2G"] = 3] = "Mobile2G";
  NetworkType[NetworkType["Mobile3G"] = 4] = "Mobile3G";
  NetworkType[NetworkType["Mobile4G"] = 5] = "Mobile4G";
})(NetworkType || (exports.NetworkType = NetworkType = {}));

let RtmpStreamingErrorCode;


exports.RtmpStreamingErrorCode = RtmpStreamingErrorCode;

(function (RtmpStreamingErrorCode) {
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["OK"] = 0] = "OK";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["InvalidParameters"] = 1] = "InvalidParameters";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["EncryptedStreamNotAllowed"] = 2] = "EncryptedStreamNotAllowed";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["ConnectionTimeout"] = 3] = "ConnectionTimeout";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["InternalServerError"] = 4] = "InternalServerError";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["RtmpServerError"] = 5] = "RtmpServerError";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["TooOften"] = 6] = "TooOften";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["ReachLimit"] = 7] = "ReachLimit";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["NotAuthorized"] = 8] = "NotAuthorized";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["StreamNotFound"] = 9] = "StreamNotFound";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["FormatNotSupported"] = 10] = "FormatNotSupported";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["UnPublishOK"] = 100] = "UnPublishOK";
})(RtmpStreamingErrorCode || (exports.RtmpStreamingErrorCode = RtmpStreamingErrorCode = {}));

let RtmpStreamingState;


exports.RtmpStreamingState = RtmpStreamingState;

(function (RtmpStreamingState) {
  RtmpStreamingState[RtmpStreamingState["Idle"] = 0] = "Idle";
  RtmpStreamingState[RtmpStreamingState["Connecting"] = 1] = "Connecting";
  RtmpStreamingState[RtmpStreamingState["Running"] = 2] = "Running";
  RtmpStreamingState[RtmpStreamingState["Recovering"] = 3] = "Recovering";
  RtmpStreamingState[RtmpStreamingState["Failure"] = 4] = "Failure";
})(RtmpStreamingState || (exports.RtmpStreamingState = RtmpStreamingState = {}));

let StreamFallbackOptions;


exports.StreamFallbackOptions = StreamFallbackOptions;

(function (StreamFallbackOptions) {
  StreamFallbackOptions[StreamFallbackOptions["Disabled"] = 0] = "Disabled";
  StreamFallbackOptions[StreamFallbackOptions["VideoStreamLow"] = 1] = "VideoStreamLow";
  StreamFallbackOptions[StreamFallbackOptions["AudioOnly"] = 2] = "AudioOnly";
})(StreamFallbackOptions || (exports.StreamFallbackOptions = StreamFallbackOptions = {}));

let UserOfflineReason;


exports.UserOfflineReason = UserOfflineReason;

(function (UserOfflineReason) {
  UserOfflineReason[UserOfflineReason["Quit"] = 0] = "Quit";
  UserOfflineReason[UserOfflineReason["Dropped"] = 1] = "Dropped";
  UserOfflineReason[UserOfflineReason["BecomeAudience"] = 2] = "BecomeAudience";
})(UserOfflineReason || (exports.UserOfflineReason = UserOfflineReason = {}));

let UserPriority;


exports.UserPriority = UserPriority;

(function (UserPriority) {
  UserPriority[UserPriority["High"] = 50] = "High";
  UserPriority[UserPriority["Normal"] = 100] = "Normal";
})(UserPriority || (exports.UserPriority = UserPriority = {}));

let VideoCodecProfileType;


exports.VideoCodecProfileType = VideoCodecProfileType;

(function (VideoCodecProfileType) {
  VideoCodecProfileType[VideoCodecProfileType["BaseLine"] = 66] = "BaseLine";
  VideoCodecProfileType[VideoCodecProfileType["Main"] = 77] = "Main";
  VideoCodecProfileType[VideoCodecProfileType["High"] = 100] = "High";
})(VideoCodecProfileType || (exports.VideoCodecProfileType = VideoCodecProfileType = {}));

let VideoFrameRate;


exports.VideoFrameRate = VideoFrameRate;

(function (VideoFrameRate) {
  VideoFrameRate[VideoFrameRate["Min"] = -1] = "Min";
  VideoFrameRate[VideoFrameRate["Fps1"] = 1] = "Fps1";
  VideoFrameRate[VideoFrameRate["Fps7"] = 7] = "Fps7";
  VideoFrameRate[VideoFrameRate["Fps10"] = 10] = "Fps10";
  VideoFrameRate[VideoFrameRate["Fps15"] = 15] = "Fps15";
  VideoFrameRate[VideoFrameRate["Fps24"] = 24] = "Fps24";
  VideoFrameRate[VideoFrameRate["Fps30"] = 30] = "Fps30";
  VideoFrameRate[VideoFrameRate["Fps60"] = 60] = "Fps60";
})(VideoFrameRate || (exports.VideoFrameRate = VideoFrameRate = {}));

let BitRate;


exports.BitRate = BitRate;

(function (BitRate) {
  BitRate[BitRate["Standard"] = 0] = "Standard";
  BitRate[BitRate["Compatible"] = -1] = "Compatible";
})(BitRate || (exports.BitRate = BitRate = {}));

let VideoMirrorMode;


exports.VideoMirrorMode = VideoMirrorMode;

(function (VideoMirrorMode) {
  VideoMirrorMode[VideoMirrorMode["Auto"] = 0] = "Auto";
  VideoMirrorMode[VideoMirrorMode["Enabled"] = 1] = "Enabled";
  VideoMirrorMode[VideoMirrorMode["Disabled"] = 2] = "Disabled";
})(VideoMirrorMode || (exports.VideoMirrorMode = VideoMirrorMode = {}));

let VideoOutputOrientationMode;


exports.VideoOutputOrientationMode = VideoOutputOrientationMode;

(function (VideoOutputOrientationMode) {
  VideoOutputOrientationMode[VideoOutputOrientationMode["Adaptative"] = 0] = "Adaptative";
  VideoOutputOrientationMode[VideoOutputOrientationMode["FixedLandscape"] = 1] = "FixedLandscape";
  VideoOutputOrientationMode[VideoOutputOrientationMode["FixedPortrait"] = 2] = "FixedPortrait";
})(VideoOutputOrientationMode || (exports.VideoOutputOrientationMode = VideoOutputOrientationMode = {}));

let VideoQualityAdaptIndication;


exports.VideoQualityAdaptIndication = VideoQualityAdaptIndication;

(function (VideoQualityAdaptIndication) {
  VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptNone"] = 0] = "AdaptNone";
  VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptUpBandwidth"] = 1] = "AdaptUpBandwidth";
  VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptDownBandwidth"] = 2] = "AdaptDownBandwidth";
})(VideoQualityAdaptIndication || (exports.VideoQualityAdaptIndication = VideoQualityAdaptIndication = {}));

let VideoRemoteState;


exports.VideoRemoteState = VideoRemoteState;

(function (VideoRemoteState) {
  VideoRemoteState[VideoRemoteState["Stopped"] = 0] = "Stopped";
  VideoRemoteState[VideoRemoteState["Starting"] = 1] = "Starting";
  VideoRemoteState[VideoRemoteState["Decoding"] = 2] = "Decoding";
  VideoRemoteState[VideoRemoteState["Frozen"] = 3] = "Frozen";
  VideoRemoteState[VideoRemoteState["Failed"] = 4] = "Failed";
})(VideoRemoteState || (exports.VideoRemoteState = VideoRemoteState = {}));

let VideoRemoteStateReason;


exports.VideoRemoteStateReason = VideoRemoteStateReason;

(function (VideoRemoteStateReason) {
  VideoRemoteStateReason[VideoRemoteStateReason["Internal"] = 0] = "Internal";
  VideoRemoteStateReason[VideoRemoteStateReason["NetworkCongestion"] = 1] = "NetworkCongestion";
  VideoRemoteStateReason[VideoRemoteStateReason["NetworkRecovery"] = 2] = "NetworkRecovery";
  VideoRemoteStateReason[VideoRemoteStateReason["LocalMuted"] = 3] = "LocalMuted";
  VideoRemoteStateReason[VideoRemoteStateReason["LocalUnmuted"] = 4] = "LocalUnmuted";
  VideoRemoteStateReason[VideoRemoteStateReason["RemoteMuted"] = 5] = "RemoteMuted";
  VideoRemoteStateReason[VideoRemoteStateReason["RemoteUnmuted"] = 6] = "RemoteUnmuted";
  VideoRemoteStateReason[VideoRemoteStateReason["RemoteOffline"] = 7] = "RemoteOffline";
  VideoRemoteStateReason[VideoRemoteStateReason["AudioFallback"] = 8] = "AudioFallback";
  VideoRemoteStateReason[VideoRemoteStateReason["AudioFallbackRecovery"] = 9] = "AudioFallbackRecovery";
})(VideoRemoteStateReason || (exports.VideoRemoteStateReason = VideoRemoteStateReason = {}));

let VideoRenderMode;


exports.VideoRenderMode = VideoRenderMode;

(function (VideoRenderMode) {
  VideoRenderMode[VideoRenderMode["Hidden"] = 1] = "Hidden";
  VideoRenderMode[VideoRenderMode["Fit"] = 2] = "Fit";
  VideoRenderMode[VideoRenderMode["Adaptive"] = 3] = "Adaptive";
  VideoRenderMode[VideoRenderMode["FILL"] = 4] = "FILL";
})(VideoRenderMode || (exports.VideoRenderMode = VideoRenderMode = {}));

let VideoStreamType;


exports.VideoStreamType = VideoStreamType;

(function (VideoStreamType) {
  VideoStreamType[VideoStreamType["High"] = 0] = "High";
  VideoStreamType[VideoStreamType["Low"] = 1] = "Low";
})(VideoStreamType || (exports.VideoStreamType = VideoStreamType = {}));

let WarningCode;


exports.WarningCode = WarningCode;

(function (WarningCode) {
  WarningCode[WarningCode["InvalidView"] = 8] = "InvalidView";
  WarningCode[WarningCode["InitVideo"] = 16] = "InitVideo";
  WarningCode[WarningCode["Pending"] = 20] = "Pending";
  WarningCode[WarningCode["NoAvailableChannel"] = 103] = "NoAvailableChannel";
  WarningCode[WarningCode["LookupChannelTimeout"] = 104] = "LookupChannelTimeout";
  WarningCode[WarningCode["LookupChannelRejected"] = 105] = "LookupChannelRejected";
  WarningCode[WarningCode["OpenChannelTimeout"] = 106] = "OpenChannelTimeout";
  WarningCode[WarningCode["OpenChannelRejected"] = 107] = "OpenChannelRejected";
  WarningCode[WarningCode["SwitchLiveVideoTimeout"] = 111] = "SwitchLiveVideoTimeout";
  WarningCode[WarningCode["SetClientRoleTimeout"] = 118] = "SetClientRoleTimeout";
  WarningCode[WarningCode["SetClientRoleNotAuthorized"] = 119] = "SetClientRoleNotAuthorized";
  WarningCode[WarningCode["OpenChannelInvalidTicket"] = 121] = "OpenChannelInvalidTicket";
  WarningCode[WarningCode["OpenChannelTryNextVos"] = 122] = "OpenChannelTryNextVos";
  WarningCode[WarningCode["AudioMixingOpenError"] = 701] = "AudioMixingOpenError";
  WarningCode[WarningCode["AdmRuntimePlayoutWarning"] = 1014] = "AdmRuntimePlayoutWarning";
  WarningCode[WarningCode["AdmRuntimeRecordingWarning"] = 1016] = "AdmRuntimeRecordingWarning";
  WarningCode[WarningCode["AdmRecordAudioSilence"] = 1019] = "AdmRecordAudioSilence";
  WarningCode[WarningCode["AdmPlaybackMalfunction"] = 1020] = "AdmPlaybackMalfunction";
  WarningCode[WarningCode["AdmRecordMalfunction"] = 1021] = "AdmRecordMalfunction";
  WarningCode[WarningCode["AdmInterruption"] = 1025] = "AdmInterruption";
  WarningCode[WarningCode["AdmCategoryNotPlayAndRecord"] = 1029] = "AdmCategoryNotPlayAndRecord";
  WarningCode[WarningCode["AdmRecordAudioLowlevel"] = 1031] = "AdmRecordAudioLowlevel";
  WarningCode[WarningCode["AdmPlayoutAudioLowlevel"] = 1032] = "AdmPlayoutAudioLowlevel";
  WarningCode[WarningCode["AdmRecordIsOccupied"] = 1033] = "AdmRecordIsOccupied";
  WarningCode[WarningCode["AdmNoDataReadyCallback"] = 1040] = "AdmNoDataReadyCallback";
  WarningCode[WarningCode["AdmInconsistentDevices"] = 1042] = "AdmInconsistentDevices";
  WarningCode[WarningCode["ApmHowling"] = 1051] = "ApmHowling";
  WarningCode[WarningCode["AdmGlitchState"] = 1052] = "AdmGlitchState";
  WarningCode[WarningCode["ApmResidualEcho"] = 1053] = "ApmResidualEcho";
  WarningCode[WarningCode["SuperResolutionStreamOverLimitation"] = 1610] = "SuperResolutionStreamOverLimitation";
  WarningCode[WarningCode["SuperResolutionUserCountOverLimitation"] = 1611] = "SuperResolutionUserCountOverLimitation";
  WarningCode[WarningCode["SuperResolutionDeviceNotSupported"] = 1612] = "SuperResolutionDeviceNotSupported";
})(WarningCode || (exports.WarningCode = WarningCode = {}));

let AudioChannel;


exports.AudioChannel = AudioChannel;

(function (AudioChannel) {
  AudioChannel[AudioChannel["Channel0"] = 0] = "Channel0";
  AudioChannel[AudioChannel["Channel1"] = 1] = "Channel1";
  AudioChannel[AudioChannel["Channel2"] = 2] = "Channel2";
  AudioChannel[AudioChannel["Channel3"] = 3] = "Channel3";
  AudioChannel[AudioChannel["Channel4"] = 4] = "Channel4";
  AudioChannel[AudioChannel["Channel5"] = 5] = "Channel5";
})(AudioChannel || (exports.AudioChannel = AudioChannel = {}));

let VideoCodecType;


exports.VideoCodecType = VideoCodecType;

(function (VideoCodecType) {
  VideoCodecType[VideoCodecType["VP8"] = 1] = "VP8";
  VideoCodecType[VideoCodecType["H264"] = 2] = "H264";
  VideoCodecType[VideoCodecType["EVP"] = 3] = "EVP";
  VideoCodecType[VideoCodecType["E264"] = 4] = "E264";
})(VideoCodecType || (exports.VideoCodecType = VideoCodecType = {}));

let StreamPublishState;


exports.StreamPublishState = StreamPublishState;

(function (StreamPublishState) {
  StreamPublishState[StreamPublishState["Idle"] = 0] = "Idle";
  StreamPublishState[StreamPublishState["NoPublished"] = 1] = "NoPublished";
  StreamPublishState[StreamPublishState["Publishing"] = 2] = "Publishing";
  StreamPublishState[StreamPublishState["Published"] = 3] = "Published";
})(StreamPublishState || (exports.StreamPublishState = StreamPublishState = {}));

let StreamSubscribeState;


exports.StreamSubscribeState = StreamSubscribeState;

(function (StreamSubscribeState) {
  StreamSubscribeState[StreamSubscribeState["Idle"] = 0] = "Idle";
  StreamSubscribeState[StreamSubscribeState["NoSubscribed"] = 1] = "NoSubscribed";
  StreamSubscribeState[StreamSubscribeState["Subscribing"] = 2] = "Subscribing";
  StreamSubscribeState[StreamSubscribeState["Subscribed"] = 3] = "Subscribed";
})(StreamSubscribeState || (exports.StreamSubscribeState = StreamSubscribeState = {}));

let RtmpStreamingEvent;


exports.RtmpStreamingEvent = RtmpStreamingEvent;

(function (RtmpStreamingEvent) {
  RtmpStreamingEvent[RtmpStreamingEvent["FailedLoadImage"] = 1] = "FailedLoadImage";
  RtmpStreamingEvent[RtmpStreamingEvent["UrlAlreadyInUse"] = 2] = "UrlAlreadyInUse";
})(RtmpStreamingEvent || (exports.RtmpStreamingEvent = RtmpStreamingEvent = {}));

let AudioSessionOperationRestriction;


exports.AudioSessionOperationRestriction = AudioSessionOperationRestriction;

(function (AudioSessionOperationRestriction) {
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["None"] = 0] = "None";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["SetCategory"] = 1] = "SetCategory";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["ConfigureSession"] = 2] = "ConfigureSession";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["DeactivateSession"] = 4] = "DeactivateSession";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["All"] = 128] = "All";
})(AudioSessionOperationRestriction || (exports.AudioSessionOperationRestriction = AudioSessionOperationRestriction = {}));

let AudioEffectPreset;


exports.AudioEffectPreset = AudioEffectPreset;

(function (AudioEffectPreset) {
  AudioEffectPreset[AudioEffectPreset["AudioEffectOff"] = 0] = "AudioEffectOff";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsKTV"] = 33620224] = "RoomAcousticsKTV";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsVocalConcert"] = 33620480] = "RoomAcousticsVocalConcert";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsStudio"] = 33620736] = "RoomAcousticsStudio";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsPhonograph"] = 33620992] = "RoomAcousticsPhonograph";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsVirtualStereo"] = 33621248] = "RoomAcousticsVirtualStereo";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsSpacial"] = 33621504] = "RoomAcousticsSpacial";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsEthereal"] = 33621760] = "RoomAcousticsEthereal";
  AudioEffectPreset[AudioEffectPreset["RoomAcoustics3DVoice"] = 33622016] = "RoomAcoustics3DVoice";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectUncle"] = 33685760] = "VoiceChangerEffectUncle";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectOldMan"] = 33686016] = "VoiceChangerEffectOldMan";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectBoy"] = 33686272] = "VoiceChangerEffectBoy";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectSister"] = 33686528] = "VoiceChangerEffectSister";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectGirl"] = 33686784] = "VoiceChangerEffectGirl";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectPigKing"] = 33687040] = "VoiceChangerEffectPigKing";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectHulk"] = 33687296] = "VoiceChangerEffectHulk";
  AudioEffectPreset[AudioEffectPreset["StyleTransformationRnB"] = 33751296] = "StyleTransformationRnB";
  AudioEffectPreset[AudioEffectPreset["StyleTransformationPopular"] = 33751552] = "StyleTransformationPopular";
  AudioEffectPreset[AudioEffectPreset["PitchCorrection"] = 33816832] = "PitchCorrection";
})(AudioEffectPreset || (exports.AudioEffectPreset = AudioEffectPreset = {}));

let VoiceBeautifierPreset;


exports.VoiceBeautifierPreset = VoiceBeautifierPreset;

(function (VoiceBeautifierPreset) {
  VoiceBeautifierPreset[VoiceBeautifierPreset["VoiceBeautifierOff"] = 0] = "VoiceBeautifierOff";
  VoiceBeautifierPreset[VoiceBeautifierPreset["ChatBeautifierMagnetic"] = 16843008] = "ChatBeautifierMagnetic";
  VoiceBeautifierPreset[VoiceBeautifierPreset["ChatBeautifierFresh"] = 16843264] = "ChatBeautifierFresh";
  VoiceBeautifierPreset[VoiceBeautifierPreset["ChatBeautifierVitality"] = 16843520] = "ChatBeautifierVitality";
  VoiceBeautifierPreset[VoiceBeautifierPreset["SingingBeautifier"] = 16908544] = "SingingBeautifier";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationVigorous"] = 16974080] = "TimbreTransformationVigorous";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationDeep"] = 16974336] = "TimbreTransformationDeep";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationMellow"] = 16974592] = "TimbreTransformationMellow";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationFalsetto"] = 16974848] = "TimbreTransformationFalsetto";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationFull"] = 16975104] = "TimbreTransformationFull";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationClear"] = 16975360] = "TimbreTransformationClear";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationResounding"] = 16975616] = "TimbreTransformationResounding";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationRinging"] = 16975872] = "TimbreTransformationRinging";
})(VoiceBeautifierPreset || (exports.VoiceBeautifierPreset = VoiceBeautifierPreset = {}));

let AudienceLatencyLevelType;


exports.AudienceLatencyLevelType = AudienceLatencyLevelType;

(function (AudienceLatencyLevelType) {
  AudienceLatencyLevelType[AudienceLatencyLevelType["LowLatency"] = 1] = "LowLatency";
  AudienceLatencyLevelType[AudienceLatencyLevelType["UltraLowLatency"] = 2] = "UltraLowLatency";
})(AudienceLatencyLevelType || (exports.AudienceLatencyLevelType = AudienceLatencyLevelType = {}));

let LogLevel;


exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["None"] = 0] = "None";
  LogLevel[LogLevel["Info"] = 1] = "Info";
  LogLevel[LogLevel["Warn"] = 2] = "Warn";
  LogLevel[LogLevel["Error"] = 4] = "Error";
  LogLevel[LogLevel["Fatal"] = 8] = "Fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

let CaptureBrightnessLevelType;


exports.CaptureBrightnessLevelType = CaptureBrightnessLevelType;

(function (CaptureBrightnessLevelType) {
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Invalid"] = -1] = "Invalid";
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Normal"] = 0] = "Normal";
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Bright"] = 1] = "Bright";
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Dark"] = 2] = "Dark";
})(CaptureBrightnessLevelType || (exports.CaptureBrightnessLevelType = CaptureBrightnessLevelType = {}));

let SuperResolutionStateReason;


exports.SuperResolutionStateReason = SuperResolutionStateReason;

(function (SuperResolutionStateReason) {
  SuperResolutionStateReason[SuperResolutionStateReason["Success"] = 0] = "Success";
  SuperResolutionStateReason[SuperResolutionStateReason["StreamOverLimitation"] = 1] = "StreamOverLimitation";
  SuperResolutionStateReason[SuperResolutionStateReason["UserCountOverLimitation"] = 2] = "UserCountOverLimitation";
  SuperResolutionStateReason[SuperResolutionStateReason["DeviceNotSupported"] = 3] = "DeviceNotSupported";
})(SuperResolutionStateReason || (exports.SuperResolutionStateReason = SuperResolutionStateReason = {}));

let UploadErrorReason;


exports.UploadErrorReason = UploadErrorReason;

(function (UploadErrorReason) {
  UploadErrorReason[UploadErrorReason["Success"] = 0] = "Success";
  UploadErrorReason[UploadErrorReason["NetError"] = 1] = "NetError";
  UploadErrorReason[UploadErrorReason["ServerError"] = 2] = "ServerError";
})(UploadErrorReason || (exports.UploadErrorReason = UploadErrorReason = {}));

let CloudProxyType;


exports.CloudProxyType = CloudProxyType;

(function (CloudProxyType) {
  CloudProxyType[CloudProxyType["None"] = 0] = "None";
  CloudProxyType[CloudProxyType["UDP"] = 1] = "UDP";
  CloudProxyType[CloudProxyType["TCP"] = 2] = "TCP";
})(CloudProxyType || (exports.CloudProxyType = CloudProxyType = {}));

let ExperienceQualityType;


exports.ExperienceQualityType = ExperienceQualityType;

(function (ExperienceQualityType) {
  ExperienceQualityType[ExperienceQualityType["Good"] = 0] = "Good";
  ExperienceQualityType[ExperienceQualityType["Bad"] = 1] = "Bad";
})(ExperienceQualityType || (exports.ExperienceQualityType = ExperienceQualityType = {}));

let ExperiencePoorReason;


exports.ExperiencePoorReason = ExperiencePoorReason;

(function (ExperiencePoorReason) {
  ExperiencePoorReason[ExperiencePoorReason["None"] = 0] = "None";
  ExperiencePoorReason[ExperiencePoorReason["RemoteNetworkQualityPoor"] = 1] = "RemoteNetworkQualityPoor";
  ExperiencePoorReason[ExperiencePoorReason["LocalNetworkQualityPoor"] = 2] = "LocalNetworkQualityPoor";
  ExperiencePoorReason[ExperiencePoorReason["WirelessSignalPoor"] = 4] = "WirelessSignalPoor";
  ExperiencePoorReason[ExperiencePoorReason["WifiBluetoothCoexist"] = 8] = "WifiBluetoothCoexist";
})(ExperiencePoorReason || (exports.ExperiencePoorReason = ExperiencePoorReason = {}));

let VoiceConversionPreset;
exports.VoiceConversionPreset = VoiceConversionPreset;

(function (VoiceConversionPreset) {
  VoiceConversionPreset[VoiceConversionPreset["Off"] = 0] = "Off";
  VoiceConversionPreset[VoiceConversionPreset["Neutral"] = 50397440] = "Neutral";
  VoiceConversionPreset[VoiceConversionPreset["Sweet"] = 50397696] = "Sweet";
  VoiceConversionPreset[VoiceConversionPreset["Solid"] = 50397952] = "Solid";
  VoiceConversionPreset[VoiceConversionPreset["Bass"] = 50397952] = "Bass";
})(VoiceConversionPreset || (exports.VoiceConversionPreset = VoiceConversionPreset = {}));
