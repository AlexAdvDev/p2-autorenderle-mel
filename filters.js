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

var mapFilterMode;
var rankFilterMode;

// Map Filters
function mapFilter(input) {
    if(input == 'all') {
        mapFilterMode = 0;
    } else if(input == 'sp') {
        mapFilterMode = 1;
    } else {
        mapFilterMode = 2;
    }
    existingPlayerStats['Current Streak'] = 0;
    streak = 0;
    reset();
}

// Rank Filters
function rankFilter(input) {
    rankFilterMode = input;
    existingPlayerStats['Current Streak'] = 0;
    streak = 0;
    reset();
}

// Broken Demo reset
function brokenDemo() {
    if(confirm("Please only use this for broken demos (there's not a way to detect those, sadly).")) {
        reset();
    }
}