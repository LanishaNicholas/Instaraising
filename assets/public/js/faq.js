$(document).ready(function () {
    $("#faqSearch").on("input", function () {
      var query = $(this).val().toLowerCase();
      
      // Loop through each FAQ item
      $(".card").each(function () {
        var question = $(this)
          .find(".btn-link")
          .text()
          .toLowerCase();
        
        // Check if the question contains the search query
        if (question.includes(query)) {
          $(this).show(); // Show the FAQ item
        } else {
          $(this).hide(); // Hide the FAQ item
        }
      });
    });
});