const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

var boardJson = null;
var randomRank = null;
var runID = null;
var trueRank = null;
var correctAnswer = null;
var correctName = null;
var filterMode = 0;

function reset() {
    // Get a random map ID from maplist.js
    if(filterMode == 0) {
        var randomMap = Math.floor(Math.random() * 108) + 1;
    } else if(filterMode == 1) {
        var randomMap = Math.floor(Math.random() * 60) + 1;
    } else if(filterMode == 2) {
        var randomMap = Math.floor(Math.random() * 48) + 61;
    }
    var mapID = mapsJson[randomMap - 1].mapid;

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
            var previousRunID = null;
            if(previousRunID == runID) {
                console.error("Duplicate run, generating new run ID");
                rankGenerateRunID();
            }
            previousRunID = runID;

            // Check and update text if coop
            if(mapsJson[randomMap - 1].num > 60) {
                document.getElementById("whorun-text").innerHTML = "Whose POV is this?";
            } else {
                document.getElementById("whorun-text").innerHTML = "Whose run is this?";
            }
            
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
                if (i != randomRank && boardJson[Object.keys(boardJson)[randomRank]].scoreData.hasDemo == 1) {
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

// Handle runner guesses
var runnerStreak = 0;
var highscore = localStorage.getItem("runner-highscore") || 0;
document.getElementById("streak-text").innerHTML = "Streak: " + runnerStreak;
document.getElementById("highstreak-text").innerHTML = "High-score streak: " + highscore;

function runnerGuess(input) {
        if(input === correctAnswer) {
            if(confirm("You guessed correct! it was " + correctName + "!")) {
                runnerStreak++;
                if(runnerStreak > highscore) {
                    highscore = runnerStreak;
                    localStorage.setItem("runner-highscore", highscore);
                    document.getElementById("highstreak-text").innerHTML = "High-score streak: " + highscore;
                }
                document.getElementById("streak-text").innerHTML = "Streak: " + runnerStreak;
                reset();
            }
        } else {
            if(confirm("You guessed wrong! The correct answer was " + correctName + ".")) {
                runnerStreak = 0;
                document.getElementById("streak-text").innerHTML = "Streak: " + runnerStreak;
                reset();
            }
        }
    }
function runnerGuess1() { var ans = 1; runnerGuess(ans); }
function runnerGuess2() { var ans = 2; runnerGuess(ans); }
function runnerGuess3() { var ans = 3; runnerGuess(ans); }
function runnerGuess4() { var ans = 4; runnerGuess(ans); }

// Info page stuff
function openCloseInfo() {
    document.querySelector(".info-container").classList.toggle("hidden");
}

// Change filter
function changeFilter(filter) {
    if(filter == "all") {
        rankStreak = 0;
        filterMode = 0;
        document.getElementById("streak-text").innerHTML = "Streak: " + rankStreak;
        reset();
    } else if(filter == "sp") {
        rankStreak = 0;
        filterMode = 1;
        document.getElementById("streak-text").innerHTML = "Streak: " + rankStreak;
        reset();
    }
    else if(filter == "coop") {
        rankStreak = 0;
        filterMode = 2;
        document.getElementById("streak-text").innerHTML = "Streak: " + rankStreak;
        reset();
    }
}