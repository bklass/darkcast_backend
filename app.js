const express = require('express');
const routes = require('./config/routes');

const app = express();
app.use(express.static('public'));

app.use('/', routes);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log('app is running on '+app.get('port')));