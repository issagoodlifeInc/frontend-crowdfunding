$(document).ready(function() {
  // Show pop-up
  $(".btn-back").click(function() {
    $("#on-pledge").show();
    $("main").css("visibility", "hidden");
    $(".brig").css("opacity", "0.8");
  });
  // Close Pop-up
  $(".exit").click(function() {
    $("#on-pledge").hide();
    $(".brig").css("opacity", "0");
    $("main").css("visibility", "visible");
  });

  $(".btn-submit-cash").click(function() {
    $("#thank-you").show();

  });

});