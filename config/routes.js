const routes = require('express').Router();
const userController = require('../controller/userController');
const trackController = require('../controller/trackController');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Ok!' });
});

routes.get('/tracks', (req, res) => {
    res.status(200).json({ message: 'Hello from Tracks' });
});

routes.get('/users', (req, res) => {
    res.status(200).json({ message: 'Hello from Users' });
});

module.exports = routes;