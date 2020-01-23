$(document).ready(function(){
  h = $('#output').prop('scrollHeight');
  $('#output').animate({ scrollTop: h + 'px' }, 0);
  var socket = io.connect();

  var message = $('#message'),
  handle = $('#send').attr('data-user')
  btn = $('#send'),
  output = $('#output');


  $(" #send ").click(function() {
    socket.emit('chat', {
      message: $('#message').val(),
      handle: handle
    });
  });



  socket.on('chat', function(data){
    var msg = $("<span>").text(data.message);

    if (data.handle === handle)
        msg = $('<div>').append(msg).css("text-align", "right");

    else
      msg = $('<div>').append(msg).css("text-align", "left");
    $('#output').append(msg);
    h = $('#output').prop('scrollHeight');
    $('#output').animate({ scrollTop: h + 'px' }, 500);
  });


});
