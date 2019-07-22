$(document).ready(function(){
    var socket = io();
    
    var room = $('#groupName').val();
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
        url:"/group/"+room,
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
        url:"/group/"+room,
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
            url:"/group/"+room,
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
            url:"/group/"+room,
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
$('#add_friend').on('submit', function(e){
    e.preventDefault();
    
    var receiverName = $('#receiverName').val();
     $.ajax({
         url: '/group/'+room,
         type: 'POST',
         data: {
             receiverName: receiverName
         },
         success: function(){
            socket.emit('friendRequest', {
                receiver: receiverName,
                 sender: sender
         }, function(){
                 console.log('Request Sent');
             })
         }
    })
});
})