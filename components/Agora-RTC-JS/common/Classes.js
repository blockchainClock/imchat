"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioRecordingConfiguration = exports.RtcEngineConfig = exports.RtcEngineContext = exports.DataStreamConfig = exports.LogConfig = exports.ClientRoleOptions = exports.EncryptionConfig = exports.ChannelMediaOptions = exports.CameraCapturerConfiguration = exports.RhythmPlayerConfig = exports.LiveInjectStreamConfig = exports.WatermarkOptions = exports.Rectangle = exports.LastmileProbeConfig = exports.ChannelMediaRelayConfiguration = exports.ChannelMediaInfo = exports.LiveTranscoding = exports.Color = exports.TranscodingUser = exports.AgoraImage = exports.BeautyOptions = exports.VideoEncoderConfiguration = exports.VideoDimensions = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class VideoDimensions {
  

  
  constructor(params) {
    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    if (params) {
      this.width = params.width;
      this.height = params.height;
    }
  }

}



exports.VideoDimensions = VideoDimensions;

class VideoEncoderConfiguration {
  

  

  

  

  

  

  

  
  constructor(params) {
    _defineProperty(this, "dimensions", void 0);

    _defineProperty(this, "frameRate", void 0);

    _defineProperty(this, "minFrameRate", void 0);

    _defineProperty(this, "bitrate", void 0);

    _defineProperty(this, "minBitrate", void 0);

    _defineProperty(this, "orientationMode", void 0);

    _defineProperty(this, "degradationPrefer", void 0);

    _defineProperty(this, "mirrorMode", void 0);

    if (params) {
      this.dimensions = params.dimensions;
      this.frameRate = params.frameRate;
      this.minFrameRate = params.minFrameRate;
      this.bitrate = params.bitrate;
      this.minBitrate = params.minBitrate;
      this.orientationMode = params.orientationMode;
      this.degradationPrefer = params.degradationPrefer;
      this.mirrorMode = params.mirrorMode;
    }
  }

}



exports.VideoEncoderConfiguration = VideoEncoderConfiguration;

class BeautyOptions {
  

  

  

  
  constructor(params) {
    _defineProperty(this, "lighteningContrastLevel", void 0);

    _defineProperty(this, "lighteningLevel", void 0);

    _defineProperty(this, "smoothnessLevel", void 0);

    _defineProperty(this, "rednessLevel", void 0);

    if (params) {
      this.lighteningContrastLevel = params.lighteningContrastLevel;
      this.lighteningLevel = params.lighteningLevel;
      this.smoothnessLevel = params.smoothnessLevel;
      this.rednessLevel = params.rednessLevel;
    }
  }

}



exports.BeautyOptions = BeautyOptions;

class AgoraImage {
  

  

  

  

  
  constructor(url, params) {
    _defineProperty(this, "url", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    this.url = url;

    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
    }
  }

}



exports.AgoraImage = AgoraImage;

class TranscodingUser {
  

  

  

  

  

  

  

  
  constructor(uid, params) {
    _defineProperty(this, "uid", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "zOrder", void 0);

    _defineProperty(this, "alpha", void 0);

    _defineProperty(this, "audioChannel", void 0);

    this.uid = uid;

    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
      this.zOrder = params.zOrder;
      this.alpha = params.alpha;
      this.audioChannel = params.audioChannel;
    }
  }

}



exports.TranscodingUser = TranscodingUser;

class Color {
  

  

  
  constructor(red, green, blue) {
    _defineProperty(this, "red", void 0);

    _defineProperty(this, "green", void 0);

    _defineProperty(this, "blue", void 0);

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

}



exports.Color = Color;

class LiveTranscoding {
  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  
  constructor(transcodingUsers, params) {
    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "videoBitrate", void 0);

    _defineProperty(this, "videoFramerate", void 0);

    _defineProperty(this, "lowLatency", void 0);

    _defineProperty(this, "videoGop", void 0);

    _defineProperty(this, "watermark", void 0);

    _defineProperty(this, "backgroundImage", void 0);

    _defineProperty(this, "audioSampleRate", void 0);

    _defineProperty(this, "audioBitrate", void 0);

    _defineProperty(this, "audioChannels", void 0);

    _defineProperty(this, "audioCodecProfile", void 0);

    _defineProperty(this, "videoCodecProfile", void 0);

