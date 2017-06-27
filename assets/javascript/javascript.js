//vars


var topics =["cat", "dog", "bird", "rabbit", "rat"];
var giphyImages;

//functions

function addButton(topic) {
    var buttonHtml = "<button class='topicButton' id='" + topic + "'>" + topic + "</button>";
    $("#animalButtons").append(buttonHtml);
    $("#" + topic).click(function(){
        topicClicked(topic);
    })
}

function topicClicked(topic) {
    console.log(topic);
    //e313b0f01a3d441b8e00e11d6d09d377
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
        "&api_key=e313b0f01a3d441b8e00e11d6d09d377&limit=10&rating=pg-13";
    //console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(data){
        console.log(data);
        giphyImages = data.data;
        $("#gifs-appear-here").empty();
        for (var i = 0; i < giphyImages.length; i++) {
            console.log(giphyImages[i].rating);
            console.log(giphyImages[i].images.fixed_width.url);
            console.log(giphyImages[i].images.fixed_width_still.url);
            var imageHtml = "<div class='imageBox'>" + "Rating: " + giphyImages[i].rating + 
                            "<br><br><img class='gif'" + 
                            "src='" + giphyImages[i].images.fixed_width_still.url + "' " +
                            "data-still='" + giphyImages[i].images.fixed_width_still.url + "' " +
                            "data-animate='" + giphyImages[i].images.fixed_width.url + "' " +
                            "data-state='still' ></div>";
            console.log(imageHtml);
            $("#gifs-appear-here").append(imageHtml);
         }

        $(".gif").click(function() {
            var state = $(this).attr("data-state");
            if (state === "still" ) {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });

}

//events(calls)
$("#animalInputForm").submit(function(event) {
    var animalInput = $("#animalInput").val().trim();
    if (topics.indexOf(animalInput)=== -1) {

    topics.push(animalInput);
    addButton(animalInput);
}
    $("#animalInput").val("");
    event.preventDefault();
});

$(document).ready(function(){
    for(var i = 0; i < topics.length; i++) {
        addButton(topics[i]);
    }
});

