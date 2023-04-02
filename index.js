const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

const randomMap = Math.floor(Math.random() * 60) + 1;
var mapID = mapsJson[randomMap - 1].mapid;
console.log("Map ID: " + mapID + " (map number " + randomMap + ")");

// currently not working, getting this error:
// Uncaught TypeError: Cannot read properties of undefined (reading 'keys')
// from line 24, specifically "keys[randomRank - 1]"
var boardJson;
var keys;

fetch('https://board.portal2.sr/chamber/' + mapID + '/json').then(function(response) {
    return response.json();
}).then(function(obj) {
    console.log(obj);
    boardJson = obj;
    keys = Object.keys(boardJson);
    console.log(keys);
});

const randomRank = Math.floor(Math.random() * 200) + 1;
console.log("Rank: " + randomRank);
var runID = boardJson.keys[randomRank - 1].scoreData.changelogId;
//console.log("Run ID: " + runID);

var videoPlayer = document.getElementById("videoPlayer");
//videoPlayer.src = apiBase + "/video/" + runID + "/video";