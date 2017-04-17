var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');
var User = require('../models/user');

function authenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("Not Authorized");
    res.json({success: false, msg: "Authentication Error"});
}

router.route('/signup')
    .post(function(req, res){
        if(!req.body.username || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'});
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            
            newUser.save(function(err){
                if(err){
                    return res.json({success: false, msg:err.code});
                }
                res.json({success: true, msg: 'New user created.'});
            });
        }
    });

router.route('/login')
    .post(authController.isAuthenticated, function(req, res){
        if(req.user){
            res.json({success: true, user: req.user, msg: 'Logged on'});
            console.log("logging in");
        } else {
            res.json({success: false, msg: "error logging on"});
        }
        
    });
    
router.route('/loginv2')
    .post(function(req, res, next) {
  authController.passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : 'authentication succeeded' });
    });      
  })(req, res, next);
});

router.route('/currentuser')
    .get(authenticated, function(req, res){
        res.json(req.user);
    });
    
router.route('/authentication')
    .get(authenticated, function(req, res){
        console.log("Authorized");
        res.json({success: true, msg: 'Authorized'});
    });

router.route('/logout')
    .get(function(req, res){
        console.log('logout');
        req.logout();
        res.json({success: true, msg: 'Logged out'});
    });
    
exports.authRouter = router;