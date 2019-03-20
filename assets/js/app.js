var names = ["fox", "turtle", "cat"];

function animate() {
    console.log("TEST")
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

function gifQuery() {

    $("#imgHere").empty();

    var apiKey = "aAzuofkf1CDirDH1Beh8nyTLxRfds6MC";

    // testing for animal
    // var searchAnimal = "frog";

    var searchAnimal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&api_key=" + apiKey + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var result = response.data;

        for (i = 0; i < result.length; i++) {

            var imgDiv = $("<div>").addClass("box");

            var p = $("<p>").text("Rating: " + result[i].rating);

            var image = $("<img>").attr("src", result[i].images.fixed_height_still.url).attr("data-still",
                result[i].images.fixed_height_still.url).attr("data-animate", result[i].images.fixed_height.url).attr("data-state",
                "still").addClass("gif");

            imgDiv.append(p).append(image);

            $("#imgHere").append(imgDiv);

        }
    });
};

function renderButtons() {

    $("#buttonArea").empty();

    for (var i = 0; i < names.length; i++) {

        var a = $("<button>").addClass("animalButton").addClass("btn").addClass("btn-info").attr("data-name", 
        names[i]).text(names[i]);

        $("#buttonArea").append(a);
    }
}

// $("#testBtn").on("click", function (event) {

//     event.preventDefault();

//     gifQuery();

// });

$(document).on("click", ".gif", animate);

$(document).on("click", ".animalButton", gifQuery);

renderButtons();