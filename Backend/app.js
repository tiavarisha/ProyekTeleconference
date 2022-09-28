const express = require('express');
const cors = require('cors')

const app = express();

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
  url: `rtsp://admin:@192.168.1.1:554/live/ch00_0`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
});

app.use(cors());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:2000');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// the endpoint our RTSP uses
app.ws('/api/stream', handler);

// this is an example html page to view the stream
app.get('/', (req, res) =>
  res.send(`
  <canvas id='channel1' ></canvas>
  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://' + location.host + '/api/stream',
      canvas: document.getElementById('channel1')
    });
  </script>
`)
);

app.listen(2000);

 var HOSTNAME = '192.168.1.1',
 PORT = 8899,
 USERNAME = 'admin',
 PASSWORD = '',
 STOP_DELAY_MS = 50;

var Cam = require('./node_modules/onvif/lib/onvif').Cam;
var keypress = require('keypress');

new Cam({
 hostname: HOSTNAME,
 username: USERNAME,
 password: PASSWORD,
 port: PORT,
 timeout: 10000
}, function CamFunc(err) {
 if (err) {
   console.log(err);
   return;
 }

 var cam_obj = this;
 var stop_timer;
 var ignore_keypress = false;

 cam_obj.getStreamUri({
   protocol: 'RTSP'
 },	// Completion callback function
 // This callback is executed once we have a StreamUri
 function(err, stream, xml) {
   if (err) {
     console.log(err);
     return;
   } else {
     console.log('------------------------------');
     console.log('Host: ' + HOSTNAME + ' Port: ' + PORT);
     console.log('Stream: = ' + stream.uri);
     console.log('------------------------------');

     // start processing the keyboard
     read_and_process_keyboard();
   }
 }
 );

 function read_and_process_keyboard() {
   // listen for the "keypress" events
   keypress(process.stdin);
   process.stdin.setRawMode(true);
   process.stdin.resume();

   console.log('');
   console.log('Use Cursor Keys to move camera. + and - to zoom. q to quit');

   // keypress handler
   process.stdin.on('keypress', function(ch, key) {

     /* Exit on 'q' or 'Q' or 'CTRL C' */
     if ((key && key.ctrl && key.name == 'c')
       || (key && key.name == 'q')) {
       process.exit();
     }

     if (ignore_keypress) {
       return;
     }

     if (key) {
       console.log('got "keypress"',key.name);
     } else {
       if (ch){console.log('got "keypress character"',ch);}
     }


     // On English keyboards '+' is "Shift and = key"
     // Accept the "=" key as zoom in
     if (key && key.name == 'up') {
       move(0,1,0,'up');
     } else if (key && key.name == 'down') {
       move(0,-1,0,'down');
     } else if (key && key.name == 'left') {
       move(-1,0,0,'left');
     } else if (key && key.name == 'right') {
       move(1,0,0,'right');
     } else if (ch  && ch       == '-') {
       move(0,0,-1,'zoom out');
     } else if (ch  && ch       == '+') {
       move(0,0,1,'zoom in');
     } else if (ch  && ch       == '=') {
       move(0,0,1,'zoom in');
     } else if (ch  && ch >= '1' && ch <= '9') {
       goto_preset(ch);
     }
   });
 }


 function move(x_speed, y_speed, zoom_speed, msg) {

   ignore_keypress = true;

   if (stop_timer) {clearTimeout(stop_timer);}

   console.log('sending move command ' + msg);
   cam_obj.continuousMove({x: x_speed,
     y: y_speed,
     zoom: zoom_speed } ,
   // completion callback function
   function(err, stream, xml) {
     if (err) {
       console.log(err);
     } else {
       console.log('move command sent ' + msg);
       // schedule a Stop command to run in the future 
       stop_timer = setTimeout(stop,STOP_DELAY_MS);
     }
     // Resume keyboard processing
     ignore_keypress = false;
   });
 }

 function stop() {
   // send a stop command, stopping Pan/Tilt and stopping zoom
   console.log('sending stop command');
   cam_obj.stop({panTilt: true, zoom: true},
     function(err,stream, xml){
       if (err) {
         console.log(err);
       } else {
         console.log('stop command sent');
       }
     });
 }

});