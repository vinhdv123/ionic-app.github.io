/**
 * Created by vinhdv on 8/25/16.
 */

var User = require('../models/User');

module.exports.controller = function (app) {

    //app.get('/chat', auth, function (req, res) {
    //    res.render('chat/index', {
    //        title: "Chat",
    //        content: []
    //    })
    //});

    //connect socket

    //io.on('connection', function (socket) {
    //    console.log('a user connected');
    //    //get chat
    //    socket.on('chat message', function (data) {
    //        console.log(data);
    //        socket.broadcast.to(data.uid).emit('messages', data);
    //    });
    //    User.find({}).exec(function (err, users) {
    //        if (err)
    //            throw err;
    //        socket.emit('users', users);
    //    });
    //});

    app.get('/chat', function (req, res) {
        res.send('Hello world');
    })

}