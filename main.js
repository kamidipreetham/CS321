/*Group 9 Automated Home Project using Galileo and Arduino */

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

var x= new mraa.I2c(0); //Use I2C module of mraa library
x.address(0x08);   // Initialise the I2C address to communicate with Arduino
var ledState = true; //Boolean to hold the state of Portico LED
var ledState2 = true; //Boolean to hold the state of Washroom LED
var fanState = true; // Boolean to hold to state of Fan ON/OFF
var express = require('express');  //Initialise express.js framework
var app = express();  
var path = require('path');
var http = require('http').Server(app);  //Intialise http server 
var io = require('socket.io')(http);
var fanValue= ['10','50', '100', '150' , '200', '250'];  //Fan values to be sent to Arduino to control the DC Motor
var i;
var connectedUsersArray = [];
var userId;
var analogPin0 = new mraa.Aio(2);  //Analog pin set to read from Temperature Sensor
var feedback = analogPin0.read();   // reading from analogPin

app.get('/', function(req, res) {
    //Join all arguments together and normalize the resulting path.
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});
//Allow use of files in client folder
app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

//Socket.io Event handlers
io.on('connection', function(socket) {

    
    
    
    
    socket.on('toogle led', function(msg) {
        x.writeByte(ledState?1:2); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
        msg.value = ledState;
        io.emit('toogle led', msg);
        ledState = !ledState; //invert the ledState
    });
    socket.on('toogle led1', function(msg) {
        x.writeByte(ledState2?7:8); //if ledState2 is true then write a '1' (high) otherwise write a '0' (low)
        msg.value = ledState2;
        io.emit('toogle led1', msg);
        ledState2 = !ledState2; //invert the ledState
    });
    
    socket.on('toogle fan', function(msg) {
        x.writeByte(fanState?9:10); //if fanState is true then write a '1' (high) otherwise write a '0' (low)
        msg.value = fanState;
        io.emit('toogle fan', msg);
        fanState = !fanState; //invert the ledState
    });
    
    socket.on('fan control',function(msg){   //Control Fan using the input user gives
      for( i=0 ; i<fanValue.length ;i++){
       if(msg.value == fanValue[0])
           x.writeByte(10);
          else if(msg.value == fanValue[1])
           x.writeByte(50);
          else if(msg.value == fanValue[2])
           x.writeByte(100);
          else if(msg.value == fanValue[3])
           x.writeByte(150);
          else if(msg.value == fanValue[4])
           x.writeByte(200);
           else if(msg.value == fanValue[5])
           x.writeByte(250);         
          io.emit('fan control',msg);
      }
    });
    
    setInterval(repeat,50);               //Continuously get Sensor Values
    function repeat(){          
        var value;
        value = analogPin0.read();
   
        socket.emit('readvalue',value);
    }
    
});


http.listen(3000, function(){
    console.log('Web server Active listening on 192.168.0.101:3000');
    
});