$(document).ready(function() {
  $('.accept').click(function(){
    $target = $(event.target);
    const id = $target.attr('data-id');
    $.post('/associate/orders/'+id, {
              respon: 'accepted',
              orderID: id
            }).done(()=> {
              window.location.href= '/associate/todo';
            });
      });
  });
