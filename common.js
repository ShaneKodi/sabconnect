function setPref(key, value) {
  var config = {};
  if (localStorage.config) {
    config = JSON.parse(localStorage.config);
  }
  config[key] = value;
  localStorage.config = JSON.stringify(config);
}
function getPref(key) {
  if (!localStorage.config) {
    return undefined;
  }
  var config = JSON.parse(localStorage.config);
  return config[key];
}
function fileSizes(value, decimals){
    // Set the default decimals to 2
    if(decimals == undefined)
        decimals = 2;

    kb = value / 1024
    mb = value / 1048576
    gb = value / 1073741824
    if (gb >= 1){
        return gb.toFixed(decimals)+"GB"
    } else if (mb >= 1) {
        return mb.toFixed(decimals)+"MB"
    } else {
        return kb.toFixed(decimals)+"KB"
    }
}       //file size formatter - takes an input in bytes

var gConfig = new Object();
var active_daemon;
var last_queueinfo;

try{
  active_daemon = getPref('daemons')[0];
}catch (e){
  active_daemon = {label:'default.localhost',url:'localhost:8080/sabnzbd',apikey:''};
}


// Load the config objects into memory since we cannot access them directly in content scripts yet

sendMessage('active_daemon');
sendMessage('enable_newzbin');
sendMessage('enable_tvnzb');
sendMessage('enable_nzbmatrix');



function sendMessage(key) {
    // Create a short-lived named channel to the extension and send a single
    // message through it.
    var port = chrome.extension.connect({name: "notifyChannel"});
    port.postMessage({get: key});
}

// Also listen for new channels from the extension for when the button is
// pressed.
chrome.extension.onConnect.addListener(function(port, name) {
  port.onMessage.addListener(function(msg) {
    if (msg.value) {
        gConfig[msg.key] = msg.value;
    }
  });
});




var clearQueue = false;

function clearInfo(){
	if (clearQueue == true){return;}
	clearQueue = true;
	$('#sabInfo').html('');
}



/*
      setPref('timeleft', data.queue.timeleft);
      setPref('speed', speed);
      setPref('sizeleft', queueSize);
      setPref('queue', data.queue.slots);
      setPref('status', data.queue.status);
      setPref('paused', data.queue.paused);

      if(data.queue.mbleft && data.queue.mbleft > 0) {
            // Convert to bytes
            var bytesLeft = data.queue.mbleft*1048576;
            var queueSize = fileSizes(bytesLeft);
          } else {
            var queueSize = '';
          }

   */
    /*
    // Do not run this on a quickUpdate (unscheduled refresh)
    if(!quickUpdate) {
      var speedlog = getPref('speedlog');

      if(speedlog.length >= 10) {
      // Only allow 10 values, if at our limit, remove the first value (oldest)
      speedlog.shift()
      }

      speedlog.push(data.queue.kbpersec);
      setPref('speedlog', speedlog);
    }
    */