$(document).ready(()=>{
  var text = $('.mob.location-input');
  var btn = $('.mob.cancelBtn');
  var menuItem = $(".mob.menu-item");

  text.focus(()=>{
    btn.css({"margin-right": "2px","opacity": "1"});
    menuItem.css("opacity", "0");
  });

  $('.mob.cancelBtn').click(()=>{
    revert();
  });

  $('#hamburger').click(()=>{
    revert();
  })


  function revert(){
    btn.css({"margin-right": "-5px","opacity": "0"});
    menuItem.css("opacity", "1");
    text.val('');
  }

});
