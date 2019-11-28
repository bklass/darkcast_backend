var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var configs = require('../config/proprieties.json');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Email inválido!'})
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    tracks_saved: [{
            track_id: String,
            time_in_seconds: Number
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    create_date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, configs.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email } )
    if (!user) {
        throw new Error({ error: 'Credenciais inválidas!' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Credenciais inválidas!' });
    }
    return user;
};


var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}