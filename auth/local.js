var jwt = require('jsonwebtoken');
var User = require('../model/userModel');

var configs = require('../config/proprieties.json');

var authLocal = async(req, res, next) => {
    var token = req.header('Authorization').replace('Bearer ', '');
    var data = jwt.verify(token, configs.JWT_KEY);
    try {
        var user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.json({
            success: false,
            message: err,
        });
    }
};

module.exports = authLocal;