$(document).ready(function(){
    var socket=io();
    var room=$("#groupname").val();
    var sender=$("#sender").val();
    var userImage=$("#userimage").val();
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
        console.log(data.MessageAt);
        $("#feedback").html("");
        var messages=document.querySelector("#message");
        var li=document.createElement("li");
        li.className="sent";
        li.innerHTML="<img src='https://placehold.it/300x300' alt=''/>"+
        "<p><span class='message'>"+data.text+"</span><br><span class='messageAt'>"+data.MessageAt+"</span></p>"+
        messages.appendChild(li);
    })
    socket.on("new-msg",function(data){
        var messages=document.querySelector("#message");
        var li=document.createElement("li");
        li.className="replies";
        if (data.name.length>0){
            li.innerHTML = "<img src='https://placehold.it/300x300' alt=''/>" +
            "<p><span class='message'>"+data.text+"</span><br><span class='messageAt'>"+data.MessageAt+"<img src='https://webchatapp.s3.ap-south-1.amazonaws.com/double_black.png' alt=''></span></p>"
        }
        else{
            li.innerHTML = "<img src='https://placehold.it/300x300' alt=''/>" +
            "<p><span class='message'>"+data.text+"</span><br><span class='messageAt'>"+data.MessageAt+"<img src='https://webchatapp.s3.ap-south-1.amazonaws.com/double_black.png' alt=''></span></span></p>"
        }
        messages.appendChild(li);
    })
    socket.on("Type",function(data){
        var name=data.name;
        $("#feedback").html("<p><em>("+name+" is typing a message ...)</em></p>");
    })
    function submitForm() {
            var msg = $("#msg").val();
            var At=moment().format("hh:mm a");
            $.ajax({
                url:"/MessageList/"+room,
                type:"POST",
                data:{
                    message:msg,
                    userImage:userImage,
                    MessageAt:At,
                    sender:sender,
                    group:room,
                    isRead:"false",
                },
                success:function(){
                    socket.emit("chat message", {
                        txt: msg,
                        room: room,
                        sender: sender,
                        messageAt:At
                    }, function () {
                        $("#msg").val("");
                    })
                }
            });
    }
    $("#send-message").on("click",function(){
        submitForm();
    })
    $('#msg').keypress(function(e) {
        socket.emit("typing",{
            name:sender
        })
        var key = e.which;
        if (key == 13) {
        // As ASCII code for ENTER key is "13"
        submitForm();
        return false; // Submit form code
        }
        });
})