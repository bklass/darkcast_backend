let Track = require('../model/trackModel');
const fs = require('fs');
const configs = require('../config/proprieties.json');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: configs.S3_KEY,
  secretAccessKey: configs.S3_SECRET
});

exports.play = function (req, res){
    Track.findById(req.params.track_id, async function (err, track) {
        if (err)
            res.send(err);

            var params;
            if (configs.APP_ENV == 'development'){
                params = {
                    Bucket: configs.S3_BUCKET, 
                    Key: 'dev/'+track.key
                };
            } else {
                params = {
                    Bucket: configs.S3_BUCKET, 
                    Key: 'prd/'+track.key
                };
            }
        
            var s3Stream = s3.getObject(params).createReadStream();
           
            s3Stream.on('error', function(err) {
                console.error(err);
            });
            s3Stream.on('end', () => console.log("Track pronta!"));            
            
            res.writeHead(200, {
                'Content-Type': 'audio/mp3',

            });
            s3Stream.pipe(res);        
            
    });    
};

exports.upload = function (req, res){
    var params;    
    if (configs.APP_ENV == 'development'){
        params = {
            Bucket: configs.S3_BUCKET, 
            Key: 'dev/'+req.file.originalname,
            Body: fs.createReadStream(req.file.path)
        };
    } else {
        params = {
            Bucket: configs.S3_BUCKET, 
            Key: 'prd/'+req.file.originalname,
            Body: fs.createReadStream(req.file.path)
        };
    }
    s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        fs.unlinkSync(req.file.path);
        var track = new Track();
        track.name = req.body.name ? req.body.name : track.name;   
        track.time = req.body.time;
        track.filepath = data.Location;
        track.key = req.file.originalname;
        track.save(function (err) {
            res.json({
                message: 'Track criada!',
                data: track
            });
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
