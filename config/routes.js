const routes = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const userController = require('../controller/userController');
const trackController = require('../controller/trackController');
const authLocal = require('../auth/local');

routes.get('/api/', (req, res) => {
    res.status(200).json({ success: true, message: 'All good!' });
});

routes.route('/api/tracks')
    .get(trackController.all)
    .post(multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'),
      trackController.upload);
routes.route('/api/tracks/:track_id')
    .delete(trackController.remove)
    .patch(trackController.update)
    .put(trackController.update)
    .get(trackController.view);
routes.route('/api/tracks/play/:track_id')
    .get(trackController.play);

routes.route('/api/users/me')
    .get(authLocal, async(req, res) => {
        res.json({
            success: true,
            message: "Informações do usuário ok!",
            data: req.user
        });
    }
);

routes.route('/api/users')
    .get(userController.all)
    .post(userController.new);
routes.route('/api/users/login')
    .post(userController.login);
routes.route('/api/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

routes.route('/api/mock')
    .get((req, res) => {
        res.json(JSON.parse(fs.readFileSync('./mock/mock.json', 'utf8')));
    }
);

routes.route('/api/users/me/logout')
    .post(authLocal, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            });
            await req.user.save();
            res.json({
                success: true,
                message: "Logout efetuado com sucesso!"
            });
        } catch (err) {
            res.json({
                success: false,
                message: err,
            });
        }
    }
);
routes.route('/api/users/me/logoutall')
.post(authLocal, async(req, res) => {
        try {
            req.user.tokens.splice(0, req.user.tokens.length);
            await req.user.save();
            res.json({
                success: true,
                message: "Logout de todos dispositivos efetuado com sucesso!"
            });
        } catch (err) {
            res.json({
                success: false,
                message: err,
            });
        }
    }
);

module.exports = routes;