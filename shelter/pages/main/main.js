let navBurger = document.querySelector(".nav-burger")
let nav = document.querySelector(".nav")
let burger = document.querySelector(".burger")
let activeLink = document.querySelector(".nav-list__link_active")
let darkOpacCont = document.querySelector(".dark-opac-container")

burger.addEventListener("click", toggleBurger)
activeLink.addEventListener("click", toggleBurger)
darkOpacCont.addEventListener("click", toggleBurger)


function toggleBurger() {
  nav.classList.toggle("showNav")
  darkOpacCont.classList.toggle("showNav")
  burger.classList.toggle("showClose")
  document.body.classList.toggle("scroll-lock")
}


//move logo to nav?
//burger absolute?