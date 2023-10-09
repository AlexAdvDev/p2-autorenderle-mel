// Variables for calling HTML elements
var endgameOutcome = document.getElementById('endgame-outcome');
var endgameRank = document.getElementById('endgame-rank');
var endgameTime = document.getElementById('endgame-time');
var endgameStreak = document.getElementById('endgame-streak');
var endgamePopup = document.getElementById('endgame-popup');

// Other useful variables
var streak;

function guess(input) {
    // Determine if the guess was correct, and change endgame stuff accordingly
    var win;
    if(input == correctAnswerButton) {
        endgameOutcome.innerHTML = `Correct! It was ${correctName}'s run!`;
        endgamePopup.style.borderColor = '#00ff00';
        win = true;
    } else {
        endgameOutcome.innerHTML = `Incorrect. It was ${correctName}'s run.`;
        endgamePopup.style.borderColor = '#ff0000';
        win = false;
    }
    endgameRank.innerHTML = `This is ranked ${correctRank} on the leaderboards`;

    // Update statistics
    storeStats(win);

    // Display updated statistics (if need be)
    endgameTime.innerHTML = `You've made your guess in ${seconds}.${tens} seconds`;
    endgameStreak.innerHTML = `Current Streak: ${streak}`;
    
    // Display endgame popup
    document.getElementById('endgame-popup').style.visibility = 'visible';
    document.getElementById('endgame-popup-shadow').style.display = 'block';
}

function storeStats(win) {
    // Load in stats from localStorage
    let defaultStats = {
        'Rounds Played': 0,
        'Rounds Won': 0,
        'Win %': 0,
        'Current Streak': 0,
        'Maximum Streak': 0,
        'Total Time': 0,
        'Average Time': 0
    }
    let existingPlayerStatsImport = localStorage.getItem('playerStats');
    var existingPlayerStats = existingPlayerStatsImport ? JSON.parse(existingPlayerStatsImport) : defaultStats;

    // Update statistics
    existingPlayerStats['Rounds Played']++;
    if(win) {
        existingPlayerStats['Rounds Won']++;
        existingPlayerStats['Current Streak']++;
        streak = existingPlayerStats['Current Streak'];
        if(existingPlayerStats['Current Streak'] > existingPlayerStats['Maximum Streak']) {
            existingPlayerStats['Maximum Streak'] = existingPlayerStats['Current Streak'];
        }
    } else {
        existingPlayerStats['Current Streak'] = 0;
        streak = 0;
    }

    // Calculate new win percentage
    let winPercentage = ((existingPlayerStats['Rounds Won'] / existingPlayerStats['Rounds Played']) * 100);
    existingPlayerStats['Win %'] = winPercentage.toFixed(2);

    // Calculate new average time
    let totalTime = existingPlayerStats['Total Time'] + (seconds * 100) + tens;
    let averageTime = totalTime / existingPlayerStats['Rounds Played'];
    existingPlayerStats['Average Time'] = (averageTime / 100).toFixed(2);

    // Store updated stats in localStorage
    localStorage.setItem('playerStats', JSON.stringify(existingPlayerStats));
}

function playAgain() {
    document.getElementById('endgame-popup').style.visibility = 'hidden';
    document.getElementById('endgame-popup-shadow').style.display = 'none';
    reset();
}