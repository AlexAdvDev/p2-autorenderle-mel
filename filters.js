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
    reset();
}