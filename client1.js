  // create audience client and set the client role
  var audienceClient = AgoraRTC.createClient({mode: 'live', codec: 'vp8'}); 
  
  audienceClient.setClientRole('audience', function() {
    console.log('Client role set to audience');
  }, function(e) {
    console.log('setClientRole failed', e);
  });
