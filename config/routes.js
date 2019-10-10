const routes = require('express').Router();
const userController = require('../controller/userController');
const trackController = require('../controller/trackController');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Ok!' });
});

routes.get('/tracks', (req, res) => {
    res.status(200).json({ message: 'Hello from Tracks' });
});

routes.route('/users')
    .get(userController.all)
    .post(userController.new);
routes.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

module.exports = routes;