/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  https = require('https'),
  fs = require('fs'),
  port = 3001;

const app = express();
app.use(history());
app.use(serveStatic(__dirname + '/dist/pwa'));

var privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
var certificate = fs.readFileSync('localhost.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);
