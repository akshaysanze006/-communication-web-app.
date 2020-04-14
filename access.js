

// The user has granted access to the camera and mic.
localStream.on("accessAllowed", function() {
  if(devices.cameras.length === 0 && devices.mics.length === 0) {
    console.log('[DEBUG] : checking for cameras & mics');
    getCameraDevices();
    getMicDevices();
  }
  console.log("accessAllowed");
});

function getCameraDevices() {
  console.log("Checking for Camera Devices.....")
  client.getCameras (function(cameras) {
    devices.cameras = cameras; // store cameras array
    cameras.forEach(function(camera, i){
      var name = camera.label.split('(')[0];
      var optionId = 'camera_' + i;
      var deviceId = camera.deviceId;
      if(i === 0 && localStreams.camera.camId === ''){
        localStreams.camera.camId = deviceId;
      }
      $('#camera-list').append('<a class="dropdown-item" id="' + optionId + '">' + name + '</a>');
    });
    $('#camera-list a').click(function(event) {
      var index = event.target.id.split('_')[1];
      changeStreamSource ({camIndex: index});
    });
  });
}

function getMicDevices() {
  console.log("Checking for Mic Devices.....")
  client.getRecordingDevices(function(mics) {
    devices.mics = mics; // store mics array
    mics.forEach(function(mic, i){
      var name = mic.label.split('(')[0];
      var optionId = 'mic_' + i;
      var deviceId = mic.deviceId;
      if(i === 0 && localStreams.camera.micId === ''){
        localStreams.camera.micId = deviceId;
      }
      if(name.split('Default - ')[1] != undefined) {
        name = '[Default Device]' // rename the default mic - only appears on Chrome & Opera
      }
      $('#mic-list').append('<a class="dropdown-item" id="' + optionId + '">' + name + '</a>');
    }); 
    $('#mic-list a').click(function(event) {
      var index = event.target.id.split('_')[1];
      changeStreamSource ({micIndex: index});
    });
  });
}
