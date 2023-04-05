const apiBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

var boardJson = null;
var randomRank = null;
var runID = null;
var trueRank = null;
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
        console.log(boardJson);
    }).then(function() {
        function rankGenerateRunID() {
            // Generate a random rank between 1 and 200 (slightly broken)
            randomRank = Math.floor(Math.random() * 200);
            trueRank = randomRank +1 ;

            // Get the run ID from boards api
            runID = boardJson[Object.keys(boardJson)[randomRank]].scoreData.changelogId;
            var previousRunID = null;
            if(previousRunID == runID) {
                console.error("Duplicate run, generating new run ID");
                rankGenerateRunID();
            }
            previousRunID = runID;
            
            // Check if the run ID has a valid demo
            if(boardJson[Object.keys(boardJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no demo, generating new run ID");
                rankGenerateRunID();
            }
        }

        // Generate the run ID
        rankGenerateRunID();

        // Display autorender
        var videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = apiBase + "/video/" + runID + "/video";
        document.getElementById("rank-guess").value = "";
    });
}

// Start the loop initially
reset();
document.getElementById("streak-text").innerHTML = "Streak: 0";
document.getElementById("highstreak-text").innerHTML = "High-score streak: 0";

// Submitted Guess function
var rankStreak = 0;
var highscore = localStorage.getItem("rank-highscore") || 0;

function rankSubmitGuess() {
    var submitText = document.getElementById("rank-guess");
    // Check if guess is correct by margins
    if(submitText.value == trueRank) {
        if(confirm("You guessed exactly right!" + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            rankStreak++;
            if(rankStreak > highscore) {
                highscore = rankStreak;
                localStorage.setItem("rank-highscore", highscore);
                document.getElementById("highstreak-text").innerHTML = "High-score streak: " + highscore;
            }
            document.getElementById("streak-text").innerHTML = "Streak: " + rankStreak;
            reset();
        }
    } else if(trueRank - 10 <= submitText.value && submitText.value <= trueRank + 10) {
        if(confirm("You guessed within 10 ranks! The correct answer was " + trueRank + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            rankStreak++;
            if(rankStreak > highscore) {
                highscore = rankStreak;
                localStorage.setItem("rank-highscore", highscore);
                document.getElementById("highstreak-text").innerHTML = "High-score streak: " + highscore;
            }
            document.getElementById("streak-text").innerHTML = "Streak: " + streak;
            reset();
        }
    } else if(trueRank - 20 <= submitText.value && submitText.value <= trueRank + 20) {
        if(confirm("You guessed within 20 ranks! The correct answer was " + trueRank + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            rankStreak = 0;
            document.getElementById("streak-text").innerHTML = "Streak: " + rankStreak;
            reset();
        }
    } else {
        if(confirm("You guessed wrong! The correct answer was " + trueRank + " ran by " + boardJson[Object.keys(boardJson)[randomRank]].userData.boardname)) {
            rankStreak = 0;
            document.getElementById("streak-text").innerHTML = "Streak: " + rankStreak;
            reset();
        }
    }
}

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