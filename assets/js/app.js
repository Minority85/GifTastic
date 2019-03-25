var names = ["fox", "turtle", "cat", "buffalo", "crow", "seal", "eagle", "mouse", "ants", "tiger"];
var gotNames = ["jon snow", "house stark", "king joffery", "winter is coming", "cersei lannister"];
var dataHolder = true;
var apiKey = "aAzuofkf1CDirDH1Beh8nyTLxRfds6MC";
var valueNumber = 20;

function pageLoad() {

    var nav = $("<nav>").addClass("navbar").addClass("navbar-dark").addClass("bg-dark");
    var navForm = $("<form class='form-inline'>");
    var navInput = $("<input id='newAnimal'>").attr("type", "text").addClass("form-control").attr("placeholder", "Example: Eagle");
    var navSubmit = $("<input id='add-button'>").attr("type", "submit").attr("value", "Submit").addClass("btn").addClass("btn-primary").text("Search");
    var navMore = $("<input id='more-button'>").attr("type", "submit").attr("value", "More").addClass("btn").addClass("btn-primary");
    var navGot = $("<input id='got-button'>").addClass("gotChange").attr("type", "submit").attr("value", "Game of Thrones").addClass("btn").addClass("btn-warning");
    var navAnimal = $("<input id='animal-button'>").addClass("animalChange").attr("type", "submit").attr("value", "Animals").addClass("btn").addClass("btn-success");
    var navDiv = $("<div>");

    navForm.append(navInput).append(navSubmit).append(navMore);
    navDiv.append(navGot).append(navAnimal);
    nav.append(navForm).append(navDiv);

    $("#navRow").append(nav);
};

function animate() {
    // console.log("TEST")
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

    valueNumber = 20;

    $("#imgHere").empty();

    // testing for animal
    // var searchAnimal = "frog";

    var searchAnimal = $(this).attr("data-name");

    dataHolder = searchAnimal;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&api_key=" + apiKey + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var result = response.data;

        for (i = 0; i < result.length; i++) {

            var imgDiv = $("<div>").addClass("card");

            var textDiv = $("<div>").addClass("card-body");

            var p = $("<p class='cardbody'>").text("Rating: " + result[i].rating).css("float", "left");

            var buttonFav = $("<button class='fave btn btn-primary'>").text("Favorite").css("float", "right");

            var image = $("<img>").attr("src", result[i].images.fixed_height_still.url).attr("data-still",
                result[i].images.fixed_height_still.url).attr("data-animate", result[i].images.fixed_height.url).attr("data-state",
                    "still").addClass("gif");

            textDiv.append(p).append(buttonFav);
            imgDiv.append(image).append(textDiv);

            $("#imgHere").append(imgDiv);

        }
    });
};

function randomQuery() {

    event.preventDefault();

    $("#imgHere").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dataHolder + "&api_key=" + apiKey + "&limit=" + valueNumber

    console.log(dataHolder)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var result = response.data;

        for (i = 0; i < result.length; i++) {

            var imgDiv = $("<div>").addClass("card");

            var textDiv = $("<div>").addClass("card-body");

            var p = $("<p class='cardbody'>").text("Rating: " + result[i].rating).css("float", "left");

            var buttonFav = $("<button class='fave btn btn-primary'>").text("Favorite").css("float", "right");

            var image = $("<img>").attr("src", result[i].images.fixed_height_still.url).attr("data-still",
                result[i].images.fixed_height_still.url).attr("data-animate", result[i].images.fixed_height.url).attr("data-state",
                    "still").addClass("gif");

            textDiv.append(p).append(buttonFav);
            imgDiv.append(image).append(textDiv);

            $("#imgHere").append(imgDiv);
        }
        valueNumber += 10;

        console.log(valueNumber)
    });
};

function renderButtons() {

    $("#buttonArea").empty();

    for (var i = 0; i < names.length; i++) {

        var a = $("<button>").addClass("animalButton").addClass("btn").addClass("btn-info").attr("data-name",
            names[i]).text(names[i]);

        $("#buttonArea").append(a);
    }
};

function newAnimal() {

    event.preventDefault();

    var ab = $("#newAnimal").val().trim();

    $("#newAnimal").val("");

    if (ab === "") {

    }
    else {
        names.push(ab);

        renderButtons();
    }
};

function gotQuery() {

    event.preventDefault();

    console.log("TEST")

    document.documentElement.style.background = "url('assets/images/gotbg.jpg') no-repeat center center fixed";
    document.documentElement.style.backgroundSize = "cover";
    document.documentElement.style.minHeight = "100%";

    $("#buttonArea").empty();
    $("#imgHere").empty();
    $("#newAnimal").attr("placeholder", "Example: Westeros");

    dataHolder = true;

    for (var i = 0; i < gotNames.length; i++) {

        var a = $("<button>").addClass("animalButton").addClass("btn").addClass("btn-info").attr("data-name",
            gotNames[i]).text(gotNames[i]);

        $("#buttonArea").append(a);
    }

}

function moreButton() {

    event.preventDefault();

    if (dataHolder === true) {
        // console.log("Nothing!!!");
    }
    else {
        randomQuery()
    }
}

function animalQuery() {

    event.preventDefault();

    console.log("TEST")

    document.documentElement.style.background = "url('assets/images/bg.jpg') no-repeat center center fixed";
    document.documentElement.style.backgroundSize = "cover";
    document.documentElement.style.minHeight = "100%";

    $("#buttonArea").empty();
    $("#imgHere").empty();
    $("#newAnimal").attr("placeholder", "Example: Eagle");

    dataHolder = true;

    for (var i = 0; i < names.length; i++) {

        var a = $("<button>").addClass("animalButton").addClass("btn").addClass("btn-info").attr("data-name",
            names[i]).text(names[i]);

        $("#buttonArea").append(a);
    }
}

$(document).on("click", "#animal-button", animalQuery);

$(document).on("click", "#more-button", moreButton);

$(document).on("click", "#got-button", gotQuery);

$(document).on("click", "#add-button", newAnimal);

$(document).on("click", ".gif", animate);

$(document).on("click", ".animalButton", gifQuery);


pageLoad()
renderButtons();