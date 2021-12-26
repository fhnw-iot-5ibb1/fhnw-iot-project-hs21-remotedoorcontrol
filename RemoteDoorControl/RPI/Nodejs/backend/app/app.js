require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');

var responseUTF = "";

// Serial
var portName = '/dev/ttyUSB0';
var sp = new SerialPort(portName, {
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
}); // instanciate serial port

sp.on('open',function() {
  console.log('Serial Port ' + portName + ' is opened.');
});


var parser = sp.pipe(new Readline('\r'));
const timer = ms => new Promise( res => setTimeout(res, ms));

const session = require('cookie-session');
app.use(
  session({
    secret: "@asd4°@#41_",
    httpOnly: true,  // Don't let browser javascript access cookies.
    secure: true, // Only use cookies over https.
  })
);

parser.on('data', function (data) {      
  responseUTF = "";
  responseUTF = data.toString('utf-8');
});

app.get("/api/door", (req, res) => {  
    sp.write('doorAction\n');
    return res.status(200).json({status: 'ok', data:responseUTF});
});


app.get("/api/status", (req, res) => {
    sp.write('getState\n');        
    return res.status(200).json({status: 'ok', data:responseUTF});
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
return res.status(404).json({
  success: "false",
  message: "Page not found",
  error: {
    statusCode: 404,
    message: "You reached a route that is not defined on this server",
  },
});
});

module.exports = app;
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');

var responseUTF = "";

// Serial
var portName = '/dev/ttyUSB0';
var sp = new SerialPort(portName, {
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
}); // instanciate serial port

sp.on('open',function() {
  console.log('Serial Port ' + portName + ' is opened.');
});


var parser = sp.pipe(new Readline('\r'));
const timer = ms => new Promise( res => setTimeout(res, ms));

const session = require('cookie-session');
app.use(
  session({
    secret: "@asd4°@#41_",
    httpOnly: true,  // Don't let browser javascript access cookies.
    secure: true, // Only use cookies over https.
  })
);

parser.on('data', function (data) {      
  responseUTF = "";
  responseUTF = data.toString('utf-8');
});

app.get("/api/door", (req, res) => {  
    sp.write('doorAction\n');
    return res.status(200).json({status: 'ok', data:responseUTF});
});


app.get("/api/status", (req, res) => {
    sp.write('getState\n');        
    return res.status(200).json({status: 'ok', data:responseUTF});
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
return res.status(404).json({
  success: "false",
  message: "Page not found",
  error: {
    statusCode: 404,
    message: "You reached a route that is not defined on this server",
  },
});
});

module.exports = app;
