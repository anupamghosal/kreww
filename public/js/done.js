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
        window.location.href= '/associate/dashboard';
    });

      });

});
