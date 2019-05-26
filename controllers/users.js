"use strict";
module.exports = function (_ , passport) {
    return {
        SetRouting: function (router) {
            router.get("/", this.indexPage);
            router.get("/signup",this.getSignup);
            router.get("/home",this.getHomePage);
            router.post("/signup",this.postSignup);
        },
        indexPage: function (req, res) {
            return res.render("index", { test:"This is test message" });
        },
        getSignup:function(req,res){
            return res.render("signup",{signup:"this is a signup page"});
        },
        postSignup:passport.authenticate('local.signup', { 
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true 
        }),
        getHomePage:function(req,res){
            res.render("home",{home:"This is a home page"});
        }
    }
}