module.exports=function(_ , async){
    return {
        SetRouting:function(router){
            router.get("/",this.indexPage);
        },
        indexPage:function(req,res){
            res.render("index",{test:"This is a test page"});
        }
    }
}