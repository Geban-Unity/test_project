const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

console.log("Server started");
var sender = "test";
var reciever = "geban";
var jumps = "1";
var type = "txt";
var ID = "063912201";
var region = "RU-KRD";
var text = "test message";
var test = new String()

var SerialData;

var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8181});


const port = new SerialPort({ path: '/dev/ttyUSB1', baudRate: 9600,})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', function(data) {
  SerialData = String(data);
  console.log("/nData: " + SerialData);

});

var Msg = '';
var str="\uffff"+
sender+"\n"+
reciever+"\n"+
jumps+"\n"+
type+"\n"+
ID+"\n"+
region+"\n"+
text+"\uffff";





  port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message)
    }
    console.log('main screen turn on')
  })




    wss.on('connection', function(ws) {
      
      // port.on('data', function (data) {
      //   //console.log('Serial Data:', port.read())
      //   SerialData = String(data);
      //   // console.log(SerialData);
      // })
      if(SerialData > 0) { ws.send(SerialData) }
      ws.on('message', function(message) {
        console.log('Received from client: %s\r\n', message);
        port.write(message);
        console.log("\r\nData: \r\n" + SerialData);

    });
 });