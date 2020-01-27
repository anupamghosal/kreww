$(document).ready(()=>{
  var text = $('.mob.location-input');
  var container = $('.mob.location-cont');
  var header = $('.header');
  var menuWrap = $('.mob.menu-wrap')
  var btn = $('.mob.cancelBtn');
  var menuItem = $(".mob.menu-item");

  text.focus(()=>{

    container.css('width', '95vw');
    header.css({"height":"0", "padding" : "0"});
    menuWrap.css({"top": "0","height": "100vh"});
    btn.css({"margin-right": "2px","opacity": "1"});
    menuItem.css("opacity", "0");
  });

  $('.mob.cancelBtn').click(()=>{
    container.css('width', '80vw');
    header.css({"height":"2em", "padding" : "1em 1.5em"});
    menuWrap.css({"top": "4em","height": "calc(100vh - 4em)"});
    btn.css({"margin-right": "-5px","opacity": "0"});
    menuItem.css("opacity", "1");
  });

});