    _defineProperty(this, "backgroundColor", void 0);

    _defineProperty(this, "userConfigExtraInfo", void 0);

    _defineProperty(this, "transcodingUsers", void 0);

    if (params) {
      this.width = params.width;
      this.height = params.height;
      this.videoBitrate = params.videoBitrate;
      this.videoFramerate = params.videoFramerate;
      this.lowLatency = params.lowLatency;
      this.videoGop = params.videoGop;
      this.watermark = params.watermark;
      this.backgroundImage = params.backgroundImage;
      this.audioSampleRate = params.audioSampleRate;
      this.audioBitrate = params.audioBitrate;
      this.audioChannels = params.audioChannels;
      this.audioCodecProfile = params.audioCodecProfile;
      this.videoCodecProfile = params.videoCodecProfile;
      this.backgroundColor = params.backgroundColor;
      this.userConfigExtraInfo = params.userConfigExtraInfo;
    }

    this.transcodingUsers = transcodingUsers;
  }

}



exports.LiveTranscoding = LiveTranscoding;

class ChannelMediaInfo {
  

  

  
  constructor(channelName, uid, params) {
    _defineProperty(this, "channelName", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "uid", void 0);

    this.channelName = channelName;

    if (params) {
      this.token = params.token;
    }

    this.uid = uid;
  }

}



exports.ChannelMediaInfo = ChannelMediaInfo;

class ChannelMediaRelayConfiguration {
  

  
  constructor(srcInfo, destInfos) {
    _defineProperty(this, "srcInfo", void 0);

    _defineProperty(this, "destInfos", void 0);

    this.srcInfo = srcInfo;
    this.destInfos = destInfos;
  }

}



exports.ChannelMediaRelayConfiguration = ChannelMediaRelayConfiguration;

class LastmileProbeConfig {
  

  

  

  
  constructor(probeUplink, probeDownlink, expectedUplinkBitrate, expectedDownlinkBitrate) {
    _defineProperty(this, "probeUplink", void 0);

    _defineProperty(this, "probeDownlink", void 0);

    _defineProperty(this, "expectedUplinkBitrate", void 0);

    _defineProperty(this, "expectedDownlinkBitrate", void 0);

    this.probeUplink = probeUplink;
    this.probeDownlink = probeDownlink;
    this.expectedUplinkBitrate = expectedUplinkBitrate;
    this.expectedDownlinkBitrate = expectedDownlinkBitrate;
  }

}



exports.LastmileProbeConfig = LastmileProbeConfig;

class Rectangle {
  

  

  

  
  constructor(params) {
    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
    }
  }

}



exports.Rectangle = Rectangle;

class WatermarkOptions {
  

  

  
  constructor(params) {
    _defineProperty(this, "visibleInPreview", void 0);

    _defineProperty(this, "positionInLandscapeMode", void 0);

    _defineProperty(this, "positionInPortraitMode", void 0);

    if (params) {
      this.visibleInPreview = params.visibleInPreview;
      this.positionInLandscapeMode = params.positionInLandscapeMode;
      this.positionInPortraitMode = params.positionInPortraitMode;
    }
  }

}



exports.WatermarkOptions = WatermarkOptions;

class LiveInjectStreamConfig {
  

  

  

  

  

  

  

  
  constructor(params) {
    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "videoGop", void 0);

    _defineProperty(this, "videoFramerate", void 0);

    _defineProperty(this, "videoBitrate", void 0);

    _defineProperty(this, "audioSampleRate", void 0);

    _defineProperty(this, "audioBitrate", void 0);

    _defineProperty(this, "audioChannels", void 0);

    if (params) {
      this.width = params.width;
      this.height = params.height;
      this.videoGop = params.videoGop;
      this.videoFramerate = params.videoFramerate;
      this.videoBitrate = params.videoBitrate;
      this.audioSampleRate = params.audioSampleRate;
      this.audioBitrate = params.audioBitrate;
      this.audioChannels = params.audioChannels;
    }
  }

}



exports.LiveInjectStreamConfig = LiveInjectStreamConfig;

