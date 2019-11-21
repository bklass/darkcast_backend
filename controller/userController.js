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

exports.new = async function (req, res) {
    try {
        var user = new User();
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.track_saved = null;    
        
        await user.save()
        const token = await user.generateAuthToken()
        res.json({
            message: 'Usuário criado',
            data: user,
            token: token
        });
    } catch (error) {
        res.status(400).json({
            status: "erro",
            message: error,
        });
    };
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
            res.status(400).json({
                status: "erro",
                message: err,
            });
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
        res.status(400).json({
            status: "erro",
            message: err,
        });
        res.json({
                status: "successo",
                message: 'Deletado!'
            });
        }
    );
};

exports.login = async function (req, res){
    try {
        var { email, password } = req.body;
        var user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({
                status: "erro",
                message: "Falha de autenticação!",
            });
        }
        const token = await user.generateAuthToken();
        res.json({
            status: "successo",
            message: "Login efetuado com sucesso!",
            users: users,
            token: token
        });
    } catch (error) {
        res.status(400).json({
            status: "erro",
            message: error,
        });
    }
};
