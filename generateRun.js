const autorenderBase = "https://autorender.portal2.sr/api/v1";
const boardsBase = "https://board.portal2.sr";

function reset() {
    // Generate random map
    var randomMap = Math.floor(Math.random() * 108);
    var mapID = mapsObject[randomMap].mapid;
    console.log(mapID);

    // Get boards API for randomly generated mapID
    fetch(boardsBase + "/chamber/" + mapID + "/json")
        .then(res => res.json())
        .then(data => {
            boardsJson = data;
            console.log(boardsJson);

            // Generate random rank between 1 and 40 and get run ID
            var randomRank = Math.floor(Math.random() * 40);
            runID = boardsJson[Object.keys(boardsJson)[randomRank]].scoreData.changelogId;
            console.log(runID);

            // Check if the run ID has a valid demo
            if(boardsJson[Object.keys(boardsJson)[randomRank]].scoreData.hasDemo == 0) {
                console.error("Run ID has no demo, generating new run ID");
                reset();
            }

            // START UP THE GAME BITCHES!!!!!!
            // Display autorender
            var player = document.getElementById("player");
            player.src = autorenderBase + "/video/" + runID + "/video";
            //Set player answers
            setAnswers(randomRank);
        });
}

function setAnswers(randomRank) {
    var nameOptions = [];
    // Add names of the top 40 runners, except of the correct runner
    for (var i = 0; i < 40; i++) {
        if (i != randomRank) {
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
    }
}

// Run reset once to start game loop
reset();