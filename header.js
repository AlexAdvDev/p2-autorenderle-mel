function hideDiv(divName){
    document.getElementById(divName).style.visibility = 'hidden';
    document.getElementById(divName + '-x-button').style.display = 'none';
    document.getElementById(divName + '-shadow').style.display = 'none';
}

function showDiv(divName) {
    document.getElementById(divName).style.visibility = 'visible';
    document.getElementById(divName + '-x-button').style.display = 'block';
    document.getElementById(divName + '-shadow').style.display = 'block';

    if(divName == 'stats-popup') {
        setStats();
    }
}

function setStats() {
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
    let playerStatsImport = localStorage.getItem('playerStats');
    let playerStats = playerStatsImport ? JSON.parse(playerStatsImport) : defaultStats;

    // Display stats
    document.getElementById('stats-played').innerHTML = `Rounds Played: ${playerStats['Rounds Played']}`;
    document.getElementById('stats-won').innerHTML = `Rounds Won: ${playerStats['Rounds Won']}`;
    document.getElementById('stats-percentage').innerHTML = `Win %: ${playerStats['Win %']}%`;
    document.getElementById('stats-streak').innerHTML = `Current Streak: ${playerStats['Current Streak']}`;
    document.getElementById('stats-max-streak').innerHTML = `Maximum Streak: ${playerStats['Maximum Streak']}`;
    document.getElementById('stats-avg-time').innerHTML = `Average Time: ${playerStats['Average Time']} seconds`;
}