$(document).ready(()=>{
  $('.mob.location-input').focus(()=>{

    $('.mob.location-cont').css('width', '95vw');
    $('.header').animate({"position": "absolute", "right": "0","left": "0","top": "-4em"},0);
    $('.mob.menu-wrap').css({"top": "0","height": "100vh"});
    $('.mob.cancelBtn').css({"margin-right": "2px","opacity": "1"});
    $(".mob.menu-item").css("opacity", "0");
  });

  $('.mob.cancelBtn').click(()=>{
    $('.mob.location-cont').css('width', '80vw');
    $('.header').animate({"top":"0", "position": "sticky"},0);
    $('.mob.menu-wrap').css({"top": "4em","height": "calc(100vh - 4em)"});
    $('.mob.cancelBtn').css({"margin-right": "-5px","opacity": "0"});
    $(".mob.menu-item").css("opacity", "1");
  });

});
