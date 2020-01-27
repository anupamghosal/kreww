 function toggleMenu() {
    var toggle = document.getElementById("toggling");

    if (toggle.style.height === "calc(100vh - 3.5em)")
    {
    toggle.style.height = "0px";
    } else{
      toggle.style.height = "calc(100vh - 3.5em)";
    }

    var anim =  document.getElementById("line");
    var items = document.querySelectorAll(".menu-item");
    if (anim.classList.contains("open"))
    {
    anim.classList.remove("open");
    items.forEach((el,i)=>{
      el.classList.remove("opened");
    });
    } else{
      anim.classList.add("open");
      items.forEach((el,i)=>{
        el.classList.add("opened");
      });
    }

    var noScroll = document.body;

    if (noScroll.style.overflowY === "hidden")
    {
    noScroll.style.overflowY = "visible";
    } else{
    noScroll.style.overflowY = "hidden";
    }
  }
