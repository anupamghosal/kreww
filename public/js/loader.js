var queue = new createjs.LoadQueue(false);
var bar = $('#progress');
queue.on("progress", event=>{
  let progress = Math.floor(event.progress * 100);
  bar.css("width",progress+"%");

  if(progress > 98)
  $('#loader path').css({ 'fill': '#fff', 'stroke-width': '0px'});
  if(progress == 100) {

    setTimeout(()=>{
        $('#loader svg').css({'transform': 'scale(0.5)', 'opacity': '0.4'});
        $('#loader').slideUp(500);
        $('#loader').css('z-index','8');
        $('.progress-cont').css('display','none');
    },800);


  }
});

queue.on("fileload", handleComplete);
queue.loadFile("../assets/appliance/background/aircon.jpg");
queue.loadFile("../assets/appliance/background/fridge.jpg");
queue.loadFile("../assets/appliance/background/washMachine.jpg");
queue.loadFile("../assets/appliance/background/exhaust.jpg");
queue.loadFile("../assets/appliance/background/micro.jpg");
queue.loadFile("../assets/appliance/background/tv.jpg");
queue.loadFile("../assets/appliance/background/boiler.jpg");
queue.loadFile("../assets/services/background/electrician.jpg");
queue.loadFile("../assets/services/background/plumber.jpg");
queue.loadFile("../assets/services/background/carpenter.jpg");
queue.loadFile("../assets/services/background/cleaner.jpg");
queue.loadFile("../assets/services/background/pest.jpg");
queue.loadFile("../assets/services/background/handy.jpg");
queue.loadFile("../assets/services/background/painter.jpg");

function handleComplete(){

}
