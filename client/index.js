var socket = io();
var userId = "user";


$("#led-link").on('click', function(e){
    socket.emit('toogle led', {value: 0, userId: userId});
});


$("#led-link1").on('click', function(e){
    socket.emit('toogle led1', {value: 0, userId: userId});
});


$("#fan-link").on('click', function(e){
    socket.emit('toogle fan', {value: 0, userId: userId});
});
$('#fanButton0').on('click',function(e){

    socket.emit('fan control',{value : '10', userId : userId});
});
$('#fanButton1').on('click',function(e){
    socket.emit('fan control',{value : '50', userId : userId});
});    
$('#fanButton2').on('click',function(e){
    socket.emit('fan control',{value : '100', userId : userId}); });

$('#fanButton3').on('click',function(e){
    socket.emit('fan control',{value : '150', userId : userId});
});
$('#fanButton4').on('click',function(e){
    socket.emit('fan control',{value : '200', userId : userId});
});
$('#fanButton5').on('click',function(e){
    socket.emit('fan control',{value : '250', userId : userId});
});
    socket.on('toogle led', function(msg) {
    if(msg.value === false) {
        $('#messages').prepend($('<li>Toogle LED: OFF<span> - '+msg.userId+'</span></li>'));
        $("#led-container").removeClass("on");
        $("#led-container").addClass("off");
        $("#led-container span").text("OFF");
    }
    else if(msg.value === true) {
        $('#messages').prepend($('<li>Toogle LED: ON<span> - '+msg.userId+'</span></li>'));
        $("#led-container").removeClass("off");
        $("#led-container").addClass("on");
        $("#led-container span").text("ON");
    }
});

socket.on('toogle led1', function(msg) {
    if(msg.value === false) {
        $('#messages').prepend($('<li>Toogle LED: OFF<span> - '+msg.userId+'</span></li>'));
        $("#led-container1").removeClass("on");
        $("#led-container1").addClass("off");
        $("#led-container1 span").text("OFF");
    }
    else if(msg.value === true) {
        $('#messages').prepend($('<li>Toogle LED: ON<span> - '+msg.userId+'</span></li>'));
        $("#led-container1").removeClass("off");
        $("#led-container1").addClass("on");
        $("#led-container1 span").text("ON");
    }
});

socket.on('toogle fan', function(msg) {
    if(msg.value === false) {
        $('#messages').prepend($('<li>Toogle LED: OFF<span> - '+msg.userId+'</span></li>'));
        $("#fan-container").removeClass("on");
        $("#fan-container").addClass("off");
        $("#fan-container span").text("OFF");
    }
    else if(msg.value === true) {
        $('#messages').prepend($('<li>Toogle LED: ON<span> - '+msg.userId+'</span></li>'));
        $("#fan-container").removeClass("off");
        $("#fan-container").addClass("on");
        $("#fan-container span").text("ON");
    }
});

    




window.onunload = function(e) {
    socket.emit("user disconnect", userId);
}
