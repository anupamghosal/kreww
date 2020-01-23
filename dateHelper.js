 function dates(){
  var today = new Date();
  var d= today.getDay();
  var days= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday"];

  var lasts = [31, 28, 31, 30, 31, 30, 31, 31,30, 31,30, 31];
  var months = ["Jan", "Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  var d1= today.getDate();
  d-=1;
  var mon= today.getMonth();
  var month = months[mon];
  var i,upcoming=[];
  for(i=0; i<7; i++)
    {
      upcoming.push({date: d1, day: days[d],month: month});
      if(d1+1 < lasts[mon])

      d1++;
      else
      d1=1;

      if(d+1 < 7)
      d+=1;
      else
      d=0;
    }

    return upcoming;

}

var upcoming = dates();


module.exports = upcoming;
