require('dotenv').config({silent: true});

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();

var serverURL = process.env.SERVER_URL || 'http://localhost:4040/parse';
var appId = process.env.APP_ID || 'ROdiaspora';
var masterKey = process.env.MASTER_KEY || 'ROdiaspora';

var api = new ParseServer({
  "databaseURI": process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  "cloud": __dirname + '/cloud/main.js',
  "appId": appId,
  "masterKey": masterKey,
  "serverURL": serverURL,
});

var allowInsecureHTTP = false;
var trustProxy = true;

var dashboard = new ParseDashboard({
  "apps": [{
    "appId": appId,
    "masterKey": masterKey,
    "serverURL": serverURL,
    "appName": "ROdiaspora",
    "iconName": "ROdiaspora.png",
  }],
  "iconsFolder": "icons",
  "trustProxy": trustProxy
}, allowInsecureHTTP);

app.use('/parse', api);
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);
