module.exports=function(){
    return {
        SetRouting:function(router){
            router.get("/home",this.getHomePage);
        },
        getHomePage:function(req,res){
            res.render("home",{home:"This is a home page"});
        },
    }
}