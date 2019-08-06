module.exports=function(async,Club,Users,homeRequest){
    return {
        SetRouting:function(router){
            router.get("/home",this.getHomePage);
            router.post("/home",homeRequest.Request);
        },
        getHomePage:function(req,res){
            async.parallel([
                function(callback){
                    Club.find({},function(err,result){
                        callback(err,result);
                    })
                },
                function(callback){
                    Club.aggregate([{
                        $group:{
                            _id:"$country"
                        }
                    }],function(err,result){
                        callback(err,result);
                    })
                },
                function(callback){
                    Users.findOne({username:req.user.username})
                    .populate("request.userId")
                    .exec(function(err,result){
                        callback(err,result)
                    })
                },
            ],function(err,results){
                var res1=results[0];
                var res2=results[1];
                var res3=results[2];
                res.render("home",{data:res1,country:res2,user:req.user,res1:res3});
            })
        },
    }
}