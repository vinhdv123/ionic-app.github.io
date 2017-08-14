var express = require('express'),
    http = require('http'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    engine = require('ejs-mate');

var app = module.exports = express();

var passport = require('passport');
var config = require('./config/database');



// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '/views'));
app.engine('html', engine);
app.set('view engine', 'html');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.set("view options", {layout: 'layout.html'});
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


passport.serializeUser(function(user, done) {
    done(null, user);
});



// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// log to console
app.use(morgan('dev'));

// Use the passport package in our application;

//Authentication and Authorization Middleware
//var auth = function (req, res, next) {
//    if (req.session && req.session.user === "amy" && req.session.admin)
//        return next();
//    else
//        return res.redirect('/login');
//    return next();
//};



var server = http.createServer(app);
var io = require('socket.io')(server);

//var WebSocketServe = require('ws').Server;
//var wss = new WebSocketServe({port:3001});
mongoose.connect(config.database);
require('./config/passport')(passport);
var db = mongoose.connection;
fs.readdirSync('./controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        var route = require('./controllers/' + file);
        route.controller(app,passport,io);
    }
});



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("open db successfully");
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
