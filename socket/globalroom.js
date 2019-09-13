module.exports=function(io,Global,_){
    var Global=new Global();
    io.on("connection",function(socket){
        socket.on("GlobalJoined",function(global,callback){
            socket.join(global.room);
            console.log(global.name);
            Global.EnterUserData(socket.id,global.room,global.name,global.img);
            var NameArray=Global.GetGlobalData(global.room);
            var NamesArray= _.uniqBy(NameArray,"username");
            io.to(global.room).emit("loggedInUser",NamesArray);
            callback();
        });
        socket.on("disconnect",function(){
            var user=Global.RemoveUser(socket.id);
            if(user){
                var NameArray=Global.GetGlobalData(user.room);
                var NamesArray= _.uniqBy(NameArray,"username");
                io.to(user.room).emit("loggedInUser",NamesArray);
            }
        });
    })
}