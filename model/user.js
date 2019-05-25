var mongoose=require("mongoose");

var userSchema=mongoose.schema({
    fullname:{type:string,unique:true},
    username:{type:string,unique:true},
    email:{type:string,unique:true},
    password:{type:string,unique:true},
    UserImage:{type:string,default:""},
    facebook:{type:string,deafult:""},
    fbToken:Array
});
userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}
userSchema.methods.validUserPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports=mongoose.model("User",userSchema);