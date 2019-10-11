
exports.play = function(req, res){
    res.status(200).json({message: 'Play'});
};

exports.upload = function (req, res){
    res.status(200).json({message: 'Upload'});
};

exports.remove = function (req, res){
    res.status(200).json({message: 'Removed'});
};

