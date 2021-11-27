require("dotenv").config();
//require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json({ limit: "50mb" }));
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Serial
var portName = '/dev/ttyUSB1';
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

const timer = ms => new Promise( res => setTimeout(res, ms));

app.get("/api/door", (req, res) => {
    const parser = sp.pipe(new Readline({delemiter: '\n'}));
    sp.write('doorAction\n');
      
    parser.on('data', function (data) {
      var dataUTF8 = data.toString('utf-8');
      console.log(dataUTF8);   
    });
     
    return res.status(200).json({status: 'ok', data:response});
});


app.get("/api/status", (req, res) => {
    const parser = sp.pipe(new Readline({delemiter: '\r\n'}));
    sp.write('getState\n');
    
      parser.on('data', function (data) {
        var dataUTF8 = data.toString('utf-8');
        console.log(dataUTF8);   
      });
    
    return res.status(200).json({status: 'ok', data:response});
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

const response = "{'success':'true','message':'1, 1'}";


/*"/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user.token);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});*/

module.exports = app;
