var passport=require("passport");
var User=require("../model/user");
var FacebookStrategy = require('passport-facebook').Strategy;
var secret=require("../secret/secret");
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});
passport.use(new FacebookStrategy({
    clientID:secret.facebook.ClientId,
    clientSecret:secret.facebook.ClientSecret,
    profileFields:["email","displayName","photos"],
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, done) {
    User.findOne({facebook:profile.id}, function(err, user) {
      if (err) { return done(err); }
      if(user){return done(null,user)}else{
          var newUser=new User();
          newUser.facebook=profile.id;
          newUser.email=profile._json.email;
          newUser.username=profile.displayName;
          newUser.fullname=profile.displayName;
          newUser.fbToken.push({token:accessToken});
          newUser.UserImage='https://graph.facebook.com/'+profile.id+'/picture?type=large';
          newUser.save(function(err){
              if(err){
                  return done(err);
              }else{
                  return done(null,user);
              }
          });
        }
    });
  }
));
