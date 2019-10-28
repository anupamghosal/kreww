$(document).ready(()=>{
  var socket = io();
  $('.update').click(()=> {

    $target = $(event.target);
    var user = $target.attr('data-user');
    var orderID = $target.attr('data-id');

    socket.emit('refresh', user , orderID);
  });

  socket.on('response', (associate,order)=> {
    location.reload().delay(500);
    location.reload();
  })

});
