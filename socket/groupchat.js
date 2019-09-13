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
            socket.to(msg.room).broadcast.emit("new message",{
                text:msg.txt,
                room:msg.room,
                sender:msg.sender,
                MessageAt:msg.messageAt
            })
            var name=users.Getname(socket.id);
            io.to(socket.id).emit("new-msg",{
                text:msg.txt,
                room:msg.room,
                sender:msg.sender,
                name:name,
                MessageAt:msg.messageAt
            })
            callback();
        })
        socket.on("typing",function(data){
            socket.broadcast.emit("Type",{
                name:data.name
            });
        })
        socket.on("disconnect",function(){
            var user=users.RemoveUser(socket.id);
            if(user){
                io.to(user.room).emit("namelist",users.GetUserList(user.room));
            }
        });
    });
}