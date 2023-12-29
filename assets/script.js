
$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    
    // Get the id of the containing time-block
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block and and uses parseInt to convert currentHour and timeBlockHour to an integer
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var currentHour = parseInt(dayjs().format("H")); // 
    var timeBlockHour = parseInt(timeBlockId.split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Get the user input from local storage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
