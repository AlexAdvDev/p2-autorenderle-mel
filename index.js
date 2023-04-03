const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

// Get a random map ID from maplist.js
var randomMap = Math.floor(Math.random() * 60) + 1;
var mapID = mapsJson[randomMap - 1].mapid;
console.log("Map ID: " + mapID + " (map number " + randomMap + ")");

var boardJson = null;
var runID = null;
var trueRank = null;
$(document).ready(function() {
    // Get the boards JSON
    $.getJSON(boardsBase + "/chamber/" + mapID + "/json", function(data) {
        boardJson = data;
        console.log(boardJson);
    }).then(function() {
        function generateRunID() {
            // Generate a random rank between 1 and 200 (slightly broken)
            var randomRank = Math.floor(Math.random() * 200) + 1;
            trueRank = randomRank +1 ;
            console.log("Rank: " + trueRank);

            // Get the run ID from boards api
            runID = boardJson[Object.keys(boardJson)[randomRank]].scoreData.changelogId;
            console.log("Run ID: " + runID);

            // Check if the run ID has a valid demo (and autorender)
            if(boardJson[Object.keys(boardJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no autorender, generating new run ID");
                generateRunID();
            }
        }

        // Generate the run ID
        generateRunID();

        // Display autorender
        var videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = apiBase + "/video/" + runID + "/video";
    });
});

// Submitted Guess function
var submitText = document.getElementById("rankGuess");
submitText.onkeyup = function(e) {
    if(e.keyCode == 13){
       submitGuess();
    }
}
function submitGuess() {
    var guess = submitText.value;
    console.log("Guess: " + guess);

    // Check if guess is correct
    if(guess == trueRank) {
        alert("Correct!");
    } else {
        alert("Incorrect!");
    }
}