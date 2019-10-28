$(document).ready(function() {
  $('.submitDelay').click(function(){
    $target = $(event.target);
    var id = $target.attr('data-id');
    var delay = $("#delaySelect option:selected").val();

      $.post('/associate/orders/'+id, {
      respon:'delay',
      orderID: id,
      delay: delay
    }).done(()=>{
    });

      });

});
