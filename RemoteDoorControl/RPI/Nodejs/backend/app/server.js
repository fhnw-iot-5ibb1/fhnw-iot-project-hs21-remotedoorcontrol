"use strict";
const http = require("http");
const https = require("https");
const app = require("./app");
const fs = require('fs');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(port, () => {
	console.log('HTTPS Server running on port 443');
});

