const mongoose = require('mongoose');
var moment=require("moment");
const groupmessage = mongoose.Schema({
    message:{type:String,default:''},
    group:{type:String,default:""},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    isRead:{type:Boolean,default:'false'},
    MessagedAt:{type:String,default: () => moment().format("h:mm a")}
});
module.exports = mongoose.model('Group', groupmessage);