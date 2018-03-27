
// Initial array of animals
var topics = ["fox", "cat", "pig", "tiger", "cheetah",
                  "giraffe", "hedgehog", "skunk", "guinea pig", "lizard",
                  "goat", "horse", "cow", "alligator", "kangaroo",
                  "panda", "koala", "deer", "elephant", "racoon", "squirrel"];

function renderButtons() {

  $("#buttonPanel").empty();

  for (var i = 0; i < topics.length; i++) {

    var button = $("<button>");
    button.addClass("animalButton");
    button.attr("data-animal", topics[i]);
    button.text(topics[i]);

    $("#buttonPanel").append(button);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animal-input").val().trim();

  topics.push(animal);
  $("#animal-input").val("");

  renderButtons();
});

function fetchAnimalGifs() {

  var animalName = $(this).attr("data-animal");
  var animalStr = animalName.split(" ").join("+");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
  
    var dataArray = result.data;

    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("animalGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#gifPanel").append(newDiv);
    }
  });
}

function animateAnimalGif() {

  var state = $(this).find("img").attr("data-state");

  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".animalButton", fetchAnimalGifs);

$(document).on("click", ".animalGif", animateAnimalGif);