function validate_left_current_chart(){
  var remember = document.getElementById('Enable_left_current_chart');
  if (remember.checked){
      $.notify("Enabled left drive current realtimechart", "success");
  }else{
      $.notify("Disabled left drive current realtimechart", "warn");
  }
};

function validate_right_current_chart(){
  var remember = document.getElementById('Enable_right_current_chart');
  if (remember.checked){
      $.notify("Enabled right drive current realtimechart", "success");
  }else{
      $.notify("Disabled right drive current realtimechart", "warn");
  }
};

//window.onload = function()
//$(document).ready = function()
//{

// Current Right Chart
// -------------------
var dps_right_current = []; // dataPoints

var chart_right_current = new CanvasJS.Chart("right_current",{
  title :{
    text: "Current Right"
  },
  axisY:{
   maximum: 100,
  },        
  data: [{
    type: "line",
    dataPoints: dps_right_current 
  }]
});

var xVal_right_current = 0;
var yVal_right_current = 0; 
var dataLength_right_current = 1500; // number of dataPoints visible at any point

var updateChart_right_current = function (count_right_current) {
  count_right_current = count_right_current || 1;
  var remember = document.getElementById('Enable_right_current_chart');
  if (remember.checked){
    dps_right_current.push({
    x: xVal_right_current,
    y: yVal_right_current
    });
    xVal_right_current++;
    if (dps_right_current.length > dataLength_right_current)
    {
      dps_right_current.shift();        
    }
    
    chart_right_current.render(); 
  }    
};

// Current Left Chart
// -------------------
var dps_left_current = []; // dataPoints

var chart_left_current = new CanvasJS.Chart("left_current",{
  title :{
    text: "Current Left"
  },
  axisY:{
   maximum: 100,
  },      
  data: [{
    type: "line",
    dataPoints: dps_left_current 
  }]
});

var xVal_left_current = 0;
var yVal_left_current = 0; 
var dataLength_left_current = 1500; // number of dataPoints visible at any point

var updateChart_left_current = function (count_left_current) {
  count_left_current = count_left_current || 1;
  var remember = document.getElementById('Enable_left_current_chart');
  if (remember.checked){
    dps_left_current.push({
      x: xVal_left_current,
      y: yVal_left_current
    });
    xVal_left_current++;
    if (dps_left_current.length > dataLength_left_current)
    {
      dps_left_current.shift();        
    }
    
    chart_left_current.render();
  } 
};

// Set defaults for notify
// -----------------------
$.notify.defaults({gap:2,autoHideDelay: 5000})



// Subscribing to topic md49_data
// ------------------------------
var listener_md49data = new ROSLIB.Topic({
  ros : ros,
  name : '/md49_data',
  messageType : 'md49_messages/md49_data'
});
$.notify("Subscribed topic: /md49_data", "info");


listener_md49data.subscribe(function(message) {
  //console.log('Received message on ' + listener_md49data.name + ': ' +'speed_l:'+ message.current_l + ' speed_r:' + message.speed_r );
  document.getElementById('speed_l').innerHTML=message.speed_l;
  document.getElementById('speed_r').innerHTML=message.speed_r;
  document.getElementById('current_l').innerHTML=message.current_l*10 + 'mA';
  yVal_left_current=message.current_l*10;
  updateChart_left_current();
  document.getElementById('current_r').innerHTML=message.current_r*10 + 'mA';
  yVal_right_current=message.current_r*10;
  updateChart_right_current();
  //document.getElementById('id_current_left').innerHTML=message.volts + ' V';
  //listener_md49data.unsubscribe();
});

// Subscribing to topic md49_encoders
// ----------------------------------
var listener_md49encoders = new ROSLIB.Topic({
  ros : ros,
  name : '/md49_encoders',
  messageType : 'md49_messages/md49_encoders'
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

//}

