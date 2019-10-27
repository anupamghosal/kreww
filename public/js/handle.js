$(document).ready(function() {
  $('.submitDelay').click(function(){
    $target = $(event.target);
    var id = $target.attr('data-id');
    console.log(id);
    var delay = $("#delaySelect option:selected").val();

      $.post('/associates/orders/'+id, {
      respon:'delay',
      orderID: id,
      delay: delay
    }).done(()=>{
      
    });

      });

});
