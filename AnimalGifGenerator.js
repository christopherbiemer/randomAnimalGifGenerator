//setting the initial array of gif buttons
var gifButtons = ["cat", "dog", "rabbit", "hedgehog", "parrot"];
//setting a universal variable for the gif stills
var stillURL;
//setting a universal variable for the animated gif
var imageURL;
//setting a universal variable for the rating
var rating;

//function to display the 10 gifs and their corresponding ratings
function gifGenerator() {
	//overwrite the gifview div
	$("#gifview").html("");
	//determines which animal button the user clicked and asigns the animal name to a variable
	var animal = $(this).attr("data-name");
	//search query URL that pulls 10 items associated with the animal button the user clicks
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"
	//performs an AJAX call
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	//function performed after the data object is called
	.done(function(response) {
		//loop to grab 10 separate gifs with corresponding ratings
		for (var i = 0; i<10; i++) {
			//grabs still URL from the response object
			stillURL = response.data[i].images.original_still.url;
			//grabs animated URL from the response object
			imageURL = response.data[i].images.original.url;
			//grabs the rating from the response object
			rating = response.data[i].rating;
			//creates a separate div to display each gif and rating
			var gifDiv = $("<div>");
			//adds a unique class and bootstrap position classes to the gif div
			gifDiv.attr("class", "col-md-4 col-sm-4 col-xs-12 gifplayer");
			//creates a header tag to eventually display each rating
			var ratingInfo = $("<h3>");
			//adds bootstrap position classes to the rating
			ratingInfo.attr("class", "text-center col-md-12 col-sm-12 col-xs-12");
			//adds the corresponding rating to the header tag
			ratingInfo.append("Rating: " + rating);
			//creates an image tag to eventually display each gif
			var gifDisplayer = $("<img>");
			//initially displays the still image
			gifDisplayer.attr("src", stillURL);
			//sets data-still to the still image URL
			gifDisplayer.attr("data-still", stillURL);
			//sets data-animate to the animated image URL
			gifDisplayer.attr("data-animate", imageURL);
			//sets the initial data state to still to reflect the fact that the initial URL is in fact the still URL
			gifDisplayer.attr("data-state", "still");
			//sets a unique class and bootstrap sizing classes to the gif within the div
			gifDisplayer.attr("class", "gif col-md-12 col-sm-12 col-xs-12");
			//adds the rating info to the gifDiv container
			gifDiv.append(ratingInfo);
			//adds the still giff to the gifDiv container
			gifDiv.append(gifDisplayer);
			//adds the gifDiv container to the gifview div
			$("#gifview").append(gifDiv);
		}
	})
	
}

//displays the buttons in the array
function renderButtons() {
	//empties out the button-view
	$("#button-view").empty();
	//rotates through the array
	for (var i = 0; i<gifButtons.length; i++) {
		//sets a button tag to a variable
		var animalButton = $("<button>");
		//adds classes to the button
		animalButton.addClass("animal btn btn-info text-center");
		//adds a corresponding data name
		animalButton.attr("data-name", gifButtons[i]);
		//adds corresponding text to the gif buttons
		animalButton.text(gifButtons[i]);
		//appends each button to the button-view display div at the top of the page
		$("#button-view").append(animalButton);
	}
}

//when the user clicks on submit
$("#add-animal").on("click", function(event) {
	//prevents refreshing the page
	event.preventDefault();
	//sets the user input to a variable
	var newAnimal = $("#gif-input").val().trim();
	//if the user inputs nothing, do not add a new button
	if (newAnimal === "") {
		//run the function without pushing the blank string to the gifButtons array
		renderButtons();
	}
	//if the user inputs something
	else {
		//push the user input into the gifButtons array
		gifButtons.push(newAnimal);
		//render the new set of buttons
		renderButtons();
	}
})

//click listener for animal button clicks to call gifGenerator function
$(document).on("click", ".animal", gifGenerator);

//click listener for animal gif clicks to pause/play gifs
$(document).on("click", ".gif", function() {
	//set the current data state of the gif to a variable
	var state = $(this).attr("data-state");
	//if the current state of the gif is still
	if (state === "still") {
		//change the image source to the animated URL
		$(this).attr("src", $(this).attr("data-animate"));
		//change the current state to animate
		$(this).attr("data-state", "animate");
	}
	//if the current state of the gif is animate
	else {
		//change the image source to the still URL
		$(this).attr("src", $(this).attr("data-still"));
		//change the current state to still
		$(this).attr("data-state", "still");
	}
})

//displays the initial set of buttons
renderButtons();