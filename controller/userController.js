
exports.all = function (req, res) {
    res.status(200).json({ message: 'All users' });
};

exports.new = function (req, res) {
    res.status(200).json({ message: 'New user' });
};

exports.view = function (req, res) {
    res.status(200).json({ message: 'View user' });
};

exports.update = function (req, res) {
    res.status(200).json({ message: 'Update user' });
};

exports.delete = function (req, res) {
    res.status(200).json({ message: 'Delete user' });
};

