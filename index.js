const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

// Get a random map ID from maplist.js
const randomMap = Math.floor(Math.random() * 60) + 1;
var mapID = mapsJson[randomMap - 1].mapid;
console.log("Map ID: " + mapID + " (map number " + randomMap + ")");

var boardJson = null;
var runID = null;
$(document).ready(function() {
    // Get the boards JSON
    $.getJSON(boardsBase + "/chamber/" + mapID + "/json", function(data) {
        boardJson = data;
        console.log(boardJson);
    }).then(function() {
        // Generate a random rank between 1 and 200 (slightly broken)
        const randomRank = Math.floor(Math.random() * 200) + 1;
        const trueRank = randomRank +1 ;
        console.log("Rank: " + trueRank);

        // Get the run ID from the random rank and boards
        runID = boardJson[Object.keys(boardJson)[randomRank]].scoreData.changelogId;
        console.log("Run ID: " + runID);

        // Display autorender
        var videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = apiBase + "/video/" + runID + "/video";
    });
});