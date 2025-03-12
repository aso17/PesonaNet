const check = document.querySelector("input");
const ul = document.querySelector("ul");

check.addEventListener("click", function () {
  ul.classList.toggle("slide");
});

const scrollAnimasi1 = document.querySelector(".scroll-animasi-1");
const scrollAnimasi2 = document.querySelector(".scroll-animasi-2");
const scrollAnimasi3 = document.querySelector(".scroll-animasi-3");
const scrollAnimasi4 = document.querySelector(".scroll-animasi-4");
const scrollAnimasi5 = document.querySelector(".scroll-animasi-5");
const scrollAnimasi6 = document.querySelector(".scroll-animasi-6");

window.addEventListener("scroll", () => {
  const posisiScroll = window.scrollY;

  if (posisiScroll > scrollAnimasi1.offsetTop - window.innerHeight) {
    scrollAnimasi1.classList.add("active");
  }

  if (posisiScroll > scrollAnimasi2.offsetTop - window.innerHeight) {
    scrollAnimasi2.classList.add("active");
  }

  if (posisiScroll > scrollAnimasi3.offsetTop - window.innerHeight) {
    scrollAnimasi3.classList.add("active");
  }

  if (posisiScroll > scrollAnimasi4.offsetTop - window.innerHeight) {
    scrollAnimasi4.classList.add("active");
  }

  if (posisiScroll > scrollAnimasi5.offsetTop - window.innerHeight) {
    scrollAnimasi5.classList.add("active");
  }

  if (posisiScroll > scrollAnimasi6.offsetTop - window.innerHeight) {
    scrollAnimasi6.classList.add("active");
  }
});
