const express = require('express');
const routes = require('./config/routes');
const configs = require('./config/proprieties.json');
const dbs = require('./config/db');

const app = express();
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');
    next();
});

app.use('/', routes);

dbs.connect;

app.set('port', configs.APP_PORT || 3000);
app.listen(app.get('port'), () => console.log('app is running on '+app.get('port')));