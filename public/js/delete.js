$(document).ready(function() {
  $('.delete').on('click', function(){
    $target = $(event.target);
    const id = $target.attr('data-id');
    $.ajax({
      url: '/users/orders/'+id,
      type: 'DELETE',
    }).done(()=>{
      window.location.href = '/users/orders'
    })
  });
});
