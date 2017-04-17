// Packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

// File Imports
var config = require('./config/config');

// Mongo Connection
mongoose.connect(config.database);


// App and Router
var app = express();
var router = express.Router();
var topicRouter = require('./app/routes/topic');
var userRouter = require('./app/routes/user');
var authRouter = require('./app/routes/auth');
var commentRouter = require('./app/routes/comment');

// App Use
//app.use(morgan('dev'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/client'));

// Controllers
var topicController = require('./app/controllers/topic');

// Routes 
router.use(topicRouter.topicRouter);
router.use(userRouter.userRouter);
router.use(authRouter.authRouter);
router.use(commentRouter.commentRouter);

router.get('/', function(req, res) {
  res.json({ message: 'Hello'});
});

app.use('/api', router);

app.use(function(error, req, res, next) {
  return res.json({succes: false, msg: "An error occured"});
});

var server = http.createServer(app);
var ip = process.env.IP || "0.0.0.0";
var port = process.env.PORT || 3000;
server.listen(port, ip, function() {
  var addr = server.address();
  console.log("Generic Mongoose server listening at", addr.address + ":" + addr.port);
});