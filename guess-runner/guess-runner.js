const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

// Get a random map ID from maplist.js
var randomMap = Math.floor(Math.random() * 60) + 1;
var mapID = mapsJson[randomMap - 1].mapid;

var boardJson = null;
var randomRank = null;
var runID = null;
var trueRank = null;
var correctAnswer = null;
var correctName = null;

function reset() {
    // Get the boards JSON
    $.getJSON(boardsBase + "/chamber/" + mapID + "/json", function(data) {
        boardJson = data;
    }).then(function() {
        function rankGenerateRunID() {
            // Generate a random rank between 1 and 40 (slightly broken)
            randomRank = Math.floor(Math.random() * 40);
            trueRank = randomRank +1 ;
            // Get the run ID from boards api
            runID = boardJson[Object.keys(boardJson)[randomRank]].scoreData.changelogId;
            // Check if the run ID has a valid demo
            if(boardJson[Object.keys(boardJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no demo, generating new run ID");
                rankGenerateRunID();
            }
        }

        function setAnswers() {
            var names = [];
            names.push(boardJson[Object.keys(boardJson)[randomRank]].userData.boardname);
            correctName = names[0];
            names.shift();
            // Add names of the other top 40 runners, but skip over the name just added
            for (var i = 0; i < 40; i++) {
                if (i != randomRank) {
                    names.push(boardJson[Object.keys(boardJson)[i]].userData.boardname);
                }
            }

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
}

// Start the loop initially
reset();
document.getElementById("streak-text").innerHTML = "Streak: 0";

// Handle runner guesses
var streak = 0;
function runnerGuess(input) {
        if(input === correctAnswer) {
            if(confirm("You guessed correct! it was " + correctName + "!")) {
                streak++;
                document.getElementById("streak-text").innerHTML = "Streak: " + streak;
                reset();
            }
        } else {
            if(confirm("You guessed wrong! The correct answer was " + correctName + ".")) {
                streak = 0;
                document.getElementById("streak-text").innerHTML = "Streak: " + streak;
                reset();
            }
        }
    }
function runnerGuess1() { var ans = 1; runnerGuess(ans); }
function runnerGuess2() { var ans = 2; runnerGuess(ans); }
function runnerGuess3() { var ans = 3; runnerGuess(ans); }
function runnerGuess4() { var ans = 4; runnerGuess(ans); }