class RhythmPlayerConfig {
  

  

  
  constructor(params) {
    _defineProperty(this, "beatsPerMeasure", void 0);

    _defineProperty(this, "beatsPerMinute", void 0);

    _defineProperty(this, "publish", void 0);

    if (params) {
      this.beatsPerMeasure = params.beatsPerMeasure;
      this.beatsPerMinute = params.beatsPerMinute;
      this.publish = params.publish;
    }
  }

}



exports.RhythmPlayerConfig = RhythmPlayerConfig;

class CameraCapturerConfiguration {
  

  

  

  
  constructor(params) {
    _defineProperty(this, "preference", void 0);

    _defineProperty(this, "captureWidth", void 0);

    _defineProperty(this, "captureHeight", void 0);

    _defineProperty(this, "cameraDirection", void 0);

    if (params) {
      this.preference = params.preference;
      this.captureWidth = params.captureWidth;
      this.captureHeight = params.captureHeight;
      this.cameraDirection = params.cameraDirection;
    }
  }

}



exports.CameraCapturerConfiguration = CameraCapturerConfiguration;

class ChannelMediaOptions {
  

  

  

  
  constructor(params) {
    _defineProperty(this, "autoSubscribeAudio", void 0);

    _defineProperty(this, "autoSubscribeVideo", void 0);

    _defineProperty(this, "publishLocalAudio", void 0);

    _defineProperty(this, "publishLocalVideo", void 0);

    if (params) {
      this.autoSubscribeAudio = params.autoSubscribeAudio;
      this.autoSubscribeVideo = params.autoSubscribeVideo;
      this.publishLocalAudio = params.publishLocalAudio;
      this.publishLocalVideo = params.publishLocalVideo;
    }
  }

}



exports.ChannelMediaOptions = ChannelMediaOptions;

class EncryptionConfig {
  

  

  
  constructor(params) {
    _defineProperty(this, "encryptionMode", void 0);

    _defineProperty(this, "encryptionKey", void 0);

    _defineProperty(this, "encryptionKdfSalt", void 0);

    if (params) {
      this.encryptionMode = params.encryptionMode;
      this.encryptionKey = params.encryptionKey;
      this.encryptionKdfSalt = params.encryptionKdfSalt;
    }
  }

}



exports.EncryptionConfig = EncryptionConfig;


class ClientRoleOptions {
  
  constructor(params) {
    _defineProperty(this, "audienceLatencyLevel", void 0);

    if (params) {
      this.audienceLatencyLevel = params.audienceLatencyLevel;
    }
  }

}



exports.ClientRoleOptions = ClientRoleOptions;

class LogConfig {
  

  

  
  constructor(params) {
    _defineProperty(this, "filePath", void 0);

    _defineProperty(this, "fileSize", void 0);

    _defineProperty(this, "level", void 0);

    if (params) {
      this.filePath = params.filePath;
      this.fileSize = params.fileSize;
      this.level = params.level;
    }
  }

}



exports.LogConfig = LogConfig;

class DataStreamConfig {
  

  
  constructor(syncWithAudio, ordered) {
    _defineProperty(this, "syncWithAudio", void 0);

    _defineProperty(this, "ordered", void 0);

    this.syncWithAudio = syncWithAudio;
    this.ordered = ordered;
  }

}



exports.DataStreamConfig = DataStreamConfig;

class RtcEngineContext {
  

  

  
  constructor(appId, params) {
    _defineProperty(this, "appId", void 0);

    _defineProperty(this, "areaCode", void 0);

    _defineProperty(this, "logConfig", void 0);

    this.appId = appId;

    if (params) {
      this.areaCode = params.areaCode;
      this.logConfig = params.logConfig;
    }
  }

}



exports.RtcEngineContext = RtcEngineContext;

class RtcEngineConfig extends RtcEngineContext {}



exports.RtcEngineConfig = RtcEngineConfig;

class AudioRecordingConfiguration {
  

  

  

  
  constructor(filePath, params) {
    _defineProperty(this, "filePath", void 0);

    _defineProperty(this, "recordingQuality", void 0);

    _defineProperty(this, "recordingPosition", void 0);

    _defineProperty(this, "recordingSampleRate", void 0);

    this.filePath = filePath;

    if (params) {
      this.recordingQuality = params.recordingQuality;
      this.recordingPosition = params.recordingPosition;
      this.recordingSampleRate = params.recordingSampleRate;
    }
  }

}

exports.AudioRecordingConfiguration = AudioRecordingConfiguration;
