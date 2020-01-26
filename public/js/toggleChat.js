$(document).ready(function(){
  var chat = $('.chat-cont');
  $('.chat-toggle').click(function(){
    if(chat.hasClass('openChat')){
      chat.removeClass('openChat');
      $('.chat-toggle').removeClass('openChat');
      $('.chat').removeClass('openChat');
      $('.close-icon').removeClass('openChat');

    }

    else{
      $('.chat-cont').addClass("openChat");
      $('.chat-toggle').addClass('openChat');
      $('.chat').addClass('openChat');
      $('.close-icon').addClass('openChat');
    }

  });

});
