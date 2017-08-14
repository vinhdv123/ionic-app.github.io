module.exports.controller = function (app, passport, io) {
    io.sockets.on('connection', function (socket) {
        console.log("Connected!");
        var msg = [

        ];
        console.log(socket.id);
        for (var i = 0; i < 15; i++) {
            msg.push({id:i,message:'You are ready '+i,status:1});
        }
        socket.emit('message', msg);
    });
}