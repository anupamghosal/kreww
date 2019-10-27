 function toggleMenu() {
    var toggle = document.getElementById("toggling");

    if (toggle.style.height === "calc(100vh - 4em)")
    {
    toggle.style.height = "0px";
    } else{
      toggle.style.height = "calc(100vh - 4em)";
    }

    var anim =  document.getElementById("line");
    if (anim.classList.contains("open"))
    {
    anim.classList.remove("open");
    } else{
      anim.classList.add("open");
    }

    var noScroll = document.body;

    if (noScroll.style.overflowY === "hidden")
    {
    noScroll.style.overflowY = "visible";
    } else{
    noScroll.style.overflowY = "hidden";
    }
  }
