module.exports=function(Users,async,GroupRequest,Group){
    return {
        SetRouting:function(router){
            router.get("/group/:name",this.getGrouppage);
            router.post("/group/:name",GroupRequest.Request);
            router.post("/MessageList/:name",this.postGrouppage);
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
                },
                function(callback){
                    Group.find({})
                    .populate("sender")
                    .exec(function(err,result){
                        callback(err,result);
                    })
                }
            ],function(err,results){
                var res1=results[0];
                var res2=results[1];
                res.render("groupchat/group",{groupname:name,user:req.user,res1:res1,group:res2});
            })
        },
        postGrouppage:function(req,res){
            const newgroup=new Group();
            newgroup.message=req.body.message;
            newgroup.sender=req.user._id;
            newgroup.isRead=req.body.isRead;
            newgroup.MessagedAt=req.body.MessageAt;
            newgroup.group=req.body.group;
            newgroup.save((err,msg) => {
                res.redirect('/group/'+req.params.name);
            })
        }
    }
}