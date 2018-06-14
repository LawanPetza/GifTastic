$(document).ready(function () {
    var topics = ["Messi", "Neymar", "Ronaldo"]

    // function displayPlayer() {
    //     console.log("Hello World")

    //     for (var i = 0; i < topics.length; i++) {
    //         var button = $("<button>")
    //         button.addClass("gifButton")
    //         button.attr("data-name", topics[i])
    //         button.append(topics[i])
    //         $("#buttonsView").prepend(button);
    //     }
    // }
    // displayPlayer()

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("gifButton")
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);

            $("#buttons-view").append(newButton);
        }

    }
    renderButtons();

    $("#add-player").on("click", function () {
        event.preventDefault();
        var player = $("#player-input").val().trim();
        topics.push(player);
        renderButtons();
        // return false;
    });


    $("#buttons-view").on("click", ".gifButton", function () {
        // console.log("click")

        var soccerPlayer = $(this).attr("data-name")
        console.log(soccerPlayer)

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            soccerPlayer + "&api_key=IjO0LqOOvP8SDiSxnFR1MoEjCH2pB108&limit=10";
        console.log(queryURL);

        // Performing our AJAX GET request
        $.ajax({ url: queryURL, method: "GET" }).then(function (response) {

            // After the data comes back from the API

            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    // var gifDiv = $("<div class='item'>");
                    // Storing the result item's rating
                    var rating = results[i].rating;
                    // Creating a paragraph tag with the result item's rating
                    var ratingText = $("<p>").text("Rating: " + rating);

                    // Creating an image tag

                    var image = $("<image>")
                    var gifImage = results[i].images.fixed_height.url;
                    var stillImage = results[i].images.fixed_height_still.url;

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                   
                    image.attr("src", stillImage);
                    image.attr("alt", "gif");
                    image.attr("data-state", "still");
                    image.attr("data-still", stillImage);
                    image.attr("data-animate", gifImage);
                    // $('.image').html('<img class="img-thumbnail" src="' + stillImage + ' "data-state="still"' + '>');
                    // $('.image').html('<img class="img-thumbnail" src="' + gifImage + ' "data-state="still"' + '>');
        

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#players-view").prepend(image, ratingText);
                    // checkState();
                }
            }
        });
    });
    // $(".img-thumbnail").on({
    //     'click': function() {
    //         var src = ($(this).attr('src') === stillImage) ?
    //             stillImage :
    //             gifImage;
    //         $(this).attr('src', src);
    //         console.log(img-thumbnail);

    //     }
    // });


    $(".img").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });




});