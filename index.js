const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

// Get a random map ID from maplist.js
var randomMap = Math.floor(Math.random() * 60) + 1;
var mapID = mapsJson[randomMap - 1].mapid;
console.log("Map ID: " + mapID + " (map number " + randomMap + ")");

var boardJson = null;
var randomRank = null;
var runID = null;
var trueRank = null;
$(document).ready(function() {
    // Get the boards JSON
    $.getJSON(boardsBase + "/chamber/" + mapID + "/json", function(data) {
        boardJson = data;
        console.log(boardJson);
    }).then(function() {
        function rankGenerateRunID() {
            // Generate a random rank between 1 and 200 (slightly broken)
            randomRank = Math.floor(Math.random() * 200) + 1;
            trueRank = randomRank +1 ;
            console.log("Rank: " + trueRank);

            // Get the run ID from boards api
            runID = boardJson[Object.keys(boardJson)[randomRank]].scoreData.changelogId;
            console.log("Run ID: " + runID);

            // Check if the run ID has a valid demo (and autorender)
            if(boardJson[Object.keys(boardJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no autorender, generating new run ID");
                rankGenerateRunID();
            }
        }

        // Generate the run ID
        rankGenerateRunID();

        // Display autorender
        var videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = apiBase + "/video/" + runID + "/video";
    });
});

// Submitted Guess function
function rankSubmitGuess() {
    var submitText = document.getElementById("rank-guess").value;
    console.log("Guess: " + submitText);
    
    // Check if guess is correct by margins
    if(submitText == trueRank) {
        if(confirm("You guessed exactly right!" + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            window.location.reload();
        }
    } else if(trueRank - 10 < submitText && submitText < trueRank + 10) {
        if(confirm("You guessed within 10 ranks! The correct answer was " + trueRank + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            window.location.reload();
        }
    } else if(trueRank - 20 < submitText && submitText < trueRank + 20) {
        if(confirm("You guessed within 20 ranks! The correct answer was " + trueRank + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            window.location.reload();
        }
    } else {
        if(confirm("You guessed wrong! The correct answer was " + trueRank + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            window.location.reload();
        }
    }
}