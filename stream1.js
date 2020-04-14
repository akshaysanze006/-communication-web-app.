

function setTranscodingConfig() {
  console.log("save rtmp config"); 
  var width = parseInt($('#window-scale-width').val(), 10);
  var height = parseInt($('#window-scale-height').val(), 10);
  var configRtmp = {
    width: width,
    height: height,
    videoBitrate: parseInt($('#video-bitrate').val(), 10),
    videoFramerate: parseInt($('#framerate').val(), 10),
    lowLatency: ($('#low-latancy').val() === 'true'),
    audioSampleRate: parseInt($('#audio-sample-rate').val(), 10),
    audioBitrate: parseInt($('#audio-bitrate').val(), 10),
    audioChannels: parseInt($('#audio-channels').val(), 10),
    videoGop: parseInt($('#video-gop').val(), 10),
    videoCodecProfile: parseInt($('#video-codec-profile').val(), 10),
    userCount: 1,
    userConfigExtraInfo: {},
    backgroundColor: parseInt($('#background-color-picker').val(), 16),
    transcodingUsers: [{
      uid: localStreams.uid,
      alpha: 1,
      width: width,
      height: height,
      x: 0,
      y: 0,
      zOrder: 0
    }],
  };

  // set live transcoding config
  client.setLiveTranscoding(configRtmp);
  
}
