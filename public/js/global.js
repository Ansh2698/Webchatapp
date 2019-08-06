$(document).ready(function(){
    var socket=io();
    var username=$("#user-name").val();
    var userImage=$("#user-image").val();
    socket.on("connect",function(){
        var params={
            room:"GlobalRoom",
            name:username,
            img:userImage
        };
        socket.emit("GlobalJoined",params,function(){
            console.log("Global Joined");
        })
    })
    socket.on("loggedInUser",function(user){
        var friends=$(".friend").text();
        var friend=friends.split("@");
        var ol=$("<div></div>");
        var arr=[];
        for(var i=0;i<user.length;i++){
            if(friend.indexOf(user[i].username)>-1){
                arr.push(user[i].username);
                var list = '<img src="https://placehold.it/300x300" class="pull-left img-circle" style="width:50px; height:50px; margin-right:10px;" /><p>' +
                '<a id="val" href="/chat/"><h3 style="padding-top:15px;color:gray; font-size:14px;">'+'@'+user[i].username+'<span class="fa fa-circle online_friend"></span></h3></a></p>' +
                '<div class="clearfix"></div><hr style=" margin-top: 14px; margin-bottom: 14px;" />'
                ol.append(list);  
            }
        }
        $("#numOfFriends").text("("+ arr.length +")");
        $(".onlineFriends").html(ol);
    })
})