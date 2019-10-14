$(window).scroll(function(){

  var wScroll = $(this).scrollTop();
  console.log('hi');
  $('.man').css({
    'transform' : 'translate(0px, -' + (wScroll /40) + '%)'
  });

  $('.big-logo').css({
    'transform' : 'translate(0px, ' + (wScroll /4) + '%)'
  });

  $('.fig-cap').css({
    'transform' : 'translate(0px, ' + (wScroll /4) + '%)'
  });

});
