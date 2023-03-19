$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
      $(".navigtion-bar").css("background", "#FFFFFF");
      $(".navigtion-bar").addClass("drop-shadow-md");

      $(".navigtion-bar img").css("height", "3.75vw");
      $(".navigtion-bar.padding").css("padding-top", "1vh");
      $(".navigtion-bar.padding").css("padding-bottom", "1.1vh");
    } else {
      $(".navigtion-bar").css("background", "none");
      $(".navigtion-bar").addClass("drop-shadow-md");

      $(".navigtion-bar img").css("height", "4vw");
      $(".navigtion-bar.padding").css("padding-top", "2vh");
    }
  });
});
