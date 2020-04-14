var broadcastClient = AgoraRTC.createClient({mode: 'live', codec: 'vp8'}); 
    
  broadcastClient.setClientRole('host', function() {
    console.log('Client role set as host.');
  }, function(e) {
    console.log('setClientRole failed', e);
  });
