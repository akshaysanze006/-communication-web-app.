houldn’t be assumed that a broadcaster will always have a published stream. In that same breath it can’t be assumed that an audience member will never try to publish a stream (consider someone trying to hack and inject their stream into the broadcast).

  // create audience client and set the client role
  var audienceClient = AgoraRTC.createClient({mode: 'live', codec: 'vp8'}); 
  
  audienceClient.setClientRole('audience', function() {
    console.log('Client role set to audience');
  }, function(e) {
    console.log('setClientRole failed', e);
  });
view raw.js hosted with ❤ by GitHub
We’ll also need to add event listeners for the various engine events that Agora’s SDK provides. Most of the events should look familiar, as the broadcaster has all of the same controls as a video chat web-app, plus a few extras. We have liveStreamingStarted, liveStreamingFailed, liveStreamingStopped, liveTranscodingUpdated, and streamInjectedStatusas the new events. These events are related to the Agora’s ability to push out to external RTMP server or to pull in an external RTMP stream.

client.on('stream-published', function (evt) {
  console.log('Publish local stream successfully');
});

// when a remote stream is added
client.on('stream-added', function (evt) {
  console.log('new stream added: ' + evt.stream.getId());
});

client.on('stream-removed', function (evt) {
  var stream = evt.stream;
  stream.stop(); // stop the stream
  stream.close(); // clean up and close the camera stream
  console.log("Remote stream is removed " + stream.getId());
});

//live transcoding events..
client.on('liveStreamingStarted', function (evt) {
  console.log("Live streaming started");
}); 

client.on('liveStreamingFailed', function (evt) {
  console.log("Live streaming failed");
}); 

client.on('liveStreamingStopped', function (evt) {
  console.log("Live streaming stopped");
});

client.on('liveTranscodingUpdated', function (evt) {
  console.log("Live streaming updated");
}); 

// ingested live stream 
client.on('streamInjectedStatus', function (evt) {
  console.log("Injected Steram Status Updated");
  console.log(JSON.stringify(evt));
}); 

// when a remote stream leaves the channel
client.on('peer-leave', function(evt) {
  console.log('Remote stream has left the channel: ' + evt.stream.getId());
});

// show mute icon whenever a remote has muted their mic
client.on('mute-audio', function (evt) {
  console.log('Mute Audio for: ' + evt.uid);
});

client.on('unmute-audio', function (evt) {
  console.log('Unmute Audio for: ' + evt.uid);
});

// show user icon whenever a remote has disabled their video
client.on('mute-video', function (evt) {
  console.log('Mute Video for: ' + evt.uid);
});

client.on('unmute-video', function (evt) {
  console.log('Unmute Video for: ' + evt.uid);
});
