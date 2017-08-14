
module.exports.controller = function(app,passport,io){
    app.get('/chat',function(req,res,next){
        console.log(req.session.user);

        io.on('connection',function(socket){
           console.log('connected!');
            socket.on('on message',function(msg){
                socket.broadcast.in('admin').emit('messages',{msg:msg});
            });

        });

        res.render('chat/index.html',{title:"Room chat"});
    });
}