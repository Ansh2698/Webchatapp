module.exports=function(io,Global,_){
    var Global=new Global();
    io.on("connection",function(socket){
        socket.on("GlobalJoined",function(global,callback){
            socket.join(global.room);
            Global.EnterUserData(socket.id,global.room,global.name,global.img);
            var NameArray=Global.GetGlobalData(global.room);
            var NamesArray= _.uniqBy(NameArray,"username");
            io.to(global.room).emit("loggedInUser",NamesArray);
            console.log(NamesArray);
            callback();
        })
    })
}