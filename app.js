var express=require("express");
var bodyParser=require("body-parser");
var ejs=require("ejs");
var http=require("http");
var container=require("./container");
var flash=require("connect-flash");
var cookieParser=require("cookie-parser");
var expressValidator=require("express-validator");
var session=require("express-session");
var MongoStore=require("connect-mongo")(session);
var mongoose=require("mongoose");
var passport=require("passport");

container.resolve(function(users,admin){
    mongoose.connect('mongodb://localhost/Webchatapp',{ useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;
    var app=SetupExpress();
    function SetupExpress(){
        var app=express();
        var server=http.createServer(app);
        server.listen(3000,function(){
            console.log("Server is running on port 3000");
        })
        ConfigureExpress(app);
        var router = require("express-promise-router")();
        users.SetRouting(router);
        admin.SetRouting(router);
        app.use(router);
    }

    function ConfigureExpress(app){
        require("./passport/passport-local");
        require("./passport/passport-facebook");
        app.use(express.static("public"));
        app.use(cookieParser());
        app.set("view engine","ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(expressValidator());
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
          }))
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
    }
})