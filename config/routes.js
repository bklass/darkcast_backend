const routes = require('express').Router();
const multer = require('multer');
const userController = require('../controller/userController');
const trackController = require('../controller/trackController');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'All good!' });
});

routes.route('/tracks')
    .post(multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'),
      trackController.upload);
routes.route('/tracks/:track_id')
    .delete(trackController.remove)
    .get(trackController.play);

routes.route('/users')
    .get(userController.all)
    .post(userController.new);
routes.route('/users/login')
    .post(userController.login);
routes.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

module.exports = routes;