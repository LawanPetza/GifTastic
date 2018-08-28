$(document).ready(function () {
    var players = ["Messi", "Neymar", "Ronaldo", "Harry Kane", "Manuel Neuer", "Stuart Franklin", "Toni Kroos"]

    //function to make buttons and add page
    function makeButtons() {

        $("#buttons-view").empty();

        // loops through the players array
        for (var i = 0; i < players.length; i++) {
            var button = $("<button>")
            button.addClass("soccerBtn")
            button.attr("data-name", players[i])
            button.text(players[i])
            $("#buttons-view").append(button);
        }
    }
    // makeButtons()

    // Event listener for all button elements
    $(document).on("click", ".soccerBtn", function () {
        $("#players-view").empty();
        $("#soccerBtn").removeClass("active");
        $(this).addClass("active")

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

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='player-item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var ratingText = $("<p>").text("Rating: " + rating);

                        var gifImage = results[i].images.fixed_height.url;
                        var stillImage = results[i].images.fixed_height_still.url;

                        // Creating an image tag
                        var personImage = $("<img>");
                        personImage.attr("src", stillImage);
                        personImage.attr("data-still", stillImage);
                        personImage.attr("data-animate", gifImage);
                        personImage.attr("data-state", "still");
                        personImage.addClass("soccerPlayer");
                        
                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(ratingText);
                        gifDiv.append(personImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#players-view").prepend(gifDiv);
                    }
                }
            });

        $(document).on("click", ".soccerPlayer", function() {

            //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
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

    //add-player button event
    $("#add-player").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newPlayer = $("#player-input").val().trim();

        // Adding player from the textbox to our array
        players.push(newPlayer);

        makeButtons();

    });

    makeButtons();

});