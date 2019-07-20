"use strict";
module.exports = function (_ , passport ,User) {
    return {
        SetRouting: function (router) {
            router.get("/", this.indexPage);
            router.get("/signup",this.getSignup);
            router.post("/",User.Loginvalidation,this.postLogin);
            router.post("/signup",User.SignUpvalidation,this.postSignup);
            router.get("/auth/facebook",this.getFacebook);
            router.get("/auth/facebook/callback",this.Facebook);
        },
        indexPage: function (req, res) {
            var errors=req.flash("error");
            return res.render("index", {message:errors,hasErrors:errors.length>0});
        },
        getSignup:function(req,res){
            var errors=req.flash("error");
            return res.render("signup",{message:errors,hasErrors:errors.length>0});
        },
        postLogin:passport.authenticate('local.login', { 
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true 
            }),
        postSignup:passport.authenticate('local.signup', { 
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true 
        }),
        getFacebook:passport.authenticate("facebook",{
            scope:"email"
        }),
        Facebook:passport.authenticate('facebook', { 
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash:true 
        }),
    }
}