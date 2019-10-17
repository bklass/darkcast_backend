let Track = require('../model/trackModel');
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);
const highWaterMark =  2;

exports.play = function (req, res){
    Track.findById(req.params.track_id, async function (err, track) {
        if (err)
            res.send(err);

        const stat = await getStat(track.filepath);
    
        res.writeHead(200, {
            'Content-Type': 'audio/mp3',
            'Content-Length': stat.size
        });
    
        const stream = fs.createReadStream(track.filepath, { highWaterMark });
        stream.on('end', () => console.log('Finalizada execução da Track'));
        stream.pipe(res);
    });    
};

exports.upload = function (req, res){
    var track = new Track();
    track.name = req.body.name ? req.body.name : track.name;
    track.filepath = req.body.filepath;
    track.time = req.body.time;
    
    track.save(function (err) {
    res.json({
            message: 'Track criada!',
            data: track
        });
    });
};

exports.remove = function (req, res){
    Track.remove({
        _id: req.params.track_id
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

