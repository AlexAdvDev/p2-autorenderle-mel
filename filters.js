var mapFilterMode;

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

// Broken Demo reset
function brokenDemo() {
    if(confirm("Please only use this for broken demos (there's not a way to detect those, sadly).")) {
        reset();
    }
}