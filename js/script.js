const navbarNav = document.querySelector(".navbar-nav");

document.querySelector("#humbuger-menu").onclick = () => {
  const navnav = document.querySelector("#navactive");
  if (navnav == undefined) {
    navbarNav.id = "navactive";
  } else {
    document.querySelector("#navactive").id = "";
  }
};

const hamburger = document.querySelector("#humbuger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    const navnav = document.querySelector("#navactive");
    if (navnav == undefined) {
      navbarNav.id = "";
    } else {
      document.querySelector("#navactive").id = "";
    }
  }
});
