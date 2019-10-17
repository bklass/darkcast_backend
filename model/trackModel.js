var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    key: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Track = module.exports = mongoose.model('track', trackSchema);
module.exports.get = function (callback, limit) {
    Track.find(callback).limit(limit);
}