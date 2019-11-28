let Track = require('../model/trackModel');
const fs = require('fs');
const configs = require('../config/proprieties.json');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: configs.S3_KEY,
  secretAccessKey: configs.S3_SECRET
});

exports.all = function (req, res) {
    Track.get(function (err, tracks) {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        }
        res.json({
            success: true,
            message: "Listagem executada com sucesso!",
            data: tracks
        });
    });
};

exports.play = function (req, res){
    Track.findById(req.params.track_id, async function (err, track) {
        if (err)
            res.json({
                success: false,
                message: err,
            });

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
                'Content-Type': 'audio/mp3'
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
        
        track.name = req.body.name;   
        track.time = req.body.time;
        track.background = req.body.background;
        
        track.filepath = data.Location;
        track.key = req.file.originalname;
        
        track.options = null;

        track.save(function (err) {
            res.json({
                success: true,
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
        res.json({
            success: false,
            message: err,
        });
        
        res.json({
            success: true,
            message: 'Deletado!'
        });
    });
};

exports.view = function (req, res) {
    Track.findById(req.params.track_id, function (err, track) {
        if (err)
            res.json({
                success: false,
                message: err
            });
        res.json({
            success: true,
            message: 'Detalhes exibidos com sucesso!',
            data: track
        });
    });
};

exports.update = function (req, res) {
    Track.findById(req.params.track_id, function (err, track) {
        if (err)
            res.json({
                success: false,
                message: err
            });
        console.log(req.body);
        console.log(track);
        
        track.name = req.body.name ? req.body.name : track.name;   
        track.time = req.body.time ? req.body.time : track.time;
        track.background = req.body.background ? req.body.background : track.background;
                
        track.options.track_id_father = req.body.track_id_father ? req.body.track_id_father :  track.options.track_id_father ? track.options.track_id_father : null;
        track.options.track_id_child_1 = req.body.track_id_child_1 ? req.body.track_id_child_1 : track.options.track_id_child_1 ? track.options.track_id_child_1 : null;
        track.options.answer_child_1 = req.body.answer_child_1 ? req.body.answer_child_1 :  track.options.answer_child_1 ? track.options.answer_child_1 : null;
        track.options.track_id_child_2 = req.body.track_id_child_2 ? req.body.track_id_child_2 :  track.options.track_id_child_2 ? track.options.track_id_child_2 : null;
        track.options.answer_child_2 = req.body.answer_child_2 ? req.body.answer_child_2 :  track.options.answer_child_2 ? track.options.answer_child_2 : null;
        track.options.question = req.body.question ? req.body.question :  track.options.question ? track.options.question : null;
        track.options.question_time = req.body.question_time ? req.body.question_time :  track.options.question_time ? track.options.question_time : null;

        track.save(function (err) {
            if (err)
                res.json({
                    success: false,
                    message: err,
                });
            res.json({
                success: true,
                message: 'Dados atualizados!',
                data: track
            });
        });
    });
};