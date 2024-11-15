const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector(".nav");
const btns = document.querySelector(".btns");

menu.addEventListener("click", () => {
  menu.style.display = "none";
  close.style.display = "block";
  nav.classList.add("small");
  btns.classList.add("small");
  setTimeout(() => {
    nav.style.left = "0";
    btns.style.left = "0";
  }, 10); // Use a timeout to allow the browser to register the change in state before applying transition
});

close.addEventListener("click", () => {
  menu.style.display = "block";
  close.style.display = "none";
  nav.style.left = "-50%";
  btns.style.left = "-50%";
});
