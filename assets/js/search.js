document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
      // Swiper ayarları buraya gelecek
      slidesPerView: 1,
      spaceBetween: 10,
      // Diğer ayarlar...
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  });