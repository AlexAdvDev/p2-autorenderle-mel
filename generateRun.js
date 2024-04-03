const autorenderBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

var previousRunID;
var mapFilterMode = 0;
var rankFilterMode = 40;

var correctAnswerButton;
var corectName;
var correctRank;
var randomRank;

function reset() {
    // Generate random map (based on filter)
    var randomMap;
    if(mapFilterMode == 0) {
        randomMap = Math.floor(Math.random() * 108); // all maps
    } else if(mapFilterMode == 1) {
        randomMap = Math.floor(Math.random() * 60); // only sp
    } else if(mapFilterMode == 2) {
        randomMap = Math.floor(Math.random() * 48) + 60; // only coop
    }
    var mapID = mapsObject[randomMap].mapid;

    // Update text on screen depending on SP or Co-op
    if(randomMap < 60) {
        document.getElementById("whose-run").innerHTML = "Whose run is this?";
    } else {
        document.getElementById("whose-run").innerHTML = "Whose POV is this?";
    }

    // Get boards API for randomly generated mapID
    fetch(`${boardsBase}/chamber/${mapID}/json`)
        .then(res => res.json())
        .then(data => {
            boardsJson = data;

            // Generate random rank between 1 and whatever the rank filter is set to  and get run ID
            randomRank = Math.floor(Math.random() * rankFilterMode);
            correctRank = randomRank + 1;
            runID = boardsJson[Object.keys(boardsJson)[randomRank]].scoreData.changelogId;
            correctName = boardsJson[Object.keys(boardsJson)[randomRank]].userData.boardname;

            // Check if the run ID has a valid demo
            if(boardsJson[Object.keys(boardsJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no demo, generating new run ID");
                reset();
            }

            // Duplicate run checking (only one back cause why not)
            if(runID == previousRunID) {
                console.error("Run ID is a duplicate, generating new run ID");
                reset();
            }
            previousRunID = runID;
            
            // START UP THE GAME BITCHES!!!!!!

            // Display autorender
            var player = document.getElementById("player");
            player.src = `${autorenderBase}/video/${runID}/video`;
            //Set player answers
            setAnswers(randomRank);
            // Reset and start timer
            clearInterval(Interval);
            tens = "00";
            seconds = "00";
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
        });
}

function setAnswers(randomRank) {
    var nameOptions = [];
    // add the names of the 10 runners above and below the correct runner, if they exist
    for (var i = randomRank - 5; i < randomRank + 5; i++) {
        if (i >= 0 && i != randomRank) {
            nameOptions.push(boardsJson[Object.keys(boardsJson)[i]].userData.boardname);
        }
    }

    // Remove names randomly until only 3 remain
    while (nameOptions.length > 3) {
        nameOptions.splice(Math.floor(Math.random() * nameOptions.length), 1);
    }

    // Add correct name in random position and apply to buttons
    nameOptions.splice(Math.floor(Math.random() * 4), 0, boardsJson[Object.keys(boardsJson)[randomRank]].userData.boardname);
    var buttons = document.getElementsByClassName("runner-answer");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = nameOptions[i];
        if(nameOptions[i] == boardsJson[Object.keys(boardsJson)[randomRank]].userData.boardname) {
            correctAnswerButton = i;
        }
    }
}

// Broken Demo reset
function brokenDemo() {
    if(confirm(`Please only use this for broken demos (there's not a way to detect those, sadly). Contact either Rex or Bexc with the run's ID: ${boardsJson[Object.keys(boardsJson)[randomRank]].scoreData.changelogId} to get the run re-rendered.`)) {
        console.error('Broken Demo Reset');
        reset();
    }
}

// Run reset once to start game loop
reset();

// Timer stuff
var seconds = 0;
var tens = 0;
var Interval;
function startTimer() {
    tens++; 
    if (tens > 99) {
        seconds++;
        tens = 0;
    }
}