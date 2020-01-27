$(document).ready(()=>{
  var text = $('.mob.location-input');
  var container = $('.mob.location-cont');
  var menuWrap = $('.mob.menu-wrap')
  var btn = $('.mob.cancelBtn');
  var menuItem = $(".mob.menu-item");

  text.focus(()=>{

    container.css('width', '95vw');
    menuWrap.css({"top": "0","height": "100vh"});
    btn.css({"margin-right": "2px","opacity": "1"});
    menuItem.css("opacity", "0");
  });

  $('.mob.cancelBtn').click(()=>{
    container.css('width', '80vw');
    menuWrap.css({"top": "4em","height": "calc(100vh - 4em)"});
    btn.css({"margin-right": "-5px","opacity": "0"});
    menuItem.css("opacity", "1");
  });

});
