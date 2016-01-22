// Connecting to ROS
// -----------------
var ros = new ROSLIB.Ros({
  url : 'ws://robotik.ddns.net:9090'
});

ros.on('connection', function() {
  console.log('Connected to rosbridge websocket server.');
  $.notify("Connected to rosbridge websocket server.", "success");
});

ros.on('error', function(error) {
  console.log('Error connecting to rosbridge websocket server: ', error);
  $.notify("Error connecting to rosbridge websocket server!", "error");
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
  $.notify("Connection to websocket server closed.", "warn");
});