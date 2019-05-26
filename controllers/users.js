"use strict";
module.exports = function (_ , passport ,User) {
    return {
        SetRouting: function (router) {
            router.get("/", this.indexPage);
            router.get("/signup",this.getSignup);
            router.get("/home",this.getHomePage);
            router.post("/signup",User.SignUpvalidation,this.postSignup);
        },
        indexPage: function (req, res) {
            return res.render("index", { test:"This is test message" });
        },
        getSignup:function(req,res){
            var errors=req.flash("error");
            return res.render("signup",{message:errors,hasErrors:errors.length>0});
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