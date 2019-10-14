$(document).ready(function() {
  $('.reject').click(function(){
    $target = $(event.target);
    const id = $target.attr('data-id');
    $.post('/associate/orders/'+id, {
              respon: 'rejected',
              orderID: id
            }).done(()=> {
              window.location.href= '/associate/todo';
            });
          location.reload();
      });

  });
