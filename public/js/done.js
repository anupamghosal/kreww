$(document).ready(function() {
  $('.done').click(function(){
    $target = $(event.target);
    var id = $target.attr('data-id');
    console.log(id);
    var otp = $("#otp").val();

      $.post('/associate/orders/'+id, {
      otp: otp,
      respon:'done',
      orderID: id,
    }).done(()=>{
      var socket = io();
        var user = id
        var orderID = id

        socket.emit('refresh', user , orderID);


      socket.on('response', (associate,order)=> {
        location.reload().delay(500);
        location.reload();
      })
    });

      });

});
