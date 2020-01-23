
var queue = new createjs.LoadQueue(false);

queue.on("progress", event=>{
  let progress = Math.floor(event.progress * 100)+"%";
  console.log(progress);
  $('#progress').css("width",progress);
  if(progress == "100%") {
    setTimeout(()=>{
      $('#loader path').css({ 'fill': '#fff', 'stroke-width': '0px'});
        $('#loader').slideUp();
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
