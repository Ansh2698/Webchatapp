var mongoose=require("mongoose");
var bcrypt=require("bcrypt-nodejs");
var userSchema=mongoose.Schema({
    fullname:{type:String,unique:true,default:""},
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String,unique:true,default:""},
    UserImage:{type:String,default:""},
    facebook:{type:String,default:""},
    fbToken:Array,
    sentRequest:[{
        username:{type:String,default:""}
    }],
    request:[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        username:{type:String,default:""}
    }],
    friendList:[{
        friendId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        friendName:{type:String,default:""}
    }],
    totalRequest:{type:Number,default:0}
});
userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}
userSchema.methods.validUserPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports=mongoose.model("User",userSchema);