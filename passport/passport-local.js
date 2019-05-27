var passport=require("passport");
var User=require("../model/user");
var LocalStrategy=require("passport-local").Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use("local.signup",new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
  },
  function(req,email, password, done) {
    User.findOne({ "email": email }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false,req.flash("error","Email already exist"));
        }
          var newUser=new User();
          newUser.username=req.body.username;
          newUser.fullname=req.body.username;
          newUser.email=req.body.email;
          newUser.password=newUser.encryptPassword(req.body.password);   
          newUser.save(err,function(){
              done(null,newUser);
          });
    });
  }
));




passport.use("local.login",new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback:true
},
function(req,email, password, done) {
  User.findOne({ "email": email }, function(err, user) {
      if (err) { return done(err); }
      if (!user || !user.validUserPassword(password)) {
        return done(null, false,req.flash("error","Invalid Email/Password"));
      }
      return done(null,user);
  });
}
));
  