/**
 * Created by vinhdv on 11/27/16.
 */

var User = require('../models/User');
var jwt = require('jwt-simple');
var config = require('../config/database');

module.exports.controller = function (app) {
    app.post('/api/authenticate', function (req, res) {
        console.log(req.body);
        User.findOne({name:req.body.name},function(err,user){
           // console.log(user);
            if (err) throw err;

            if (!user) {
                res.send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }

        });
    });
}