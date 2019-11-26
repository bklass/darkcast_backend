const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./config/routes');
const configs = require('./config/proprieties.json');
const dbs = require('./config/db');

const app = express();

process.on('unhandledRejection', (error, promise) => {
    console.log(' Error to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error );
});
process.on('uncaughtException', (error) => {
    console.log(' The exception was: ', error );
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept, Authorization');
    next();
});

app.use('/', routes);

dbs.connect;

app.set('port', configs.APP_PORT || 3000);
app.listen(app.get('port'), () => console.log('app is running on '+app.get('port')));