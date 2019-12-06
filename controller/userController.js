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
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.tracks_saved = [];    
        
        await user.save();
        await user.generateAuthToken();
        res.json({
            success: true,
            message: "Usuário criado!",
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
            message: "Detalhes exibidos com sucesso!",
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
        user.email = req.body.email ? req.body.email : user.email;
        user.password = req.body.password ? req.body.password : user.password;
        
        if(req.body.remove_track_id){
            user.tracks_saved = user.tracks_saved.filter(function(item) {
                return item.track_id !== req.body.remove_track_id
            })
        }

        if(req.body.track_id && req.body.time_in_seconds){            
            user.tracks_saved.push({
                track_id: req.body.track_id,
                time_in_seconds: req.body.time_in_seconds
            })
        } else if (req.body.track_id && !req.body.time_in_seconds){
            res.json({
                success: false,
                message: "Deve ser adicionado o tempo em segundos!",
            });
        } else if (!req.body.track_id && req.body.time_in_seconds){
            res.json({
                success: false,
                message: "Deve ser adicionada a ID da Track!",
            });
        }

        user.save(function (err) {
            if (err)
                res.json({
                    success: false,
                    message: err,
                });
            res.json({
                success: true,
                message: "Dados atualizados!",
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
            message: "Deletado com sucesso!"
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
                message: "Usuário não existente!"
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
