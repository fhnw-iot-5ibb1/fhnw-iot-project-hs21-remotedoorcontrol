require("dotenv").config();
const express = require("express");
const cors = require('cors');
var SerialPort = require('serialport');
var bodyParser = require('body-parser');  
var Readline = require('@serialport/parser-readline');
const fs = require('fs')

const app = express();
// ################ App Settings #################
app.use(express.json({ limit: "50mb" }));

// not needed when routed internally
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const session = require('cookie-session');
app.use(
  session({
    secret: "@asd4°@#41_",
    httpOnly: true,  // Don't let browser javascript access cookies.
    secure: true, // Only use cookies over https.
  })
);

// Initialize SerialPort on ttyUSB0
var portName = '/dev/ttyUSB0';
var sp = new SerialPort(portName, {
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
}); // instanciate serial port
var parser = sp.pipe(new Readline('\r'));
var responseUTF = "";
var operationsCounter = 0;
var accessCounter = 0;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Handler when new data received from USB-Serial
parser.on('data', function (data) {
  responseUTF = data.toString('utf-8');
  console.log(responseUTF);
});

app.get("/api/door", (req, res) => {  
  sp.write('doorAction\n');
  operationsCounter++;
  accessCounter++;
  return res.status(200).json({status: 'ok', data:responseUTF});
});

app.get("/api/status", (req, res) => {
  sp.write('getState\n');     
  accessCounter++;
  return res.status(200).json({status: 'ok', data:responseUTF});
});

app.get("/api/total_operations", (req, res) => {
  return res.status(200).json({status: 'ok', data:operationsCounter})
});

app.get("/api/total_access", (req, res) => {
  return res.status(200).json({status: 'ok', data:accessCounter})
});

app.get("/api/total_locations", (req, res) => {

});

app.get("/api/location", urlencodedParser, function (req, res) {  
  // Prepare output in JSON format  
  //console.log(req);
  response = {  
      longitude:req.query.geo1,  
      latitude:req.query.geo2 
  };

  const existingLocations = getLocationData();
  for (var i=0; i<existingLocations.length; i++) { //iterate through each object in an array
    if (JSON.stringify(existingLocations[i]).replace(/\\/g, "") === ('"' + JSON.stringify(response) + '"')) {
        return res.status(200).json(existingLocations); 
     }
}
  existingLocations.push(JSON.stringify(response));
  saveLocationData(existingLocations);

  return res.status(200).json(existingLocations);  
})  

/* util functions */
//read the user data from json file
const saveLocationData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('locations.json', stringifyData)
}
//get the user data from json file
const getLocationData = () => {
  const jsonData = fs.readFileSync('locations.json')
  return JSON.parse(jsonData)    
}
/* util functions ends */

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
