$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
      $(".nav_white").css("background", "rgba(255, 255, 255)");
      $(".logo").css("height", "3vw");
      $(".margin_logo").css("padding-top", "0.5vh");
      $(".margin_logo").css("padding-bottom", "0.25vh");
    } else {
      $(".nav_white").css("background", "none");
      $(".logo").css("height", "4vw");
      $(".margin_logo").css("padding-top", "2.5vh");
    }
  });
});
