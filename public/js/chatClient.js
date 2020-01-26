$(document).ready(function(){
  h = $('#output').prop('scrollHeight');
  $('#output').animate({ scrollTop: h + 'px' }, 300);
  var socket = io.connect();

  var message = $('#message'),
  handle = $('#send').attr('data-user')
  btn = $('#send'),
  output = $('#output');

  socket.emit('getChat', btn.attr('data-order'));
  console.log(btn.attr('data-order'));

  socket.on('outputChat', (chats)=>{
    $.each(chats, (i,data)=> displayChat(data));
  });


  message.keyup(()=>{
    $('#send span').css('opacity','1');
    if(!message.val().trim()){
      $('#send span').css('opacity','0.4');
    }
    else {
      btn.click(function() {
        if(message.val() != ""){
          socket.emit('chat', {
            message: message.val(),
            handle: handle,
            order: $('#send').attr('data-order')
          });
          message.val('');
        }
        });
    }
  });



  socket.on('chat', (data)=> displayChat(data));


  function displayChat(data){
    var msg = $("<span>").text(data.message);

    if (data.handle === handle)
        msg = $('<div>').append(msg).css("text-align", "right");

    else
      msg = $('<div>').append(msg).css("text-align", "left");
    output.append(msg);
    h = output.prop('scrollHeight');
    output.animate({ scrollTop: h + 'px' }, 500);
  }


});
