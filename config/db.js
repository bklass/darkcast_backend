const configs = require('./proprieties.json');
const mongoose = require('mongoose');
const chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

if (configs.APP_ENV == 'development'){
    var url = 'mongodb://'+configs.DB_HOST+':'+configs.DB_PORT+'/'+configs.DB_NAME
} else {
    var url = 'mongodb+srv://'+configs.DB_USER+':'+configs.DB_PASS+'@'+configs.DB_HOST+'/'+configs.DB_NAME
}

mongoose.connect(url, {useUnifiedTopology: true,useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', function(err) {console.log(error('Error on MongoDB: '+err));});

db.on('connected', function(){console.log(connected('Connected to MongoDB! URL => '+url));});

db.on('disconnected', function() {console.log(disconnected('MongoDB connection disconnected'));});
process.on('SIGINT', function(){
    db.close(function(){
      console.log(termination("MongoDB connection is disconnected due to application termination"));
       process.exit(0);
      });
});