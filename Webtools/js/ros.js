window.onload = function()
{

$.notify.defaults({gap:2,autoHideDelay: 5000})

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

// Subscribing to a Topic
// ----------------------

var listener_md49data = new ROSLIB.Topic({
  ros : ros,
  name : '/md49_data',
  messageType : 'custom_messages/md49_data'
});
$.notify("Subscribed topic: /md49_data", "info");


listener_md49data.subscribe(function(message) {
  //console.log('Received message on ' + listener_md49data.name + ': ' +'speed_l:'+ message.current_l + ' speed_r:' + message.speed_r );
  document.getElementById('Motor_l-0').innerHTML=message.speed_l;
  document.getElementById('Motor_r-0').innerHTML=message.speed_r;
  document.getElementById('Motor_l-1').innerHTML=message.current_l*10 + 'mA';
  document.getElementById('Motor_r-1').innerHTML=message.current_r*10 + 'mA';
  //document.getElementById('id_current_left').innerHTML=message.volts + ' V';
  //listener_md49data.unsubscribe();
});


var listener_md49encoders = new ROSLIB.Topic({
  ros : ros,
  name : '/md49_encoders',
  messageType : 'custom_messages/md49_encoders'
});
$.notify("Subscribed topic: /md49_encoders", "info");

listener_md49encoders.subscribe(function(encoder_message) {
  //console.log('Received message on ' + listener_md49encoders.name);
  document.getElementById('encoder_l').innerHTML=encoder_message.encoder_l;
  document.getElementById('l_byte_1').innerHTML=encoder_message.encoderbyte1l;
  document.getElementById('l_byte_2').innerHTML=encoder_message.encoderbyte2l;
  document.getElementById('l_byte_3').innerHTML=encoder_message.encoderbyte3l;
  document.getElementById('l_byte_4').innerHTML=encoder_message.encoderbyte4l;
  document.getElementById('encoder_r').innerHTML=encoder_message.encoder_r;
  document.getElementById('r_byte_1').innerHTML=encoder_message.encoderbyte1r;
  document.getElementById('r_byte_2').innerHTML=encoder_message.encoderbyte2r;
  document.getElementById('r_byte_3').innerHTML=encoder_message.encoderbyte3r;
  document.getElementById('r_byte_4').innerHTML=encoder_message.encoderbyte4r;
  //listener_md49encoders.unsubscribe();
});

}

