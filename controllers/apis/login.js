/**
 * Created by vinhdv on 8/25/16.
 */

var passwordHash = require('password-hash');
var User = require('../models/User');

module.exports.controller = function (app) {
    app.get('/login', function (req, res) {
        res.render('user/login', {
            title: "Login",
            content: []
        })
    });

    app.post('/login', function (req, res) {

        var hashedPassword = passwordHash.generate(req.body.password);
        console.log(hashedPassword);
        User.findOne({
            $and: [
                {
                    username: req.body.name,
                    // password: hashedPassword
                }
            ]
        }).exec(function (err, user) {
            if (err)
                res.send('login failed');

            if (user) {
                req.session.user = "amy";
                req.session.admin = user;
                res.redirect("/chat");
            } else {
                res.send('login failed');
            }
        });
    });


    app.get('/signup', function (req, res) {
        res.render('user/signup', {
            title: "Signup",
            content: []
        });
    });

    app.post('/signup', function (req, res) {
        console.log(req.body);
        //Has password
        //var hashedPassword = passwordHash.generate(req.body.password);

        var user = new User({
            name: req.body.name,
            password: req.body.password
        });

        user.save(function (err, user) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/login');
            }
        });
    });
}