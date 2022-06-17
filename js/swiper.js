// Initialize Swiper
function initSwiper() {
  var swiper = new Swiper(".card_slider", {
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },

      768: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 4,
      },
    },
  });
}
