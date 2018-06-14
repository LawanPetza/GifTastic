$(document).ready(function () {
    var topics = ["Messi", "Neymar", "Ronaldo", "Harry Kane", "Manuel Neuer"]

    function gifPlayer() {
        console.log("Hello World")

        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>")
            button.addClass("gifButton")
            button.attr("data-name", topics[i])
            button.append(topics[i])
            $("#buttons-view").prepend(button);
        }
    }
    gifPlayer()

    // Event listener for all button elements
    $("button").on("click", function () {
        // In this case, the "this" keyword refers to the button that was clicked
        var soccerPlayer = $(this).attr("data-name");

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            soccerPlayer + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results)

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var ratingText = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var personImage = $("<img class = 'soccerPlayer'>");


                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        // personImage.attr("src", results[i].images.fixed_height_still.url);

                        var gifImage = results[i].images.fixed_height.url;
                        var stillImage = results[i].images.fixed_height_still.url;


                        personImage.attr("src", stillImage);
                        personImage.attr("alt", "gif");
                        personImage.attr("data-state", "still");
                        personImage.attr("data-still", stillImage);
                        personImage.attr("data-animate", gifImage);


                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(ratingText);
                        gifDiv.append(personImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#players-view").prepend(gifDiv);
                    }
                }
            });

        $(document).on("click", ".soccerPlayer", pauseGifPlayer);

        //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
        function pauseGifPlayer() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }


    });

    // function renderButtons() {
    //     $("#buttons-view").empty();

    //     for (var i = 0; i < topics.length; i++) {
    //         var newButton = $("<button>");
    //         newButton.addClass("gifButton")
    //         newButton.attr("data-name", topics[i]);
    //         newButton.text(topics[i]);

    //         $("#buttons-view").append(newButton);
    //     }

    // }
    // renderButtons();

    // $("#add-player").on("click", function () {
    //     event.preventDefault();
    //     var player = $("#player-input").val().trim();
    //     topics.push(player);
    //     renderButtons();
    //     // return false;
    // });


    // $("#buttons-view").on("click", ".gifButton", function () {
    //     // console.log("click")

    //     var soccerPlayer = $(this).attr("data-name")
    //     console.log(soccerPlayer)

    //     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //         soccerPlayer + "&api_key=IjO0LqOOvP8SDiSxnFR1MoEjCH2pB108&limit=10";
    //     console.log(queryURL);

    //     // Performing our AJAX GET request
    //     $.ajax({ url: queryURL, method: "GET" }).then(function (response) {

    //         // After the data comes back from the API

    //         // Storing an array of results in the results variable
    //         var results = response.data;
    //         console.log(results);

    //         // Looping over every result item
    //         for (var i = 0; i < results.length; i++) {
    //             // Only taking action if the photo has an appropriate rating
    //             if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    //                 // Creating a div with the class "item"
    //                 // var gifDiv = $("<div class='item'>");
    //                 // Storing the result item's rating
    //                 var rating = results[i].rating;
    //                 // Creating a paragraph tag with the result item's rating
    //                 var ratingText = $("<p>").text("Rating: " + rating);

    //                 // Creating an image tag

    //                 var image = $("<image>")
    //                 var gifImage = results[i].images.fixed_height.url;
    //                 var stillImage = results[i].images.fixed_height_still.url;

    //                 // Giving the image tag an src attribute of a proprty pulled off the
    //                 // result item

    //                 image.attr("src", stillImage);
    //                 image.attr("alt", "gif");
    //                 image.attr("data-state", "still");
    //                 image.attr("data-still", stillImage);
    //                 image.attr("data-animate", gifImage);



    //                 // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
    //                 $("#players-view").prepend(image, ratingText);
    //                 // checkState();
    //             }
    //         }
    //     });
    // });
    // // $(".img-thumbnail").on({
    // //     'click': function() {
    // //         var src = ($(this).attr('src') === stillImage) ?
    // //             stillImage :
    // //             gifImage;
    // //         $(this).attr('src', src);
    // //         console.log(img-thumbnail);

    // //     }
    // // });


    // $(".img").on("click", function () {
    //     var state = $(this).attr("data-state");
    //     if (state === "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //     } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //     }
    // });




});