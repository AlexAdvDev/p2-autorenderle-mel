function hideDiv(divName){
    document.getElementById(divName).style.visibility = 'hidden';
    document.getElementById(divName + '-x-button').style.display = 'none';
    document.getElementById(divName + '-shadow').style.display = 'none';
}

function showDiv(divName) {
    console.log("Showing" + divName);
    document.getElementById(divName).style.visibility = 'visible';
    document.getElementById(divName + '-x-button').style.display = 'block';
    document.getElementById(divName + '-shadow').style.display = 'block';

    if(divName == 'stats-popup'){
        getStats();
    }
}

function getStats() {
    // fill in later lol
}