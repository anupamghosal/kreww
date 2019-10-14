$(document).ready(()=>{

    $('#loader path').css({ 'fill': '#000', 'stroke-width': '0px'}).fadeOut(100,()=> {
      $('#loader').fadeOut(100, ()=> {
        $('#loader').css({'display': 'none'});
      });
  });
});
