module.exports=function(io,User){
    var users=new User();
    io.on("connection",function(socket){
        socket.on("join",function(data,callback){
            socket.join(data.room);
            users.Addusername(socket.id,data.name,data.room);
            var names=users.GetUserList(data.room);
            io.to(data.room).emit("namelist",names);
            callback();
        })
        socket.on("chat message",function(msg,callback){
            io.to(msg.room).emit("new message",{
                text:msg.txt,
                room:msg.room,
                from:msg.sender
            })
            callback();
        })
        socket.on("disconnect",function(){
            var user=users.RemoveUser(socket.id);
            if(user){
                io.to(user.room).emit("namelist",users.GetUserList(user.room));
            }
        });
    });
}