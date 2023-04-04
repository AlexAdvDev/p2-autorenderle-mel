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
var correctAnswer = null;
var correctName = null;
$(document).ready(function() {
    // Get the boards JSON
    $.getJSON(boardsBase + "/chamber/" + mapID + "/json", function(data) {
        boardJson = data;
        console.log(boardJson);
    }).then(function() {
        function rankGenerateRunID() {
            // Generate a random rank between 1 and 40 (slightly broken)
            randomRank = Math.floor(Math.random() * 40);
            trueRank = randomRank +1 ;
            console.log("Rank: " + trueRank);

            // Get the run ID from boards api
            runID = boardJson[Object.keys(boardJson)[randomRank]].scoreData.changelogId;
            console.log("Run ID: " + runID);

            // Check if the run ID has a valid demo
            if(boardJson[Object.keys(boardJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no demo, generating new run ID");
                rankGenerateRunID();
            }
        }

        function setAnswers() {
            var names = [];
            names.push(boardJson[Object.keys(boardJson)[randomRank]].userData.boardname);
            console.log("Correct answer: " + names[0]);
            correctName = names[0];
            names.shift();
            
            // Add names of the other top 40 runners, but skip over the name just added
            for (var i = 0; i < 40; i++) {
                if (i != randomRank) {
                    names.push(boardJson[Object.keys(boardJson)[i]].userData.boardname);
                }
            }
            console.log(names);

            // Randomly assign the names to buttons
            var answers = document.getElementsByClassName("runner-answer");
            var randomCorrect = Math.floor(Math.random() * 4);
            correctAnswer = randomCorrect + 1;
            answers[randomCorrect].innerHTML = correctName;
            for (var i = 0; i < 4; i++) {
                if (i != randomCorrect) {
                    // Randomly pick a name from the array
                    var randomName = Math.floor(Math.random() * names.length);
                    answers[i].innerHTML = names[randomName];
                    // Remove the name from the array so it can't be used again
                    names.splice(randomName, 1);
                }
            }
        }

        // Generate the run ID
        rankGenerateRunID();
        setAnswers();

        // Display autorender
        var player = document.getElementById("player");
        player.src = apiBase + "/video/" + runID + "/video";
    });
});

function runnerGuess(input) {
console.log("Input: " + input + " | Correct answer: " + correctAnswer);
    if(input === correctAnswer) {
        if(confirm("You guessed correct!")) {
            window.location.reload();
        }
    } else {
        if(confirm("You guessed wrong! The correct answer was " + correctName + ".")) {
            window.location.reload();
        }
    }
}

function runnerGuess1() { var ans = 1; runnerGuess(ans); }
function runnerGuess2() { var ans = 2; runnerGuess(ans); }
function runnerGuess3() { var ans = 3; runnerGuess(ans); }
function runnerGuess4() { var ans = 4; runnerGuess(ans); }