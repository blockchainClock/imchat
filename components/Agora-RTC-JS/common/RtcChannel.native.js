"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const AgoraRtcChannelModule = uni.requireNativePlugin('Agora-RTC-ChannelModule');


const Prefix = 'io.agora.rtc.';



const RtcChannelEvent = uni.requireNativePlugin('globalEvent');


const channels = new Map();


class RtcChannel {
  

  

  
  constructor(channelId) {
    _defineProperty(this, "channelId", void 0);

    _defineProperty(this, "_listeners", new Map());

    this.channelId = channelId;
  }
  


  _callMethod(method, args) {
    return new Promise((resolve, reject) => {
      AgoraRtcChannelModule.callMethod({
        method: method,
        args: {
          channelId: this.channelId,
          ...args
        }
      }, res => {
        if (res && res.code) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    });
  }
  


  static async create(channelId) {
    if (channels.get(channelId)) return channels.get(channelId);
    await new Promise((resolve, reject) => {
      AgoraRtcChannelModule.callMethod({
        method: 'create',
        args: {
          channelId: channelId
        }
      }, res => {
        if (res && res.code) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    });
    channels.set(channelId, new RtcChannel(channelId));
    return channels.get(channelId);
  }
  


  static destroyAll() {
    channels.forEach(async value => {
      value.removeAllListeners();
      await value._callMethod('destroy');
    });
    channels.clear();
  }
  


  destroy() {
    this.removeAllListeners();
    channels.delete(this.channelId);
    return this._callMethod('destroy');
  }
  


  addListener(event, listener) {
    const callback = res => {
      const {
        channelId,
        data
      } = res;

      if (channelId === this.channelId) {
        
        listener(...data);
      }
    };

    let map = this._listeners.get(event);

    if (map === undefined) {
      map = new Map();

      this._listeners.set(event, map);
    }

    RtcChannelEvent.addEventListener(Prefix + event, callback);
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
    RtcChannelEvent.removeEventListener(Prefix + event, map.get(listener));
    map.delete(listener);
  }
  


  removeAllListeners(event) {
    if (event === undefined) {
      this._listeners.forEach((_, key) => {
        RtcChannelEvent.removeAllEventListeners(Prefix + key);
      });

      this._listeners.clear();

      return;
    }

    RtcChannelEvent.removeAllEventListeners(Prefix + event);

    this._listeners.delete(event);
  }
  


  setClientRole(role, options) {
    return this._callMethod('setClientRole', {
      role,
      options
    });
  }
  


  joinChannel(token, optionalInfo, optionalUid, options) {
    return this._callMethod('joinChannel', {
      token,
      optionalInfo,
      optionalUid,
      options
    });
  }
  


  joinChannelWithUserAccount(token, userAccount, options) {
    return this._callMethod('joinChannelWithUserAccount', {
      token,
      userAccount,
      options
    });
  }
  


  leaveChannel() {
    return this._callMethod('leaveChannel');
  }
  


  renewToken(token) {
    return this._callMethod('renewToken', {
      token
    });
  }
  


  getConnectionState() {
    return this._callMethod('getConnectionState');
  }
  


  publish() {
    return this._callMethod('publish');
  }
  


  unpublish() {
    return this._callMethod('unpublish');
  }
  


  getCallId() {
    return this._callMethod('getCallId');
  }
  


  adjustUserPlaybackSignalVolume(uid, volume) {
    return this._callMethod('adjustUserPlaybackSignalVolume', {
      uid,
      volume
    });
  }
  


  muteRemoteAudioStream(uid, muted) {
    return this._callMethod('muteRemoteAudioStream', {
      uid,
      muted
    });
  }
  


  muteAllRemoteAudioStreams(muted) {
    return this._callMethod('muteAllRemoteAudioStreams', {
      muted
    });
  }
  


  setDefaultMuteAllRemoteAudioStreams(muted) {
    return this._callMethod('setDefaultMuteAllRemoteAudioStreams', {
      muted
    });
  }
  


  muteAllRemoteVideoStreams(muted) {
    return this._callMethod('muteAllRemoteVideoStreams', {
      muted
    });
  }
  


  muteRemoteVideoStream(uid, muted) {
    return this._callMethod('muteRemoteVideoStream', {
      uid,
      muted
    });
  }
  


  setDefaultMuteAllRemoteVideoStreams(muted) {
    return this._callMethod('setDefaultMuteAllRemoteVideoStreams', {
      muted
    });
  }
  


  enableRemoteSuperResolution(uid, enable) {
    return this._callMethod('enableRemoteSuperResolution', {
      uid,
      enable
    });
  }
  


  setRemoteVoicePosition(uid, pan, gain) {
    return this._callMethod('setRemoteVoicePosition', {
      uid,
      pan,
      gain
    });
  }
  


  addPublishStreamUrl(url, transcodingEnabled) {
    return this._callMethod('addPublishStreamUrl', {
      url,
      transcodingEnabled
    });
  }
  


  removePublishStreamUrl(url) {
    return this._callMethod('removePublishStreamUrl', {
      url
    });
  }
  


  setLiveTranscoding(transcoding) {
    return this._callMethod('setLiveTranscoding', {
      transcoding
    });
  }
  


  startChannelMediaRelay(channelMediaRelayConfiguration) {
    return this._callMethod('startChannelMediaRelay', {
      channelMediaRelayConfiguration
    });
  }
  


  stopChannelMediaRelay() {
    return this._callMethod('stopChannelMediaRelay');
  }
  


  updateChannelMediaRelay(channelMediaRelayConfiguration) {
    return this._callMethod('updateChannelMediaRelay', {
      channelMediaRelayConfiguration
    });
  }
  


  setRemoteDefaultVideoStreamType(streamType) {
    return this._callMethod('setRemoteDefaultVideoStreamType', {
      streamType
    });
  }
  


  setRemoteVideoStreamType(uid, streamType) {
    return this._callMethod('setRemoteVideoStreamType', {
      uid,
      streamType
    });
  }
  


  setRemoteUserPriority(uid, userPriority) {
    return this._callMethod('setRemoteUserPriority', {
      uid,
      userPriority
    });
  }
  


  registerMediaMetadataObserver() {
    return this._callMethod('registerMediaMetadataObserver');
  }
  


  sendMetadata(metadata) {
    return this._callMethod('sendMetadata', {
      metadata
    });
  }
  


  setMaxMetadataSize(size) {
    return this._callMethod('setMaxMetadataSize', {
      size
    });
  }
  


  unregisterMediaMetadataObserver() {
    return this._callMethod('unregisterMediaMetadataObserver');
  }
  


  enableEncryption(enabled, config) {
    return this._callMethod('enableEncryption', {
      enabled,
      config
    });
  }
  


  setEncryptionMode(encryptionMode) {
    return this._callMethod('setEncryptionMode', {
      encryptionMode
    });
  }
  


  setEncryptionSecret(secret) {
    return this._callMethod('setEncryptionSecret', {
      secret
    });
  }
  


  addInjectStreamUrl(url, config) {
    return this._callMethod('addInjectStreamUrl', {
      url,
      config
    });
  }
  


  removeInjectStreamUrl(url) {
    return this._callMethod('removeInjectStreamUrl', {
      url
    });
  }
  


  createDataStream(reliable, ordered) {
    return this._callMethod('createDataStream', {
      reliable,
      ordered
    });
  }
  


  createDataStreamWithConfig(config) {
    return this._callMethod('createDataStream', {
      config
    });
  }
  


  sendStreamMessage(streamId, message) {
    return this._callMethod('sendStreamMessage', {
      streamId,
      message
    });
  }
  


  muteLocalAudioStream(muted) {
    return this._callMethod('muteLocalAudioStream', {
      muted
    });
  }
  


  muteLocalVideoStream(muted) {
    return this._callMethod('muteLocalVideoStream', {
      muted
    });
  }

}



exports.default = RtcChannel;
