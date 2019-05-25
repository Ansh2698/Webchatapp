var express=require("express");
var bodyParser=require("body-parser");
var ejs=require("ejs");
var container=require("./container");

container.resolve(function(users){
    var app=SetupExpress();
    function SetupExpress(){
        var app=express();
        var server=http.createServer(app);
        server.listen(8000,function(){
            console.log("Server is running on port 8000");
        })
        ConfigureExpress(app);
        var router=require("express-promise-router")();
        users.SetRouting(router);
        app.set(router);
    }

    function ConfigureExpress(app){
        app.use(express.static("public"));
        app.set("view engine","ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }))
    }
})