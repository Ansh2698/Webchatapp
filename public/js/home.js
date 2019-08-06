$(document).ready(function(){
    var socket = io();
    var sender = $('#sender').val();
    
    socket.on('connect', function(){
        var params = {
            sender: sender
        }
        
        socket.emit('joinRequest', params, function(){
            console.log('Joined');
        });
});
$(".accept_friend").on("click",function(){
    var senderName =$(this).parent().children("input:nth-child(2)").val();
    var senderId=$(this).parent().children("input:nth-child(1)").val();
    $.ajax({
        url:"/home",
        type:'POST',
        data:{
            senderName:senderName,
            senderId:senderId
        },
        success: function(){
            $(this).parent().eq(1).remove();
        }
    });
    $("#reload").load(location.href + " #reload");
});
$(".cancel_friend").on("click",function(){
    var senderName =$(this).parent().children("input:nth-child(2)").val();
    var senderId=$(this).parent().children("input:nth-child(1)").val();
    $.ajax({
        url:"/home",
        type:'POST',
        data:{
            sender_Name:senderName,
            sender_Id:senderId
        },
        success: function(){
            $(this).parent().eq(1).remove();
        }
    });
    $("#reload").load(location.href + " #reload");
})
socket.on("newFriendRequest",function(friend){
    $("#reload").load(location.href + " #reload");
    $(document).on("click",".accept_friend",function(){
        var senderName =$(this).parent().children("input:nth-child(2)").val();
        var senderId=$(this).parent().children("input:nth-child(1)").val();
        $.ajax({
            url:"/home",
            type:'POST',
            data:{
                sender_Name:senderName,
                sender_Id:senderId
            },
            success: function(){
                $(this).parent().eq(1).remove();
            }
        });
        $("#reload").load(location.href + " #reload");
    });
    $(document).on("click",".cancel_friend",function(){
        var senderName =$(this).parent().children("input:nth-child(2)").val();
        var senderId=$(this).parent().children("input:nth-child(1)").val();
        $.ajax({
            url:"/home",
            type:'POST',
            data:{
                sender_Name:senderName,
                sender_Id:senderId
            },
            success: function(){
                $(this).parent().eq(1).remove();
            }
        });
        $("#reload").load(location.href + " #reload");
    });
});
$(document).on('submit',".favorite",function(e) {
    e.preventDefault();
    var club_name=$(this).find('input[name="clubName"]').val();
    var club_country=$(this).find('input[name="clubcountry"]').val();
    var club_Id=$(this).find('input[name="clubId"]').val();
    $.ajax({
        url:"/home",
        type:'POST',
        data:{
            clubName:club_name,
            clubId:club_Id
        },
        success: function(){
            console.log(club_name);
        }
    });
  });
})