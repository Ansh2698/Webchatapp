module.exports=function(Users,async,GroupRequest){
    return {
        SetRouting:function(router){
            router.get("/group/:name",this.getGrouppage);
            router.post("/group/:name",GroupRequest.Request);
        },
        getGrouppage:function(req,res){
            var name=req.params.name;
            async.parallel([
                function(callback){
                    Users.findOne({username:req.user.username})
                    .populate("request.userId")
                    .exec(function(err,result){
                        callback(err,result)
                    })
                }
            ],function(err,results){
                var res1=results[0];
                res.render("groupchat/group",{groupname:name,user:req.user,res1:res1});
            })
        },
    }
}