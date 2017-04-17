var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new LocalStrategy(
    function(username, password, callback) {
        User.findOne({username: username}, function(err, user){
            if(err){
                console.log(err);
                return callback(err);
            }
            if(!user){
                console.log(false);
                return callback(null, false, { message : 'invalid e-mail address or password' });
            }
            user.verifyPassword(password, function(err, isMatch){
                if(err){
                    console.log(callback(err));
                    return callback(err);
                }
                if(!isMatch) {
                    console.log(console(null, false));
                    return callback(null, false);
                }
                console.log(null, user);
                return callback(null, user);
            });
        });
    }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

exports.isAuthenticated = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
});

exports.passport = passport;