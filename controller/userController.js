let User = require('../model/userModel');

exports.all = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "erro",
                message: err,
            });
        }
        res.json({
            status: "successo",
            message: "Listagem executada com sucesso!",
            users: users
        });
    });
};

exports.new = function (req, res) {
    var user = new User();
    console.log(req.body);
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.track_saved = null;
    
    user.save(function (err) {
    res.json({
            message: 'Usuário criado!',
            data: user
        });
    });
};

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'Carregando detalhes...',
            data: user
        });
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.password = req.body.password;

        var track_saved_temp;
        if (req.body.track_id) {
            track_saved_temp = {
                track_id: req.body.track_id,
                time_in_seconds: req.body.time_in_seconds
            };
        } else {
            track_saved_temp = null;
        };
        user.track_saved = track_saved_temp;

        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Dados atualizados!',
                data: user
            });
        });
    });
};

exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err) {
        if (err)
            res.send(err);
        res.json({
                status: "successo",
                message: 'Deletado!'
            });
        }
    );
};

