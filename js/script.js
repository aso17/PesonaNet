const navbarNav = document.querySelector(".navbar-nav");

document.querySelector("#humbuger-menu").onclick = () => {
  const navnav = document.querySelector("#navactive");
  if (navnav == undefined) {
    navbarNav.id = "navactive";
  } else {
    document.querySelector("#navactive").id = "";
  }
};
