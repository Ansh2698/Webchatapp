$(document).ready(function(){
    var socket=io();
    var room=$("#groupname").val();
    var sender=$("#sender").val();
    var params={
        room:room,
        name:sender
    };
    socket.on("connect",function(){
        console.log("Yeah!");
        socket.emit("join",params,function(){
            console.log("user has connected to this channel");
        })
    })
    socket.on("namelist",function(users){
        var ol=$("<ol></ol>");
        for(var i=0;i<users.length;i++){
            ol.append("<p><a data-target='#myModal' data-toggle='modal' id='val'>"+users[i]+"</a></p>");
        }
        $(document).on("click","#val",function(e){
            $("#name").text("@"+$(e.target).text());
            $("#receiverName").val($(e.target).text());
            $("#nameLink").attr("href","/profile/"+$(e.target).text());
        })
        $("#numValue").html("("+users.length+")");
        $("#users").html(ol);
    })
    socket.on("new message",function(data){
       var template=$("#message-template").html();
       var message=Mustache.render(template,{
           sender:data.from,
           txt:data.text,
           room:data.room
       });
       $("#message").append(message);
    })
    $("#message-form").on("submit",function(e){
        e.preventDefault();
        var message=$("#msg").val();
        socket.emit("chat message",{
            txt:message,
            room:room,
            sender:sender
        },function(){
            $("#msg").val("");
        })
    })
})