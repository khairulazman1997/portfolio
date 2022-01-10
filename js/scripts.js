/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Disable Carousel Autoscroll
    $(".carousel").carousel({interval: false});

    // Auto-pause videos on closing modals and sliding
  $(`.portfolio-modal`).on('hidden.bs.modal', function () {
    $(`#${this.id} iframe`).attr("src", $(`#${this.id} iframe`).attr("src"));
  });

  $(`.portfolio-modal`).on('slide.bs.carousel', function () {
    console.log(this.id);
    $(`#${this.id} iframe`).attr("src", $(`#${this.id} iframe`).attr("src"));
  });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict


const videos = []
const tag = document.createElement("script")
const firstScriptTag = document.getElementsByTagName("script")[0]

tag.src = "https://www.youtube.com/iframe_api"
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// YouTube wants this function, don't rename it
function onYouTubeIframeAPIReady() {
  const slides = Array.from(document.querySelectorAll(".carousel-item"))
  slides.forEach((slide, index) => {
    // does this slide have a video?
    const video = slide.querySelector(".video-player")
    if (video && video.dataset) {
      const player = createPlayer({
        id: video.id,
        videoId: video.dataset.videoId,
      })
      videos.push({ player, index })
    }
  })
}

function createPlayer(playerInfo) {
  return new YT.Player(playerInfo.id, {
    videoId: playerInfo.videoId,
    playerVars: {
      showinfo: 0,
    },
  })
}

function theBigPause() {
  videos.map(video => video.player.pauseVideo())
}

$(function () {
  $(".carousel").on("slide.bs.carousel", function (e) {
    theBigPause()
    const next = $(e.relatedTarget).index()
    const video = videos.filter(v => v.index === next)[0]
    if (video) {
      video.player.playVideo()
    }
  })
})
