///////////////////////////////////////////////////////////
// Audio
var audioOn = $("#audioOn")[0];
var audioOff = $("#audioOff")[0];
var audio = $("#audio")[0];
audio.volume = 0.5;
audioOn.volume = 0.5;
audioOff.volume = 0.5;
$(document).ready(function () {
  $(".main-nav a,.btn,.nav-button").mouseenter(function () {
    audio.play();
  });
  $(".main-nav a,.btn,.nav-button").mouseleave(function () {
    audio.pause();
  });
});

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// CLose Navigation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".nav-bar");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

//////////////////////////////////////////////////////
// Scroll to add shadow to navbar

window.addEventListener("scroll", (e) => {
  const nav = document.querySelector(".header");
  if (window.pageYOffset > 0) {
    nav.classList.add("add-shadow");
  } else {
    nav.classList.remove("add-shadow");
  }
});

//////////////////////////////////////////////////////
// Active Navlink according to section

$(document).ready(function () {
  $(document).on("scroll", function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".main-nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top - 300 <= scrollPos &&
        refElement.position().top - 300 + refElement.height() > scrollPos
      ) {
        $(".main-nav ul li a").removeClass("Navactive");
        currLink.addClass("Navactive");
      } else {
        currLink.removeClass("Navactive");
      }
    });
  });
});

//////////////////////////////////////////////////////
// Switch for dark and light mode
//Detect system theme and set theme according to it.

window.addEventListener("load", () => {
  //Preloader
  setTimeout(function () {
    $("body").addClass("loaded");
  }, 1000);
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    enableDarkMode();
    //set Icon onLoad
    $(".dark-mode-toggle").load("click", function () {
      $(this).attr("data-before", "🌞"); //anything is the 'content' value
    });
  } else {
    disableDarkMode();
    $(".dark-mode-toggle").load("click", function () {
      $(this).attr("data-before", "🌙"); //anything is the 'content' value
    });
  }
});
// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", null);
};

// When someone clicks the button
darkModeToggle.addEventListener("click", () => {
  // get their darkMode setting
  darkMode = localStorage.getItem("darkMode");

  // if it not current enabled, enable it
  if (darkMode !== "enabled") {
    $(".dark-mode-toggle").load("click", function () {
      //do something with the callback
      $(this).attr("data-before", "🌞"); //anything is the 'content' value
      audioOn.play();
    });
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    $(".dark-mode-toggle").load("click", function () {
      //do something with the callback
      $(this).attr("data-before", "🌙"); //anything is the 'content' value
      audioOff.play();
    });
    disableDarkMode();
  }
});

/////////////////////////////////////////////
// Wow Library
new WOW().init();
