/**
 * Created by vinhdv on 11/27/16.
 */

var time = require('time')(Date);
var jwt = require('jwt-simple');
var User = require('../models/User');
var Room = require('../models/Room');
var Article = require('../models/Articles');
var config = require('../config/database');

module.exports.controller = function (app, passport) {
    //app.post('/api/timezone', passport.authenticate('jwt', {session: true}), function (req, res) {
    //    var token = getToken(req.headers);
    //    if (token) {
    //        var decoded = jwt.decode(token, config.secret);
    //        User.findOne({
    //            name: decoded.name
    //        }, function (err, user) {
    //            if (err) throw err;
    //
    //            if (!user) {
    //                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    //            } else {
    //                var d = new Date();
    //                var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    //                var nd = new Date(utc + (3600000 * req.body.timezone));
    //
    //                return res.send({message: true, msg: nd.toLocaleString()});
    //            }
    //        });
    //    } else {
    //        return res.status(403).send({success: false, msg: 'No token provided.'});
    //    }
    //
    //    if (!req.body.timezone) {
    //        res.send({success: false, msg: 'Please enter a timezone.'});
    //    }
    //
    //});

    app.get('/api/dashboard', function (req, res) {

    });

    app.post('/api/search', function (req, res) {

    });

    app.post('/api/add/room', function (req, res, next) {
            var token = getToken(req.headers);
            if (token) {
                var room = new Room({
                    name: req.body.name
                });
                room.save(function (err, room) {
                    if (err) {
                        return res.json({success: false, msg: 'Room already exists.'});
                    }
                    res.json({success: true, msg: 'Successful created new room.'});
                });
            }
        }
    );

    //app.get('/api/get/room', passport.authenticate('jwt', {session: true}), function (req, res) {
    //    var token = getToken(req.headers);
    //    if (token) {
    //        Room.find({}).exec(function (err, rooms) {
    //            if (err) {
    //                return res.json({success: false, msg: 'Room null.'});
    //            }
    //            res.send({message: true, data: rooms});
    //        })
    //
    //    }
    //});

    app.post('/api/add/room/table', function (req, res) {

    });
    app.get('/api/get/room/table', function (req, res) {

    });

    //app.get('/api/article', passport.authenticate('jwt', {session: true}), function (req, res) {
    //    var token = getToken(req.headers);
    //    var pager = '';
    //    if (token) {
    //        console.log(req.query.page);
    //        if (req.query.page) {
    //            pager = parseInt(req.query.page);
    //        } else {
    //            pager = parseInt(10);
    //        }
    //
    //        Article.find().sort({date_created: 'ascending'}).skip(0).limit(pager).exec(function (err, articles) {
    //            if (err) {
    //                return res.json({success: false, msg: 'Article null.'});
    //            }
    //            res.send({message: true, data: articles});
    //        });
    //    }
    //});

    app.get('/api/total/article', function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            Article.count(function (err, total) {
                if (err) {
                    return res.json({success: false, msg: 'Not found'});
                }
                res.json({success: true, data: total});
            });
        }
    });

    app.get('/api/article/:id', function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            var articleId = req.params.id;
            Article.findOne({'_id': articleId}, function (err, article) {
                if (err) {
                    return res.json({success: false, msg: 'Article notfound.'})
                }
                res.json({success: true, data: article});
            });

        }
    });

    app.post('/api/add/article', function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            var article = new Article({
                title: req.body.title,
                description: req.body.description,
                body: req.body.content,
                status: 1
            });

            article.save(function (err, article) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg: 'Article already exists.'});
                }
                res.json({success: true, msg: 'Successful created new room.'});
            });
        }
    });



};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};