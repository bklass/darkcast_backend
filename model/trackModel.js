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
        type: Number,
        required: true
    },
    key: {
        type: String
    },
    background: {
        type: String,
        required: true
    },
    options: {
        track_id_child_1: String,
        answer_child_1: String,
        track_id_child_2: String,
        answer_child_2: String,
        track_id_father: String,
        question: String,
        question_time: String
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