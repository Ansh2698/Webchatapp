/*var path=require("path");
var fs=require("fs");*/
module.exports=function(formidable,aws,Club){
    return {
        SetRouting:function(router){
            router.get("/dashboard",this.getdashboard);
            router.post("/uploadFile",aws.Upload.any(),this.uploadFile);
            router.post("/dashboard",this.postdashboard);
        },
        getdashboard:function(req,res){
            return res.render("admin/dashboard");
        },
        postdashboard:function(req,res){
            const newClub = new Club();
            newClub.name = req.body.club;
            newClub.country = req.body.country;
            newClub.image = req.body.upload;
            newClub.save((err) => {
                res.render('admin/dashboard');
            })
        },
        uploadFile:function(req,res){
            const form = new formidable.IncomingForm();
            //form.uploadDir=path.join(__dirname,"../public/upload");
            form.on("file",function(field,file){
            /*   fs.rename(file.path,path.join(form.uploadDir,file.name),function(err){
                    if(err){
                        throw err;
                    }
                    console.log("file renamed Successfully");
                })*/
            });
            form.on("error",function(err){
                console.log(err);
            });
            form.on("end",function(){
                console.log("File uload is success full");
            });
            form.parse(req);
        }
    }
}