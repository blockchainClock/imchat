"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Classes = require("./Classes");

var _RtcChannel = _interopRequireDefault(require("./RtcChannel.native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const AgoraRtcEngineModule = uni.requireNativePlugin('Agora-RTC-EngineModule');


const Prefix = 'io.agora.rtc.';



const RtcEngineEvent = uni.requireNativePlugin('globalEvent');


let engine;


class RtcEngine {
  constructor() {
    _defineProperty(this, "_listeners", new Map());
  }

  
  static _callMethod(method, args) {
    return new Promise((resolve, reject) => {
      AgoraRtcEngineModule.callMethod({
        method: method,
        args: args
      }, res => {
        if (res && res.code) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    });
  }
  


  static instance() {
    if (engine) {
      return engine;
    } else {
      throw new Error('please create RtcEngine first');
    }
  }
  


  static async getSdkVersion() {
    return RtcEngine._callMethod('getSdkVersion');
  }
  


  static async getErrorDescription(error) {
    return RtcEngine._callMethod('getErrorDescription', {
      error
    });
  }
  


  static async create(appId) {
    return RtcEngine.createWithContext(new _Classes.RtcEngineContext(appId));
  }
  


  static async createWithAreaCode(appId, areaCode) {
    return RtcEngine.createWithContext(new _Classes.RtcEngineContext(appId, {
      areaCode: [areaCode]
    }));
  }
  


  static async createWithConfig(config) {
    return this.createWithContext(config);
  }
  


  static async createWithContext(context) {
    if (engine) return engine;
    let areaCode;

    if (context.areaCode) {
      let code = 0;
      context.areaCode.forEach(value => {
        code |= value;
      });
      areaCode = code;
    }

    await RtcEngine._callMethod('create', {
      config: { ...context,
        areaCode: areaCode
      },
      appType: 14
    });
    engine = new RtcEngine();
    return engine;
  }
  


  destroy() {
    _RtcChannel.default.destroyAll();

    this.removeAllListeners();
    engine = undefined;
    return RtcEngine._callMethod('destroy');
  }
  


  addListener(event, listener) {
    const callback = res => {
      const {
        channelId,
        data
      } = res;

      if (channelId === undefined) {
        
        listener(...data);
      }
    };

    let map = this._listeners.get(event);

    if (map === undefined) {
      map = new Map();

      this._listeners.set(event, map);
    }

    RtcEngineEvent.addEventListener(Prefix + event, callback);
    map.set(listener, callback);
    return {
      remove: () => {
        this.removeListener(event, listener);
      }
    };
  }
  


  removeListener(event, listener) {
    const map = this._listeners.get(event);

    if (map === undefined) return;
    RtcEngineEvent.removeEventListener(Prefix + event, map.get(listener));
    map.delete(listener);
  }
  


  removeAllListeners(event) {
    if (event === undefined) {
      this._listeners.forEach((_, key) => {
        RtcEngineEvent.removeAllEventListeners(Prefix + key);
      });

      this._listeners.clear();

      return;
    }

    RtcEngineEvent.removeAllEventListeners(Prefix + event);

    this._listeners.delete(event);
  }
  


  setChannelProfile(profile) {
    return RtcEngine._callMethod('setChannelProfile', {
      profile
    });
  }
  


  setClientRole(role, options) {
    return RtcEngine._callMethod('setClientRole', {
      role,
      options
    });
  }
  


  joinChannel(token, channelName, optionalInfo, optionalUid, options) {
    return RtcEngine._callMethod('joinChannel', {
      token,
      channelName,
      optionalInfo,
      optionalUid,
      options
    });
  }
  


  switchChannel(token, channelName, options) {
    return RtcEngine._callMethod('switchChannel', {
      token,
      channelName,
      options
    });
  }
  


  leaveChannel() {
    return RtcEngine._callMethod('leaveChannel');
  }
  


  renewToken(token) {
    return RtcEngine._callMethod('renewToken', {
      token
    });
  }
  


  enableWebSdkInteroperability(enabled) {
    return RtcEngine._callMethod('enableWebSdkInteroperability', {
      enabled
    });
  }
  


  getConnectionState() {
    return RtcEngine._callMethod('getConnectionState');
  }
  


  getCallId() {
    return RtcEngine._callMethod('getCallId');
  }
  


  rate(callId, rating, description) {
    return RtcEngine._callMethod('rate', {
      callId,
      rating,
      description
    });
  }
  


  complain(callId, description) {
    return RtcEngine._callMethod('complain', {
      callId,
      description
    });
  }
  


  setLogFile(filePath) {
    return RtcEngine._callMethod('setLogFile', {
      filePath
    });
  }
  


  setLogFilter(filter) {
    return RtcEngine._callMethod('setLogFilter', {
      filter
    });
  }
  


  setLogFileSize(fileSizeInKBytes) {
    return RtcEngine._callMethod('setLogFileSize', {
      fileSizeInKBytes
    });
  }
  


  setParameters(parameters) {
    return RtcEngine._callMethod('setParameters', {
      parameters
    });
  }
  


  getUserInfoByUid(uid) {
    return RtcEngine._callMethod('getUserInfoByUid', {
      uid
    });
  }
  


  getUserInfoByUserAccount(userAccount) {
    return RtcEngine._callMethod('getUserInfoByUserAccount', {
      userAccount
    });
  }
  


  joinChannelWithUserAccount(token, channelName, userAccount, options) {
    return RtcEngine._callMethod('joinChannelWithUserAccount', {
      token,
      channelName,
      userAccount,
      options
    });
  }
  


  registerLocalUserAccount(appId, userAccount) {
    return RtcEngine._callMethod('registerLocalUserAccount', {
      appId,
      userAccount
    });
  }
  


  adjustPlaybackSignalVolume(volume) {
    return RtcEngine._callMethod('adjustPlaybackSignalVolume', {
      volume
    });
  }
  


  adjustRecordingSignalVolume(volume) {
    return RtcEngine._callMethod('adjustRecordingSignalVolume', {
      volume
    });
  }
  


  adjustUserPlaybackSignalVolume(uid, volume) {
    return RtcEngine._callMethod('adjustUserPlaybackSignalVolume', {
      uid,
      volume
    });
  }
  


  disableAudio() {
    return RtcEngine._callMethod('disableAudio');
  }
  


  enableAudio() {
    return RtcEngine._callMethod('enableAudio');
  }
  


  enableAudioVolumeIndication(interval, smooth, report_vad) {
    return RtcEngine._callMethod('enableAudioVolumeIndication', {
      interval,
      smooth,
      report_vad
    });
  }
  


  enableLocalAudio(enabled) {
    return RtcEngine._callMethod('enableLocalAudio', {
      enabled
    });
  }
  


  muteAllRemoteAudioStreams(muted) {
    return RtcEngine._callMethod('muteAllRemoteAudioStreams', {
      muted
    });
  }
  


  muteLocalAudioStream(muted) {
    return RtcEngine._callMethod('muteLocalAudioStream', {
      muted
    });
  }
  


  muteRemoteAudioStream(uid, muted) {
    return RtcEngine._callMethod('muteRemoteAudioStream', {
      uid,
      muted
    });
  }
  


  setAudioProfile(profile, scenario) {
    return RtcEngine._callMethod('setAudioProfile', {
      profile,
      scenario
    });
  }
  


  setDefaultMuteAllRemoteAudioStreams(muted) {
    return RtcEngine._callMethod('setDefaultMuteAllRemoteAudioStreams', {
      muted
    });
  }
  


  disableVideo() {
    return RtcEngine._callMethod('disableVideo');
  }
  


  enableLocalVideo(enabled) {
    return RtcEngine._callMethod('enableLocalVideo', {
      enabled
    });
  }
  


  enableVideo() {
    return RtcEngine._callMethod('enableVideo');
  }
  


  muteAllRemoteVideoStreams(muted) {
    return RtcEngine._callMethod('muteAllRemoteVideoStreams', {
      muted
    });
  }
  


  muteLocalVideoStream(muted) {
    return RtcEngine._callMethod('muteLocalVideoStream', {
      muted
    });
  }
  


  muteRemoteVideoStream(uid, muted) {
    return RtcEngine._callMethod('muteRemoteVideoStream', {
      uid,
      muted
    });
  }
  


  setBeautyEffectOptions(enabled, options) {
    return RtcEngine._callMethod('setBeautyEffectOptions', {
      enabled,
      options
    });
  }
  


  enableRemoteSuperResolution(uid, enable) {
    return RtcEngine._callMethod('enableRemoteSuperResolution', {
      uid,
      enable
    });
  }
  


  setDefaultMuteAllRemoteVideoStreams(muted) {
    return RtcEngine._callMethod('setDefaultMuteAllRemoteVideoStreams', {
      muted
    });
  }
  


  setVideoEncoderConfiguration(config) {
    return RtcEngine._callMethod('setVideoEncoderConfiguration', {
      config
    });
  }
  


  startPreview() {
    return RtcEngine._callMethod('startPreview');
  }
  


  stopPreview() {
    return RtcEngine._callMethod('stopPreview');
  }
  


  adjustAudioMixingPlayoutVolume(volume) {
    return RtcEngine._callMethod('adjustAudioMixingPlayoutVolume', {
      volume
    });
  }
  


  adjustAudioMixingPublishVolume(volume) {
    return RtcEngine._callMethod('adjustAudioMixingPublishVolume', {
      volume
    });
  }
  


  adjustAudioMixingVolume(volume) {
    return RtcEngine._callMethod('adjustAudioMixingVolume', {
      volume
    });
  }
  


  getAudioMixingCurrentPosition() {
    return RtcEngine._callMethod('getAudioMixingCurrentPosition');
  }
  


  getAudioMixingDuration(filePath) {
    return RtcEngine._callMethod('getAudioMixingDuration', {
      filePath
    });
  }
  


  getAudioMixingPlayoutVolume() {
    return RtcEngine._callMethod('getAudioMixingPlayoutVolume');
  }
  


  getAudioMixingPublishVolume() {
    return RtcEngine._callMethod('getAudioMixingPublishVolume');
  }
  


  pauseAudioMixing() {
    return RtcEngine._callMethod('pauseAudioMixing');
  }
  


  resumeAudioMixing() {
    return RtcEngine._callMethod('resumeAudioMixing');
  }
  


  setAudioMixingPitch(pitch) {
    return RtcEngine._callMethod('setAudioMixingPitch', {
      pitch
    });
  }
  


  setAudioMixingPosition(pos) {
    return RtcEngine._callMethod('setAudioMixingPosition', {
      pos
    });
  }
  


  startAudioMixing(filePath, loopback, replace, cycle, startPos) {
    return RtcEngine._callMethod('startAudioMixing', {
      filePath,
      loopback,
      replace,
      cycle,
      startPos
    });
  }
  


  stopAudioMixing() {
    return RtcEngine._callMethod('stopAudioMixing');
  }
  


  getEffectsVolume() {
    return RtcEngine._callMethod('getEffectsVolume');
  }
  


  pauseAllEffects() {
    return RtcEngine._callMethod('pauseAllEffects');
  }
  


  pauseEffect(soundId) {
    return RtcEngine._callMethod('pauseEffect', {
      soundId
    });
  }
  


  playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish, startPos) {
    return RtcEngine._callMethod('playEffect', {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos
    });
  }
  


  setEffectPosition(soundId, pos) {
    return RtcEngine._callMethod('setEffectPosition', {
      soundId,
      pos
    });
  }
  


  getEffectDuration(filePath) {
    return RtcEngine._callMethod('getEffectDuration', {
      filePath
    });
  }
  


  getEffectCurrentPosition(soundId) {
    return RtcEngine._callMethod('getEffectCurrentPosition', {
      soundId
    });
  }
  


  preloadEffect(soundId, filePath) {
    return RtcEngine._callMethod('preloadEffect', {
      soundId,
      filePath
    });
  }
  


  resumeAllEffects() {
    return RtcEngine._callMethod('resumeAllEffects');
  }
  


  resumeEffect(soundId) {
    return RtcEngine._callMethod('resumeEffect', {
      soundId
    });
  }
  


  setEffectsVolume(volume) {
    return RtcEngine._callMethod('setEffectsVolume', {
      volume
    });
  }
  


  setVolumeOfEffect(soundId, volume) {
    return RtcEngine._callMethod('setVolumeOfEffect', {
      soundId,
      volume
    });
  }
  


  stopAllEffects() {
    return RtcEngine._callMethod('stopAllEffects');
  }
  


  stopEffect(soundId) {
    return RtcEngine._callMethod('stopEffect', {
      soundId
    });
  }
  


  unloadEffect(soundId) {
    return RtcEngine._callMethod('unloadEffect', {
      soundId
    });
  }
  


  setLocalVoiceChanger(voiceChanger) {
    return RtcEngine._callMethod('setLocalVoiceChanger', {
      voiceChanger
    });
  }
  


  setLocalVoiceEqualization(bandFrequency, bandGain) {
    return RtcEngine._callMethod('setLocalVoiceEqualization', {
      bandFrequency,
      bandGain
    });
  }
  


  setLocalVoicePitch(pitch) {
    return RtcEngine._callMethod('setLocalVoicePitch', {
      pitch
    });
  }
  


  setLocalVoiceReverb(reverbKey, value) {
    return RtcEngine._callMethod('setLocalVoiceReverb', {
      reverbKey,
      value
    });
  }
  


  setLocalVoiceReverbPreset(preset) {
    return RtcEngine._callMethod('setLocalVoiceReverbPreset', {
      preset
    });
  }
  


  enableSoundPositionIndication(enabled) {
    return RtcEngine._callMethod('enableSoundPositionIndication', {
      enabled
    });
  }
  


  setRemoteVoicePosition(uid, pan, gain) {
    return RtcEngine._callMethod('setRemoteVoicePosition', {
      uid,
      pan,
      gain
    });
  }
  


  addPublishStreamUrl(url, transcodingEnabled) {
    return RtcEngine._callMethod('addPublishStreamUrl', {
      url,
      transcodingEnabled
    });
  }
  


  removePublishStreamUrl(url) {
    return RtcEngine._callMethod('removePublishStreamUrl', {
      url
    });
  }
  


  setLiveTranscoding(transcoding) {
    return RtcEngine._callMethod('setLiveTranscoding', {
      transcoding
    });
  }
  


  startChannelMediaRelay(channelMediaRelayConfiguration) {
    return RtcEngine._callMethod('startChannelMediaRelay', {
      channelMediaRelayConfiguration
    });
  }
  


  stopChannelMediaRelay() {
    return RtcEngine._callMethod('stopChannelMediaRelay');
  }
  


  updateChannelMediaRelay(channelMediaRelayConfiguration) {
    return RtcEngine._callMethod('updateChannelMediaRelay', {
      channelMediaRelayConfiguration
    });
  }
  


  isSpeakerphoneEnabled() {
    return RtcEngine._callMethod('isSpeakerphoneEnabled');
  }
  


  setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker) {
    return RtcEngine._callMethod('setDefaultAudioRoutetoSpeakerphone', {
      defaultToSpeaker
    });
  }
  


  setEnableSpeakerphone(enabled) {
    return RtcEngine._callMethod('setEnableSpeakerphone', {
      enabled
    });
  }
  


  enableInEarMonitoring(enabled) {
    return RtcEngine._callMethod('enableInEarMonitoring', {
      enabled
    });
  }
  


  setInEarMonitoringVolume(volume) {
    return RtcEngine._callMethod('setInEarMonitoringVolume', {
      volume
    });
  }
  


  enableDualStreamMode(enabled) {
    return RtcEngine._callMethod('enableDualStreamMode', {
      enabled
    });
  }
  


  setRemoteDefaultVideoStreamType(streamType) {
    return RtcEngine._callMethod('setRemoteDefaultVideoStreamType', {
      streamType
    });
  }
  


  setRemoteVideoStreamType(uid, streamType) {
    return RtcEngine._callMethod('setRemoteVideoStreamType', {
      uid,
      streamType
    });
  }
  


  setLocalPublishFallbackOption(option) {
    return RtcEngine._callMethod('setLocalPublishFallbackOption', {
      option
    });
  }
  


  setRemoteSubscribeFallbackOption(option) {
    return RtcEngine._callMethod('setRemoteSubscribeFallbackOption', {
      option
    });
  }
  


  setRemoteUserPriority(uid, userPriority) {
    return RtcEngine._callMethod('setRemoteUserPriority', {
      uid,
      userPriority
    });
  }
  


  disableLastmileTest() {
    return RtcEngine._callMethod('disableLastmileTest');
  }
  


  enableLastmileTest() {
    return RtcEngine._callMethod('enableLastmileTest');
  }
  


  startEchoTest(intervalInSeconds) {
    return RtcEngine._callMethod('startEchoTest', {
      intervalInSeconds
    });
  }
  


  startLastmileProbeTest(config) {
    return RtcEngine._callMethod('startLastmileProbeTest', {
      config
    });
  }
  


  stopEchoTest() {
    return RtcEngine._callMethod('stopEchoTest');
  }
  


  stopLastmileProbeTest() {
    return RtcEngine._callMethod('stopLastmileProbeTest');
  }
  


  registerMediaMetadataObserver() {
    return RtcEngine._callMethod('registerMediaMetadataObserver');
  }
  


  sendMetadata(metadata) {
    return RtcEngine._callMethod('sendMetadata', {
      metadata
    });
  }
  


  setMaxMetadataSize(size) {
    return RtcEngine._callMethod('setMaxMetadataSize', {
      size
    });
  }
  


  unregisterMediaMetadataObserver() {
    return RtcEngine._callMethod('unregisterMediaMetadataObserver');
  }
  


  addVideoWatermark(watermarkUrl, options) {
    return RtcEngine._callMethod('addVideoWatermark', {
      watermarkUrl,
      options
    });
  }
  


  clearVideoWatermarks() {
    return RtcEngine._callMethod('clearVideoWatermarks');
  }
  


  enableEncryption(enabled, config) {
    return RtcEngine._callMethod('enableEncryption', {
      enabled,
      config
    });
  }
  


  setEncryptionMode(encryptionMode) {
    return RtcEngine._callMethod('setEncryptionMode', {
      encryptionMode
    });
  }
  


  setEncryptionSecret(secret) {
    return RtcEngine._callMethod('setEncryptionSecret', {
      secret
    });
  }
  


  startAudioRecording(filePath, sampleRate, quality) {
    return RtcEngine._callMethod('startAudioRecording', {
      filePath,
      sampleRate,
      quality
    });
  }
  


  startAudioRecordingWithConfig(config) {
    return RtcEngine._callMethod('startAudioRecording', {
      config
    });
  }
  


  startRhythmPlayer(sound1, sound2, config) {
    return RtcEngine._callMethod('startRhythmPlayer', {
      sound1,
      sound2,
      config
    });
  }
  


  stopRhythmPlayer() {
    return RtcEngine._callMethod('stopRhythmPlayer');
  }
  


  configRhythmPlayer(config) {
    return RtcEngine._callMethod('configRhythmPlayer', config);
  }
  


  stopAudioRecording() {
    return RtcEngine._callMethod('stopAudioRecording');
  }
  


  addInjectStreamUrl(url, config) {
    return RtcEngine._callMethod('addInjectStreamUrl', {
      url,
      config
    });
  }
  


  removeInjectStreamUrl(url) {
    return RtcEngine._callMethod('removeInjectStreamUrl', {
      url
    });
  }
  


  enableFaceDetection(enable) {
    return RtcEngine._callMethod('enableFaceDetection', {
      enable
    });
  }
  


  getCameraMaxZoomFactor() {
    return RtcEngine._callMethod('getCameraMaxZoomFactor');
  }
  


  isCameraAutoFocusFaceModeSupported() {
    return RtcEngine._callMethod('isCameraAutoFocusFaceModeSupported');
  }
  


  isCameraExposurePositionSupported() {
    return RtcEngine._callMethod('isCameraExposurePositionSupported');
  }
  


  isCameraFocusSupported() {
    return RtcEngine._callMethod('isCameraFocusSupported');
  }
  


  isCameraTorchSupported() {
    return RtcEngine._callMethod('isCameraTorchSupported');
  }
  


  isCameraZoomSupported() {
    return RtcEngine._callMethod('isCameraZoomSupported');
  }
  


  setCameraAutoFocusFaceModeEnabled(enabled) {
    return RtcEngine._callMethod('setCameraAutoFocusFaceModeEnabled', {
      enabled
    });
  }
  


  setCameraCapturerConfiguration(config) {
    return RtcEngine._callMethod('setCameraCapturerConfiguration', {
      config
    });
  }
  


  setCameraExposurePosition(positionXinView, positionYinView) {
    return RtcEngine._callMethod('setCameraExposurePosition', {
      positionXinView,
      positionYinView
    });
  }
  


  setCameraFocusPositionInPreview(positionX, positionY) {
    return RtcEngine._callMethod('setCameraFocusPositionInPreview', {
      positionX,
      positionY
    });
  }
  


  setCameraTorchOn(isOn) {
    return RtcEngine._callMethod('setCameraTorchOn', {
      isOn
    });
  }
  


  setCameraZoomFactor(factor) {
    return RtcEngine._callMethod('setCameraZoomFactor', {
      factor
    });
  }
  


  switchCamera() {
    return RtcEngine._callMethod('switchCamera');
  }
  


  createDataStream(reliable, ordered) {
    return RtcEngine._callMethod('createDataStream', {
      reliable,
      ordered
    });
  }
  


  createDataStreamWithConfig(config) {
    return RtcEngine._callMethod('createDataStream', {
      config
    });
  }
  


  sendStreamMessage(streamId, message) {
    return RtcEngine._callMethod('sendStreamMessage', {
      streamId,
      message
    });
  }
  


  sendCustomReportMessage(id, category, event, label, value) {
    return RtcEngine._callMethod('sendCustomReportMessage', {
      id,
      category,
      event,
      label,
      value
    });
  }
  


  setAudioSessionOperationRestriction(restriction) {
    return RtcEngine._callMethod('setAudioSessionOperationRestriction', {
      restriction
    });
  }
  


  getNativeHandle() {
    return RtcEngine._callMethod('getNativeHandle');
  }
  


  enableDeepLearningDenoise(enabled) {
    return RtcEngine._callMethod('enableDeepLearningDenoise', {
      enabled
    });
  }
  


  setCloudProxy(proxyType) {
    return RtcEngine._callMethod('setCloudProxy', {
      proxyType
    });
  }
  


  uploadLogFile() {
    return RtcEngine._callMethod('uploadLogFile');
  }
  


  setAudioEffectParameters(preset, param1, param2) {
    return RtcEngine._callMethod('setAudioEffectParameters', {
      preset,
      param1,
      param2
    });
  }
  


  setVoiceBeautifierParameters(preset, param1, param2) {
    return RtcEngine._callMethod('setVoiceBeautifierParameters', {
      preset,
      param1,
      param2
    });
  }
  


  setAudioEffectPreset(preset) {
    return RtcEngine._callMethod('setAudioEffectPreset', {
      preset
    });
  }
  


  setVoiceBeautifierPreset(preset) {
    return RtcEngine._callMethod('setVoiceBeautifierPreset', {
      preset
    });
  }
  


  setVoiceConversionPreset(preset) {
    return RtcEngine._callMethod('setVoiceConversionPreset', {
      preset
    });
  }

}



exports.default = RtcEngine;
