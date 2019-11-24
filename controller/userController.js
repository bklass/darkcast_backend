let User = require('../model/userModel');

exports.all = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        }
        res.json({
            success: true,
            message: "Listagem executada com sucesso!",
            data: users
        });
    });
};

exports.new = async function (req, res) {
    try {
        var user = new User();
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.track_saved = null;    
        
        await user.save();
        var token = await user.generateAuthToken();
        res.json({
            success: true,
            message: 'Usuário criado',
            data: user,
        });
    } catch (err) {
        res.json({
            success: false,
            message: err
        });
    };
};

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.json({
                success: false,
                message: err
            });
        res.json({
            success: true,
            message: 'Detalhes exibidos com sucesso!',
            data: user
        });
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.json({
                success: false,
                message: err
            });
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
                res.json({
                    success: false,
                    message: err,
                });
            res.json({
                success: true,
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
            res.json({
                success: false,
                message: err
            });
        res.json({
            success: true,
            message: 'Deletado!'
        });
    });
};

exports.login = async function (req, res){
    try {
        var { email, password } = req.body;
        var user = await User.findByCredentials(email, password);
        if (!user) {
            return res.json({
                success: false,
                message: "Usuário não existente"
            });
        }
        var token = await user.generateAuthToken();
        res.json({
            success: true,
            message: "Login efetuado com sucesso!",
            data: user,
        });
    } catch (err) {
        res.json({
            success: false,
            message: err,
        });
    }
};
