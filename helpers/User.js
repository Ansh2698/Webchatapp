module.exports=function(){
    return {
        SignUpvalidation:function(req,res,next){
            req.checkBody("username","Username is required").notEmpty();
            req.checkBody("username","Username should be greater than 5").isLength({min:5});
            req.checkBody("email","Email is required").notEmpty();
            req.checkBody("password","Password is required").notEmpty();
            req.checkBody("password","Password should be greater than 5").isLength({min:5});
            req.checkBody("email","Invalid Email").isEmail();

            req.getValidationResult()
                .then(function(result){
                    var errors=result.array();
                    var message=[];
                    errors.forEach(error => {
                        message.push(error.msg);
                    });

                    req.flash("error",message);
                    res.redirect("/signup");
                })
                .catch(function(err){
                    return next();
                })
        },
        Loginvalidation:function(req,res,next){
            req.checkBody("email","Email is required").notEmpty();
            req.checkBody("password","Password is required").notEmpty();
            req.getValidationResult()
                .then(function(result){
                    var errors=result.array();
                    var message=[];
                    errors.forEach(error => {
                        message.push(error.msg);
                    });

                    req.flash("error",message);
                    res.redirect("/");
                })
                .catch(function(err){
                    return next();
                })
        }
    }
}